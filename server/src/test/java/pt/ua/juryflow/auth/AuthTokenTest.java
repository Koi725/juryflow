package pt.ua.juryflow.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.Instant;
import org.junit.jupiter.api.Test;
import pt.ua.juryflow.user.User;

class AuthTokenTest {

    private static final Instant CREATED = Instant.parse("2026-01-01T10:00:00Z");
    private static final Instant EXPIRES = Instant.parse("2026-01-01T18:00:00Z");

    private final User user = User.student("ana", "hash", "Ana Silva", "ana@example.com");

    @Test
    void isUsableBeforeExpiry() {
        AuthToken token = new AuthToken("h", user, CREATED, EXPIRES);

        assertThat(token.isUsableAt(CREATED.plusSeconds(60))).isTrue();
    }

    @Test
    void isNotUsableAtOrAfterExpiry() {
        AuthToken token = new AuthToken("h", user, CREATED, EXPIRES);

        assertThat(token.isUsableAt(EXPIRES)).isFalse();
        assertThat(token.isUsableAt(EXPIRES.plusSeconds(1))).isFalse();
    }

    @Test
    void isNotUsableOnceRevoked() {
        AuthToken token = new AuthToken("h", user, CREATED, EXPIRES);

        token.revoke();

        assertThat(token.isRevoked()).isTrue();
        assertThat(token.isUsableAt(CREATED.plusSeconds(60))).isFalse();
    }

    @Test
    void rejectsExpiryNotAfterCreation() {
        assertThatThrownBy(() -> new AuthToken("h", user, CREATED, CREATED))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
