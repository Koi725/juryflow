package pt.ua.juryflow.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import pt.ua.juryflow.common.base.AuditedEntity;

@Entity
@Table(name = "users")
public class User extends AuditedEntity {

    @Column(nullable = false, unique = true, length = 64)
    private String username;

    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName;

    @Column(nullable = false, length = 255)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @Column(name = "is_admin", nullable = false)
    private boolean admin;

    @Column(nullable = false)
    private boolean active;

    protected User() {
        // required by JPA
    }

    private User(String username, String passwordHash, String fullName, String email, Role role, boolean admin) {
        this.username = requireText(username, "username");
        this.passwordHash = requireText(passwordHash, "passwordHash");
        this.fullName = requireText(fullName, "fullName");
        this.email = requireText(email, "email");
        this.role = role;
        this.admin = admin;
        this.active = true;
    }

    public static User student(String username, String passwordHash, String fullName, String email) {
        return new User(username, passwordHash, fullName, email, Role.STUDENT, false);
    }

    public static User professor(String username, String passwordHash, String fullName, String email) {
        return new User(username, passwordHash, fullName, email, Role.PROFESSOR, false);
    }

    /** Admin is a flag on a professor, never a separate role. */
    public static User adminProfessor(String username, String passwordHash, String fullName, String email) {
        return new User(username, passwordHash, fullName, email, Role.PROFESSOR, true);
    }

    public void deactivate() {
        this.active = false;
    }

    public void activate() {
        this.active = true;
    }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return value.trim();
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public boolean isAdmin() {
        return admin;
    }

    public boolean isActive() {
        return active;
    }
}
