package pt.ua.juryflow.user;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

/** Initial admin settings, read from environment variables (see .env.example). */
@ConfigurationProperties("juryflow.bootstrap.admin")
public record AdminBootstrapProperties(
        @DefaultValue("") String username,
        @DefaultValue("") String password,
        @DefaultValue("") String email,
        @DefaultValue("") String fullName) {

    public boolean isConfigured() {
        return !username.isBlank() && !password.isBlank();
    }
}
