package pt.ua.juryflow.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AdminBootstrapTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    private AdminBootstrap bootstrap(String username, String password) {
        return new AdminBootstrap(
                userRepository, passwordEncoder, new AdminBootstrapProperties(username, password, "", ""));
    }

    @Test
    void createsAdminProfessorWhenNoUsersExist() {
        when(userRepository.count()).thenReturn(0L);
        when(passwordEncoder.encode("long-enough-pw")).thenReturn("encoded");

        bootstrap("root", "long-enough-pw").run(null);

        ArgumentCaptor<User> saved = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(saved.capture());
        User admin = saved.getValue();
        assertThat(admin.getUsername()).isEqualTo("root");
        assertThat(admin.getPasswordHash()).isEqualTo("encoded");
        assertThat(admin.getRole()).isEqualTo(Role.PROFESSOR);
        assertThat(admin.isAdmin()).isTrue();
        assertThat(admin.getEmail()).isEqualTo(AdminBootstrap.DEFAULT_EMAIL);
    }

    @Test
    void doesNothingWhenUsersAlreadyExist() {
        when(userRepository.count()).thenReturn(3L);

        bootstrap("root", "long-enough-pw").run(null);

        verify(userRepository, never()).save(any());
    }

    @Test
    void doesNothingWhenCredentialsAreNotConfigured() {
        when(userRepository.count()).thenReturn(0L);

        bootstrap("", "").run(null);

        verify(userRepository, never()).save(any());
    }

    @Test
    void failsFastOnShortPassword() {
        when(userRepository.count()).thenReturn(0L);

        assertThatThrownBy(() -> bootstrap("root", "short").run(null))
                .isInstanceOf(IllegalStateException.class);
    }
}
