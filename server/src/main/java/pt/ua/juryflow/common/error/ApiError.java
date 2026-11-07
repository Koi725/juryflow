package pt.ua.juryflow.common.error;

import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;

/** JSON body returned for every error response. */
public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        List<FieldViolation> fieldErrors) {

    public record FieldViolation(String field, String message) {
    }

    public static ApiError of(HttpStatus status, String message, String path, Instant now) {
        return new ApiError(now, status.value(), status.getReasonPhrase(), message, path, List.of());
    }

    public static ApiError withFieldErrors(
            HttpStatus status, String message, String path, Instant now, List<FieldViolation> fieldErrors) {
        return new ApiError(now, status.value(), status.getReasonPhrase(), message, path, fieldErrors);
    }
}
