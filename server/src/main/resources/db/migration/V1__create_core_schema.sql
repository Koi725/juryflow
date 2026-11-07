CREATE TABLE users (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username      VARCHAR(64)  NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    full_name     VARCHAR(200) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL,
    is_admin      BOOLEAN      NOT NULL DEFAULT FALSE,
    active        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT ck_users_role CHECK (role IN ('STUDENT', 'PROFESSOR')),
    CONSTRAINT ck_users_admin_is_professor CHECK (NOT is_admin OR role = 'PROFESSOR')
);

CREATE TABLE auth_tokens (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token_hash VARCHAR(64) NOT NULL,
    user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,
    revoked    BOOLEAN     NOT NULL DEFAULT FALSE,
    CONSTRAINT uq_auth_tokens_token_hash UNIQUE (token_hash),
    CONSTRAINT ck_auth_tokens_hash_length CHECK (length(token_hash) = 64),
    CONSTRAINT ck_auth_tokens_expiry CHECK (expires_at > created_at)
);

CREATE INDEX ix_auth_tokens_user_id ON auth_tokens (user_id);

CREATE TABLE courses (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code       VARCHAR(32)  NOT NULL,
    name       VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_courses_code UNIQUE (code)
);

CREATE TABLE editions (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_id     BIGINT      NOT NULL REFERENCES courses (id),
    academic_year VARCHAR(9)  NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_editions_course_year UNIQUE (course_id, academic_year),
    CONSTRAINT ck_editions_academic_year CHECK (academic_year ~ '^[0-9]{4}/[0-9]{4}$')
);
