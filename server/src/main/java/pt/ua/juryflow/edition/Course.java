package pt.ua.juryflow.edition;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import pt.ua.juryflow.common.base.AuditedEntity;

@Entity
@Table(name = "courses")
public class Course extends AuditedEntity {

    @Column(nullable = false, unique = true, length = 32)
    private String code;

    @Column(nullable = false, length = 200)
    private String name;

    protected Course() {
        // required by JPA
    }

    public Course(String code, String name) {
        this.code = requireText(code, "code");
        this.name = requireText(name, "name");
    }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return value.trim();
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
