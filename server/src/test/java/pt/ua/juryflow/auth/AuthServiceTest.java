package pt.ua.juryflow.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import pt.ua.juryflow.auth.dto.LoginRequest;
import pt.ua.juryflow.auth.dto.LoginResponse;
import pt.ua.juryflow.common.error.UnauthorizedException;
import pt.ua.juryflow.user.Role;
import pt.ua.juryflow.user.User;
import pt.ua.juryflow.user.UserRepository;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    private static final Instant NOW = Instant.parse("2026-03-01T09:00:00Z");
    private static final Duration TTL = Duration.ofHours(8);

    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthTokenRepository authTokenRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    private final TokenFactory tokenFactory = new TokenFactory();
    private AuthService service;

    @BeforeEach
    void setUp() {
        service = new AuthService(
                userRepository,
                authTokenRepository,
                passwordEncoder,
                tokenFactory,
                new AuthProperties(TTL),
                Clock.fixed(NOW, ZoneOffset.UTC));
    }

    @Test
    void loginIssuesTokenAndStoresOnlyItsHash() {
        User user = User.professor("prof", "stored-hash", "Prof One", "prof@example.com");
        when(userRepository.findByUsername("prof")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("secret-pass", "stored-hash")).thenReturn(true);

        LoginResponse response = service.login(new LoginRequest("prof", "secret-pass"));

        ArgumentCaptor<AuthToken> saved = ArgumentCaptor.forClass(AuthToken.class);
        verify(authTokenRepository).save(saved.capture());
        assertThat(saved.getValue().getTokenHash()).isEqualTo(tokenFactory.hash(response.token()));
        assertThat(saved.getValue().getTokenHash()).isNotEqualTo(response.token());
        assertThat(response.expiresAt()).isEqualTo(NOW.plus(TTL));
        assertThat(response.tokenType()).isEqualTo("Bearer");
        assertThat(response.user().username()).isEqualTo("prof");
    }

    @Test
    void loginTrimsUsername() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        when(userRepository.findByUsername("ana")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("pw", "h")).thenReturn(true);

        assertThat(service.login(new LoginRequest("  ana ", "pw")).user().username()).isEqualTo("ana");
    }

    @Test
    void loginRejectsWrongPassword() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        when(userRepository.findByUsername("ana")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "h")).thenReturn(false);

        assertThatThrownBy(() -> service.login(new LoginRequest("ana", "wrong")))
                .isInstanceOf(UnauthorizedException.class);
        verify(authTokenRepository, never()).save(any());
    }

    @Test
    void loginRejectsUnknownUserWithSameMessage() {
        when(userRepository.findByUsername("ghost")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.login(new LoginRequest("ghost", "pw")))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Invalid username or password");
    }

    @Test
    void loginRejectsInactiveUserWithoutCheckingPassword() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        user.deactivate();
        when(userRepository.findByUsername("ana")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> service.login(new LoginRequest("ana", "pw")))
                .isInstanceOf(UnauthorizedException.class);
        verify(passwordEncoder, never()).matches(any(), any());
    }

    @Test
    void authenticateReturnsCallerForValidToken() {
        User user = User.adminProfessor("root", "h", "Root", "root@example.com");
        AuthToken token = new AuthToken(tokenFactory.hash("raw"), user, NOW.minusSeconds(60), NOW.plusSeconds(60));
        when(authTokenRepository.findByTokenHashWithUser(tokenFactory.hash("raw"))).thenReturn(Optional.of(token));

        Optional<AuthenticatedUser> caller = service.authenticate("raw");

        assertThat(caller).isPresent();
        assertThat(caller.get().username()).isEqualTo("root");
        assertThat(caller.get().role()).isEqualTo(Role.PROFESSOR);
        assertThat(caller.get().admin()).isTrue();
    }

    @Test
    void authenticateRejectsUnknownToken() {
        when(authTokenRepository.findByTokenHashWithUser(any())).thenReturn(Optional.empty());

        assertThat(service.authenticate("nope")).isEmpty();
    }

    @Test
    void authenticateRejectsExpiredToken() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        AuthToken token = new AuthToken(tokenFactory.hash("raw"), user, NOW.minusSeconds(120), NOW.minusSeconds(1));
        when(authTokenRepository.findByTokenHashWithUser(tokenFactory.hash("raw"))).thenReturn(Optional.of(token));

        assertThat(service.authenticate("raw")).isEmpty();
    }

    @Test
    void authenticateRejectsRevokedToken() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        AuthToken token = new AuthToken(tokenFactory.hash("raw"), user, NOW.minusSeconds(60), NOW.plusSeconds(60));
        token.revoke();
        when(authTokenRepository.findByTokenHashWithUser(tokenFactory.hash("raw"))).thenReturn(Optional.of(token));

        assertThat(service.authenticate("raw")).isEmpty();
    }

    @Test
    void authenticateRejectsInactiveUser() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        user.deactivate();
        AuthToken token = new AuthToken(tokenFactory.hash("raw"), user, NOW.minusSeconds(60), NOW.plusSeconds(60));
        when(authTokenRepository.findByTokenHashWithUser(tokenFactory.hash("raw"))).thenReturn(Optional.of(token));

        assertThat(service.authenticate("raw")).isEmpty();
    }

    @Test
    void logoutRevokesTheCallersToken() {
        User user = User.student("ana", "h", "Ana", "ana@example.com");
        AuthToken token = new AuthToken("h", user, NOW.minusSeconds(60), NOW.plusSeconds(60));
        when(authTokenRepository.findById(7L)).thenReturn(Optional.of(token));

        service.logout(new AuthenticatedUser(1L, "ana", Role.STUDENT, false, 7L));

        assertThat(token.isRevoked()).isTrue();
    }
}
