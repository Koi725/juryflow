package pt.ua.juryflow.auth;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties("juryflow.auth")
public record AuthProperties(@DefaultValue("8h") Duration tokenTtl) {
}
