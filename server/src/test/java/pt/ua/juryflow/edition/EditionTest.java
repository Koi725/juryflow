package pt.ua.juryflow.edition;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class EditionTest {

    private final Course course = new Course("PROJ", "Project");

    @Test
    void acceptsAcademicYearFormat() {
        assertThat(new Edition(course, "2025/2026").getAcademicYear()).isEqualTo("2025/2026");
    }

    @Test
    void rejectsMalformedAcademicYear() {
        assertThatThrownBy(() -> new Edition(course, "2025-26")).isInstanceOf(IllegalArgumentException.class);
    }
}
