package com.portfolio.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.io.File;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url:${DATABASE_URL:${DB_URL:}}}")
    private String rawUrl;

    @Value("${spring.datasource.username:${DATABASE_USERNAME:${DB_USERNAME:}}}")
    private String username;

    @Value("${spring.datasource.password:${DATABASE_PASSWORD:${DB_PASSWORD:}}}")
    private String password;

    @Getter
    private static volatile String activeDatabaseType = "UNKNOWN";

    @Getter
    private static volatile String activeDatabaseTarget = "UNKNOWN";

    @Getter
    private static volatile boolean cloudDatabase = false;

    private static class ConnectionTarget {
        String jdbcUrl;
        String user;
        String pass;
        String driverClassName;
        String dbType;
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        ConnectionTarget target = parseTarget(rawUrl, username, password);

        if (target != null && target.jdbcUrl != null && !target.jdbcUrl.startsWith("jdbc:h2:")) {
            try {
                HikariConfig config = new HikariConfig();
                config.setJdbcUrl(target.jdbcUrl);
                if (target.user != null && !target.user.isEmpty()) {
                    config.setUsername(target.user);
                }
                if (target.pass != null && !target.pass.isEmpty()) {
                    config.setPassword(target.pass);
                }
                if (target.driverClassName != null && !target.driverClassName.isEmpty()) {
                    config.setDriverClassName(target.driverClassName);
                }

                config.setMaximumPoolSize(10);
                config.setMinimumIdle(1);
                config.setIdleTimeout(30000);
                config.setConnectionTimeout(8000); // 8s timeout to fail fast if host is unreachable
                config.setInitializationFailTimeout(8000);

                log.info("Attempting connection to cloud database [{}]: {}", target.dbType, sanitize(target.jdbcUrl));
                HikariDataSource primaryDs = new HikariDataSource(config);

                // Verify the connection is truly active
                try (java.sql.Connection conn = primaryDs.getConnection()) {
                    activeDatabaseType = target.dbType;
                    activeDatabaseTarget = sanitize(target.jdbcUrl);
                    cloudDatabase = true;
                    log.info("CONNECTED SUCCESSFULLY TO PRIMARY CLOUD DATABASE [{}]: {}", target.dbType, activeDatabaseTarget);
                    return primaryDs;
                }
            } catch (Exception e) {
                log.error("Primary cloud database [{}] connection failed: {}. Activating resilient embedded fallback database so backend remains ONLINE.", sanitize(target.jdbcUrl), e.getMessage());
            }
        }

        // Fallback or default: Embedded persistent database
        activeDatabaseType = "Embedded Local H2 (Ephemeral)";
        activeDatabaseTarget = "jdbc:h2:file:./data/portfoliodb";
        cloudDatabase = false;
        return createFallbackDataSource();
    }

    private ConnectionTarget parseTarget(String raw, String defaultUser, String defaultPass) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        String trimmed = raw.trim();
        ConnectionTarget target = new ConnectionTarget();
        target.user = defaultUser != null ? defaultUser.trim() : "";
        target.pass = defaultPass != null ? defaultPass : "";

        // Aiven / Standard MySQL URI: mysql://user:pass@host:port/dbname?ssl-mode=REQUIRED
        if (trimmed.startsWith("mysql://")) {
            try {
                URI uri = new URI("http://" + trimmed.substring("mysql://".length()));
                String userInfo = uri.getUserInfo();
                if (userInfo != null && !userInfo.isEmpty()) {
                    String[] parts = userInfo.split(":", 2);
                    if (target.user.isEmpty() && parts.length > 0) {
                        target.user = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
                    }
                    if (target.pass.isEmpty() && parts.length > 1) {
                        target.pass = URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
                    }
                }
                int port = uri.getPort() > 0 ? uri.getPort() : 3306;
                String path = uri.getPath() != null && uri.getPath().length() > 1 ? uri.getPath() : "/defaultdb";
                String query = uri.getQuery() != null ? uri.getQuery() : "";

                // Translate CLI ssl-mode=REQUIRED to JDBC sslMode=REQUIRED
                query = query.replace("ssl-mode=", "sslMode=");
                if (!query.contains("sslMode=") && !query.contains("useSSL=")) {
                    query = (query.isEmpty() ? "" : query + "&") + "sslMode=REQUIRED&useSSL=true";
                }
                if (!query.contains("allowPublicKeyRetrieval=")) {
                    query = (query.isEmpty() ? "" : query + "&") + "allowPublicKeyRetrieval=true";
                }
                if (!query.contains("serverTimezone=")) {
                    query = (query.isEmpty() ? "" : query + "&") + "serverTimezone=UTC";
                }

                target.jdbcUrl = "jdbc:mysql://" + uri.getHost() + ":" + port + path + (query.isEmpty() ? "" : "?" + query);
                target.driverClassName = "com.mysql.cj.jdbc.Driver";
                target.dbType = "MySQL (Aiven / Cloud)";
                return target;
            } catch (Exception e) {
                log.warn("Failed parsing mysql:// URI: {}", e.getMessage());
            }
        }

        // PostgreSQL URI: postgres://user:pass@host:port/dbname or postgresql://...
        if (trimmed.startsWith("postgres://") || trimmed.startsWith("postgresql://")) {
            try {
                String dummyHttp = trimmed.replaceFirst("^postgres(ql)?://", "http://");
                URI uri = new URI(dummyHttp);
                String userInfo = uri.getUserInfo();
                if (userInfo != null && !userInfo.isEmpty()) {
                    String[] parts = userInfo.split(":", 2);
                    if (target.user.isEmpty() && parts.length > 0) {
                        target.user = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
                    }
                    if (target.pass.isEmpty() && parts.length > 1) {
                        target.pass = URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
                    }
                }
                int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                String path = uri.getPath() != null && uri.getPath().length() > 1 ? uri.getPath() : "/postgres";
                String query = uri.getQuery() != null ? uri.getQuery() : "";
                if (!query.contains("sslmode=")) {
                    query = (query.isEmpty() ? "" : query + "&") + "sslmode=require";
                }

                target.jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + path + (query.isEmpty() ? "" : "?" + query);
                target.driverClassName = "org.postgresql.Driver";
                target.dbType = "PostgreSQL (Aiven / Neon / Supabase)";
                return target;
            } catch (Exception e) {
                log.warn("Failed parsing postgres:// URI: {}", e.getMessage());
            }
        }

        // JDBC URLs directly provided
        if (trimmed.startsWith("jdbc:mysql:")) {
            target.jdbcUrl = trimmed.replace("ssl-mode=", "sslMode=");
            target.driverClassName = "com.mysql.cj.jdbc.Driver";
            target.dbType = "MySQL (JDBC)";
            return target;
        }

        if (trimmed.startsWith("jdbc:postgresql:")) {
            target.jdbcUrl = trimmed;
            target.driverClassName = "org.postgresql.Driver";
            target.dbType = "PostgreSQL (JDBC)";
            return target;
        }

        // Generic / Fallback
        target.jdbcUrl = trimmed;
        target.dbType = "Custom / Fallback";
        return target;
    }

    private DataSource createFallbackDataSource() {
        try {
            File dataDir = new File("./data");
            if (!dataDir.exists()) {
                dataDir.mkdirs();
            }
        } catch (Exception ignored) {}

        HikariConfig fallbackConfig = new HikariConfig();
        fallbackConfig.setJdbcUrl("jdbc:h2:file:./data/portfoliodb;DB_CLOSE_DELAY=-1;MODE=MySQL;NON_KEYWORDS=USER");
        fallbackConfig.setUsername("sa");
        fallbackConfig.setPassword("");
        fallbackConfig.setDriverClassName("org.h2.Driver");
        fallbackConfig.setMaximumPoolSize(10);
        fallbackConfig.setMinimumIdle(1);
        fallbackConfig.setIdleTimeout(30000);
        fallbackConfig.setConnectionTimeout(10000);

        log.info("Initialized resilient local persistent database at ./data/portfoliodb");
        return new HikariDataSource(fallbackConfig);
    }

    private String sanitize(String url) {
        return url != null ? url.replaceAll(":[^:@]+@", ":****@") : "";
    }
}
