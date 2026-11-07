# Domain

Implemented in the first batch: users, auth tokens, courses, editions. Everything else below is the target design for later batches.

## Entities

| Entity | Notes |
| --- | --- |
| User | `STUDENT` or `PROFESSOR`; `is_admin` flag only valid on professors; `active` flag |
| AuthToken | SHA-256 hash of an opaque token, expiry, revoked flag |
| Course | Unique `code`, `name` |
| Edition | A course in an academic year (`2025/2026`); unique per course + year. Isolates all data below |
| Milestone | Per edition: intermediate deliverable deadlines, final deadline |
| Criterion | Per edition: name, weight, scale |
| Project | In an edition; students; state; assigned supervisor |
| Deliverable | Submission at a milestone, with supervisor comments |
| Defence | Scheduled date, jury of about 3 professors, session record |
| SessionRecord | Participants, time used per party, student behaviour |
| Score | One jury member, one student, one criterion |
| FinalGrade | One per student, computed |
| ProjectEvent | Audit row for every action and state transition |

Supervisor and jury member are assignments of a professor to a project, not roles.

## Workflow states

```
PROPOSED ──► UNDER_EVALUATION ──┬──► APPROVED ──► SUPERVISOR_ASSIGNED ──► IN_PROGRESS
     ▲                          ├──► REJECTED
     └──── CHANGES_REQUESTED ◄──┘

IN_PROGRESS ──► FINAL_SUBMITTED ──► DEFENCE_SCHEDULED ──► DEFENDED ──► GRADED ──► CLOSED
```

Allowed transitions:

| From | To |
| --- | --- |
| PROPOSED | UNDER_EVALUATION |
| UNDER_EVALUATION | APPROVED, REJECTED, CHANGES_REQUESTED |
| CHANGES_REQUESTED | PROPOSED |
| APPROVED | SUPERVISOR_ASSIGNED |
| SUPERVISOR_ASSIGNED | IN_PROGRESS |
| IN_PROGRESS | FINAL_SUBMITTED |
| FINAL_SUBMITTED | DEFENCE_SCHEDULED |
| DEFENCE_SCHEDULED | DEFENDED |
| DEFENDED | GRADED |
| GRADED | CLOSED |

`REJECTED` and `CLOSED` are terminal. The state machine is an enum with its allowed transitions; any other transition is refused. Every transition writes a `project_event` row (who, when, from, to, comment). The final submission is refused after the edition's deadline.

This list is the proposed first version and may change when the workflow batch is designed.

## Grade formula

Configurable per edition (criteria, weights, scale). Default:

1. For each jury member and each student: weighted average of the criterion scores
   `member_grade = Σ(score_i × weight_i) / Σ(weight_i)`.
2. Final grade of the student: average of the `member_grade` values across jury members
   `final_grade = Σ(member_grade_j) / number_of_jury_members`.

Grades are individual: each student has their own scores. Editions are isolated but comparable because the same formula is applied to each edition's own criteria.
