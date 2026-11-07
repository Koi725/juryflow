package pt.ua.juryflow.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/** Creates the first admin professor on startup, only when no users exist yet. */
@Component
public class AdminBootstrap implements ApplicationRunner {

    static final int MIN_PASSWORD_LENGTH = 8;
    static final String DEFAULT_EMAIL = "admin@juryflow.local";
    static final String DEFAULT_FULL_NAME = "Administrator";

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminBootstrapProperties properties;

    public AdminBootstrap(
            UserRepository userRepository, PasswordEncoder passwordEncoder, AdminBootstrapProperties properties) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.count() > 0) {
            return;
        }
        if (!properties.isConfigured()) {
            log.warn("No users exist and ADMIN_USERNAME / ADMIN_PASSWORD are not set: no admin was created");
            return;
        }
        if (properties.password().length() < MIN_PASSWORD_LENGTH) {
            throw new IllegalStateException(
                    "ADMIN_PASSWORD must have at least " + MIN_PASSWORD_LENGTH + " characters");
        }
        User admin = User.adminProfessor(
                properties.username(),
                passwordEncoder.encode(properties.password()),
                valueOrDefault(properties.fullName(), DEFAULT_FULL_NAME),
                valueOrDefault(properties.email(), DEFAULT_EMAIL));
        userRepository.save(admin);
        log.info("Created initial admin professor '{}'", admin.getUsername());
    }

    private static String valueOrDefault(String value, String fallback) {
        return value.isBlank() ? fallback : value;
    }
}
