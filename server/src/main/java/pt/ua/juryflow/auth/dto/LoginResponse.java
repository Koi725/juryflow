package pt.ua.juryflow.auth.dto;

import java.time.Instant;
import pt.ua.juryflow.user.dto.UserResponse;

public record LoginResponse(String token, String tokenType, Instant expiresAt, UserResponse user) {

    public static LoginResponse bearer(String token, Instant expiresAt, UserResponse user) {
        return new LoginResponse(token, "Bearer", expiresAt, user);
    }
}
