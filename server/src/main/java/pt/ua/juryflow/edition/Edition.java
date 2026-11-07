package pt.ua.juryflow.edition;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.regex.Pattern;
import pt.ua.juryflow.common.base.AuditedEntity;

/** One run of a course in one academic year, e.g. "2025/2026". Editions are isolated from each other. */
@Entity
@Table(name = "editions")
public class Edition extends AuditedEntity {

    private static final Pattern ACADEMIC_YEAR = Pattern.compile("\\d{4}/\\d{4}");

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "academic_year", nullable = false, length = 9)
    private String academicYear;

    protected Edition() {
        // required by JPA
    }

    public Edition(Course course, String academicYear) {
        if (course == null) {
            throw new IllegalArgumentException("course must not be null");
        }
        if (academicYear == null || !ACADEMIC_YEAR.matcher(academicYear).matches()) {
            throw new IllegalArgumentException("academicYear must look like 2025/2026");
        }
        this.course = course;
        this.academicYear = academicYear;
    }

    public Course getCourse() {
        return course;
    }

    public String getAcademicYear() {
        return academicYear;
    }
}
