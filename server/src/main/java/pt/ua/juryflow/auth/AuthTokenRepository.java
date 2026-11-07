package pt.ua.juryflow.auth;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuthTokenRepository extends JpaRepository<AuthToken, Long> {

    @Query("select t from AuthToken t join fetch t.user where t.tokenHash = :hash")
    Optional<AuthToken> findByTokenHashWithUser(@Param("hash") String hash);
}
