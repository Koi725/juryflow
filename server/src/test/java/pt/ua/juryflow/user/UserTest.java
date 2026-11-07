package pt.ua.juryflow.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class UserTest {

    @Test
    void adminIsAFlagOnAProfessor() {
        User admin = User.adminProfessor("root", "h", "Root", "root@example.com");

        assertThat(admin.getRole()).isEqualTo(Role.PROFESSOR);
        assertThat(admin.isAdmin()).isTrue();
    }

    @Test
    void studentsAreNeverAdmin() {
        assertThat(User.student("ana", "h", "Ana", "ana@example.com").isAdmin()).isFalse();
    }

    @Test
    void newUsersAreActiveAndCanBeDeactivated() {
        User user = User.professor("p", "h", "Prof", "p@example.com");
        assertThat(user.isActive()).isTrue();

        user.deactivate();

        assertThat(user.isActive()).isFalse();
    }

    @Test
    void rejectsBlankFields() {
        assertThatThrownBy(() -> User.student(" ", "h", "Ana", "ana@example.com"))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
