package pt.ua.juryflow.auth;

import pt.ua.juryflow.user.Role;

/** The caller resolved from a bearer token. Placed in the security context by the token filter. */
public record AuthenticatedUser(Long userId, String username, Role role, boolean admin, Long tokenId) {

    public boolean hasRole(Role expected) {
        return role == expected;
    }
}
