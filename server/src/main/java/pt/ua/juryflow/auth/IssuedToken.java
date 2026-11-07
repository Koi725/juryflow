package pt.ua.juryflow.auth;

/** A freshly generated token: the raw value goes to the client, only the hash is stored. */
public record IssuedToken(String rawValue, String hash) {
}
