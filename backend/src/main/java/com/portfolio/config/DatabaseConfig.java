package com.portfolio.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Slf4j
@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url:${DATABASE_URL:${DB_URL:jdbc:h2:file:./data/portfoliodb;DB_CLOSE_DELAY=-1;MODE=MySQL}}}")
    private String rawUrl;

    @Value("${spring.datasource.username:${DATABASE_USERNAME:${DB_USERNAME:sa}}}")
    private String username;

    @Value("${spring.datasource.password:${DATABASE_PASSWORD:${DB_PASSWORD:}}}")
    private String password;

    @Value("${spring.datasource.driver-class-name:${DB_DRIVER:}}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();

        String url = rawUrl != null ? rawUrl.trim() : "";
        String user = username;
        String pass = password;

        // Support cloud platforms providing postgres:// or postgresql:// without jdbc: prefix
        if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
            try {
                String dummyHttp = url.replaceFirst("^postgres(ql)?://", "http://");
                URI uri = new URI(dummyHttp);
                if (uri.getUserInfo() != null && (user == null || user.equals("sa") || user.isEmpty())) {
                    String[] userInfo = uri.getUserInfo().split(":", 2);
                    user = userInfo[0];
                    if (userInfo.length > 1) {
                        pass = userInfo[1];
                    }
                }
                int port = uri.getPort() != -1 ? uri.getPort() : 5432;
                String path = uri.getPath() != null && uri.getPath().length() > 1 ? uri.getPath() : "/postgres";
                String query = uri.getQuery() != null ? "?" + uri.getQuery() : "";
                url = "jdbc:postgresql://" + uri.getHost() + ":" + port + path + query;
            } catch (Exception e) {
                log.warn("Failed to parse PostgreSQL URI via java.net.URI, applying regex prefix: {}", e.getMessage());
                url = "jdbc:postgresql://" + url.replaceFirst("^postgres(ql)?://", "");
            }
        } else if (url.startsWith("mysql://")) {
            try {
                String dummyHttp = "http://" + url.substring("mysql://".length());
                URI uri = new URI(dummyHttp);
                if (uri.getUserInfo() != null && (user == null || user.equals("sa") || user.isEmpty())) {
                    String[] userInfo = uri.getUserInfo().split(":", 2);
                    user = userInfo[0];
                    if (userInfo.length > 1) {
                        pass = userInfo[1];
                    }
                }
                int port = uri.getPort() != -1 ? uri.getPort() : 3306;
                String path = uri.getPath() != null && uri.getPath().length() > 1 ? uri.getPath() : "/portfolio_db";
                String query = uri.getQuery() != null ? "?" + uri.getQuery() : "";
                url = "jdbc:mysql://" + uri.getHost() + ":" + port + path + query;
            } catch (Exception e) {
                log.warn("Failed to parse MySQL URI via java.net.URI, applying regex prefix: {}", e.getMessage());
                url = "jdbc:mysql://" + url.substring("mysql://".length());
            }
        }

        config.setJdbcUrl(url);
        if (user != null && !user.isEmpty()) {
            config.setUsername(user);
        }
        if (pass != null) {
            config.setPassword(pass);
        }
        if (driverClassName != null && !driverClassName.trim().isEmpty()) {
            config.setDriverClassName(driverClassName.trim());
        }

        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setIdleTimeout(30000);
        config.setConnectionTimeout(20000);

        log.info("Initialized DataSource for database target: {}", url.replaceAll(":[^:@]+@", ":****@"));
        return new HikariDataSource(config);
    }
}
