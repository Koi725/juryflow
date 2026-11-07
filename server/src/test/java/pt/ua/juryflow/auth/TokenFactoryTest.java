package pt.ua.juryflow.auth;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Base64;
import org.junit.jupiter.api.Test;

class TokenFactoryTest {

    private final TokenFactory factory = new TokenFactory();

    @Test
    void issuedTokenEncodesThirtyTwoRandomBytes() {
        IssuedToken token = factory.issue();

        byte[] decoded = Base64.getUrlDecoder().decode(token.rawValue());
        assertThat(decoded).hasSize(TokenFactory.TOKEN_BYTES);
    }

    @Test
    void issuedTokensAreUnique() {
        assertThat(factory.issue().rawValue()).isNotEqualTo(factory.issue().rawValue());
    }

    @Test
    void storedHashMatchesHashOfRawValue() {
        IssuedToken token = factory.issue();

        assertThat(token.hash()).isEqualTo(factory.hash(token.rawValue()));
        assertThat(token.hash()).isNotEqualTo(token.rawValue());
    }

    @Test
    void hashIsLowercaseHexSha256() {
        // well-known SHA-256 test vector
        assertThat(factory.hash("abc"))
                .isEqualTo("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    }
}
