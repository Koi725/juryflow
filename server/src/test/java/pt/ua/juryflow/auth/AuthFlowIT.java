package pt.ua.juryflow.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
import java.time.Duration;
import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import pt.ua.juryflow.PostgresIntegrationTest;
import pt.ua.juryflow.user.User;
import pt.ua.juryflow.user.UserRepository;

@AutoConfigureMockMvc
class AuthFlowIT extends PostgresIntegrationTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthTokenRepository authTokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenFactory tokenFactory;

    @Test
    void bootstrapCreatedTheAdminProfessor() {
        User admin = userRepository.findByUsername(ADMIN_USERNAME).orElseThrow();

        assertThat(admin.isAdmin()).isTrue();
        assertThat(admin.getPasswordHash()).startsWith("$2");
    }

    @Test
    void loginMeLogoutFlow() throws Exception {
        String token = login(ADMIN_USERNAME, ADMIN_PASSWORD);

        mvc.perform(get("/api/me").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(ADMIN_USERNAME))
                .andExpect(jsonPath("$.role").value("PROFESSOR"))
                .andExpect(jsonPath("$.admin").value(true))
                .andExpect(jsonPath("$.passwordHash").doesNotExist());

        mvc.perform(post("/api/auth/logout").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNoContent());

        mvc.perform(get("/api/me").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void onlyTheTokenHashIsPersisted() throws Exception {
        String token = login(ADMIN_USERNAME, ADMIN_PASSWORD);

        assertThat(authTokenRepository.findByTokenHashWithUser(token)).isEmpty();
        assertThat(authTokenRepository.findByTokenHashWithUser(tokenFactory.hash(token))).isPresent();
    }

    @Test
    void loginWithWrongPasswordIsUnauthorizedWithJsonError() throws Exception {
        mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(ADMIN_USERNAME, "wrong-password")))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.message").value("Invalid username or password"))
                .andExpect(jsonPath("$.path").value("/api/auth/login"));
    }

    @Test
    void loginWithBlankFieldsReturnsFieldErrors() throws Exception {
        mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials("", "")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.length()").value(2));
    }

    @Test
    void malformedJsonIsBadRequest() throws Exception {
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content("{nope"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Malformed request body"));
    }

    @Test
    void meWithoutTokenIsUnauthorizedWithJsonError() throws Exception {
        mvc.perform(get("/api/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.message").value("Authentication required"));
    }

    @Test
    void meWithGarbageTokenIsUnauthorized() throws Exception {
        mvc.perform(get("/api/me").header(HttpHeaders.AUTHORIZATION, "Bearer not-a-real-token"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void expiredTokenIsRejected() throws Exception {
        User user = userRepository.findByUsername(ADMIN_USERNAME).orElseThrow();
        IssuedToken issued = tokenFactory.issue();
        Instant now = Instant.now();
        authTokenRepository.save(new AuthToken(
                issued.hash(), user, now.minus(Duration.ofHours(2)), now.minus(Duration.ofHours(1))));

        mvc.perform(get("/api/me").header(HttpHeaders.AUTHORIZATION, "Bearer " + issued.rawValue()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void inactiveUserCannotLoginOrUseExistingToken() throws Exception {
        String username = "inactive-student";
        String password = "student-" + UUID.randomUUID();
        User student = userRepository.save(
                User.student(username, passwordEncoder.encode(password), "Inactive Student", "i@example.com"));
        String token = login(username, password);

        student.deactivate();
        userRepository.save(student);

        mvc.perform(get("/api/me").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isUnauthorized());
        mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(username, password)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void unknownRouteForAuthenticatedUserIsJsonNotFound() throws Exception {
        String token = login(ADMIN_USERNAME, ADMIN_PASSWORD);

        mvc.perform(get("/api/does-not-exist").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    private static String credentials(String username, String password) {
        return "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";
    }

    private String login(String username, String password) throws Exception {
        String body = mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(username, password)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andReturn().getResponse().getContentAsString();
        return JsonPath.read(body, "$.token");
    }
}
