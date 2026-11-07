package pt.ua.juryflow.edition;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import pt.ua.juryflow.PostgresIntegrationTest;
import pt.ua.juryflow.user.User;
import pt.ua.juryflow.user.UserRepository;

/** Verifies that the Flyway schema itself enforces uniqueness and check constraints. */
class SchemaConstraintsIT extends PostgresIntegrationTest {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private EditionRepository editionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JdbcTemplate jdbc;

    @Test
    void sameCourseAndAcademicYearCannotBeDuplicated() {
        Course course = courseRepository.save(new Course("DUP-1", "Duplicate test"));
        editionRepository.saveAndFlush(new Edition(course, "2025/2026"));

        assertThatThrownBy(() -> editionRepository.saveAndFlush(new Edition(course, "2025/2026")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void sameCourseInAnotherYearIsAllowed() {
        Course course = courseRepository.save(new Course("OK-1", "Two years"));
        editionRepository.saveAndFlush(new Edition(course, "2025/2026"));

        editionRepository.saveAndFlush(new Edition(course, "2026/2027"));
    }

    @Test
    void usernameMustBeUnique() {
        userRepository.saveAndFlush(User.student("dup-user", "h", "One", "one@example.com"));

        assertThatThrownBy(() ->
                userRepository.saveAndFlush(User.student("dup-user", "h", "Two", "two@example.com")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void databaseRejectsAdminStudent() {
        assertThatThrownBy(() -> jdbc.update(
                "INSERT INTO users (username, password_hash, full_name, email, role, is_admin) "
                        + "VALUES ('bad-admin', 'h', 'Bad', 'b@example.com', 'STUDENT', TRUE)"))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void databaseRejectsUnknownRole() {
        assertThatThrownBy(() -> jdbc.update(
                "INSERT INTO users (username, password_hash, full_name, email, role) "
                        + "VALUES ('bad-role', 'h', 'Bad', 'b@example.com', 'DEAN')"))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}
