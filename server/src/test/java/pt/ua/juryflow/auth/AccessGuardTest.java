package pt.ua.juryflow.auth;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import pt.ua.juryflow.common.error.ForbiddenException;
import pt.ua.juryflow.user.Role;

class AccessGuardTest {

    private final AuthenticatedUser student = new AuthenticatedUser(1L, "s", Role.STUDENT, false, 1L);
    private final AuthenticatedUser professor = new AuthenticatedUser(2L, "p", Role.PROFESSOR, false, 2L);
    private final AuthenticatedUser admin = new AuthenticatedUser(3L, "a", Role.PROFESSOR, true, 3L);

    @Test
    void requireRoleAcceptsMatchingRole() {
        assertThatCode(() -> AccessGuard.requireRole(professor, Role.PROFESSOR)).doesNotThrowAnyException();
    }

    @Test
    void requireRoleRejectsOtherRole() {
        assertThatThrownBy(() -> AccessGuard.requireRole(student, Role.PROFESSOR))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void requireAdminAcceptsAdminProfessor() {
        assertThatCode(() -> AccessGuard.requireAdmin(admin)).doesNotThrowAnyException();
    }

    @Test
    void requireAdminRejectsPlainProfessor() {
        assertThatThrownBy(() -> AccessGuard.requireAdmin(professor)).isInstanceOf(ForbiddenException.class);
    }
}
