package pt.ua.juryflow;

import java.util.UUID;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

/** Base class for integration tests: full application context on a real PostgreSQL (Testcontainers). */
@SpringBootTest
@Testcontainers
public abstract class PostgresIntegrationTest {

    protected static final String ADMIN_USERNAME = "it-admin";
    protected static final String ADMIN_PASSWORD = "it-" + UUID.randomUUID();

    @Container
    @ServiceConnection
    static final PostgreSQLContainer POSTGRES = new PostgreSQLContainer("postgres:17-alpine");

    @DynamicPropertySource
    static void bootstrapAdmin(DynamicPropertyRegistry registry) {
        registry.add("juryflow.bootstrap.admin.username", () -> ADMIN_USERNAME);
        registry.add("juryflow.bootstrap.admin.password", () -> ADMIN_PASSWORD);
    }
}
