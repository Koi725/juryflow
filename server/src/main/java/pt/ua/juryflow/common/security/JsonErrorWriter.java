package pt.ua.juryflow.common.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Clock;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import pt.ua.juryflow.common.error.ApiError;
import tools.jackson.databind.json.JsonMapper;

/** Writes the standard JSON error body for failures raised inside the security filter chain. */
@Component
public class JsonErrorWriter {

    private final JsonMapper jsonMapper;
    private final Clock clock;

    public JsonErrorWriter(JsonMapper jsonMapper, Clock clock) {
        this.jsonMapper = jsonMapper;
        this.clock = clock;
    }

    public void write(HttpServletRequest request, HttpServletResponse response, HttpStatus status, String message)
            throws IOException {
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        jsonMapper.writeValue(
                response.getOutputStream(), ApiError.of(status, message, request.getRequestURI(), clock.instant()));
    }
}
