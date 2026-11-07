package pt.ua.juryflow.auth;

import java.time.Clock;
import java.time.Instant;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.ua.juryflow.auth.dto.LoginRequest;
import pt.ua.juryflow.auth.dto.LoginResponse;
import pt.ua.juryflow.common.error.UnauthorizedException;
import pt.ua.juryflow.user.User;
import pt.ua.juryflow.user.UserRepository;
import pt.ua.juryflow.user.dto.UserResponse;

@Service
public class AuthService {

    private static final String INVALID_CREDENTIALS = "Invalid username or password";

    private final UserRepository userRepository;
    private final AuthTokenRepository authTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenFactory tokenFactory;
    private final AuthProperties properties;
    private final Clock clock;

    public AuthService(
            UserRepository userRepository,
            AuthTokenRepository authTokenRepository,
            PasswordEncoder passwordEncoder,
            TokenFactory tokenFactory,
            AuthProperties properties,
            Clock clock) {
        this.userRepository = userRepository;
        this.authTokenRepository = authTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenFactory = tokenFactory;
        this.properties = properties;
        this.clock = clock;
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username().trim())
                .filter(User::isActive)
                .filter(found -> passwordEncoder.matches(request.password(), found.getPasswordHash()))
                .orElseThrow(() -> new UnauthorizedException(INVALID_CREDENTIALS));

        Instant now = clock.instant();
        Instant expiresAt = now.plus(properties.tokenTtl());
        IssuedToken issued = tokenFactory.issue();
        authTokenRepository.save(new AuthToken(issued.hash(), user, now, expiresAt));

        return LoginResponse.bearer(issued.rawValue(), expiresAt, UserResponse.from(user));
    }

    /** Resolves a raw bearer token to its caller, or empty if unknown, expired, revoked or the user is inactive. */
    @Transactional(readOnly = true)
    public Optional<AuthenticatedUser> authenticate(String rawToken) {
        return authTokenRepository.findByTokenHashWithUser(tokenFactory.hash(rawToken))
                .filter(token -> token.isUsableAt(clock.instant()))
                .filter(token -> token.getUser().isActive())
                .map(token -> new AuthenticatedUser(
                        token.getUser().getId(),
                        token.getUser().getUsername(),
                        token.getUser().getRole(),
                        token.getUser().isAdmin(),
                        token.getId()));
    }

    @Transactional
    public void logout(AuthenticatedUser caller) {
        authTokenRepository.findById(caller.tokenId()).ifPresent(AuthToken::revoke);
    }
}
