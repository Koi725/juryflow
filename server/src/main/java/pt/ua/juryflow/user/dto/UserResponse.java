package pt.ua.juryflow.user.dto;

import pt.ua.juryflow.user.Role;
import pt.ua.juryflow.user.User;

public record UserResponse(
        Long id,
        String username,
        String fullName,
        String email,
        Role role,
        boolean admin) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isAdmin());
    }
}
