package pt.ua.juryflow.auth;

import pt.ua.juryflow.common.error.ForbiddenException;
import pt.ua.juryflow.user.Role;

/** Server-side authorization checks. Services call these before doing any work. */
public final class AccessGuard {

    private AccessGuard() {
    }

    public static void requireRole(AuthenticatedUser caller, Role required) {
        if (!caller.hasRole(required)) {
            throw new ForbiddenException("Requires role " + required);
        }
    }

    public static void requireAdmin(AuthenticatedUser caller) {
        if (!caller.admin()) {
            throw new ForbiddenException("Requires administrator privileges");
        }
    }
}
