package com.portfolio.service;

import com.portfolio.entity.AdminUser;
import com.portfolio.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataInitializerService implements ApplicationRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default-username:${ADMIN_USERNAME:}}")
    private String defaultAdminUsername;

    @Value("${admin.default-password:${ADMIN_PASSWORD:}}")
    private String defaultAdminPassword;

    @Value("${admin.default-email:${ADMIN_EMAIL:}}")
    private String defaultAdminEmail;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        initAdminUser();
        log.info("Database initialization completed. Zero hardcoded data; all portfolio data is dynamically managed in Aiven MySQL.");
    }

    private void initAdminUser() {
        String configuredUsername = (defaultAdminUsername != null && !defaultAdminUsername.isBlank())
                ? defaultAdminUsername.trim()
                : "admin";

        if (adminUserRepository.count() == 0) {
            String email = (defaultAdminEmail != null && !defaultAdminEmail.isBlank())
                    ? defaultAdminEmail.trim()
                    : "";

            String password = defaultAdminPassword;
            if (password == null || password.isBlank()) {
                password = java.util.UUID.randomUUID().toString().replace("-", "").substring(0, 16);
                log.warn("============================================================================");
                log.warn("SECURITY NOTICE: No ADMIN_PASSWORD set in environment variables!");
                log.warn("Generated initial secure admin password: {}", password);
                log.warn("Set ADMIN_PASSWORD in environment variables for your chosen password.");
                log.warn("============================================================================");
            }

            AdminUser admin = AdminUser.builder()
                    .username(configuredUsername)
                    .email(email)
                    .passwordHash(passwordEncoder.encode(password))
                    .role("ROLE_ADMIN")
                    .build();
            adminUserRepository.save(admin);
            log.info("Initialized admin account: {}", configuredUsername);
        } else {
            adminUserRepository.findAll().stream().findFirst().ifPresent(admin -> {
                if (defaultAdminEmail != null && !defaultAdminEmail.isBlank() && !defaultAdminEmail.equalsIgnoreCase(admin.getEmail())) {
                    admin.setEmail(defaultAdminEmail.trim());
                    adminUserRepository.save(admin);
                    log.info("Updated admin email from environment to: {}", defaultAdminEmail);
                }
                if (defaultAdminPassword != null && !defaultAdminPassword.isBlank()) {
                    admin.setPasswordHash(passwordEncoder.encode(defaultAdminPassword));
                    adminUserRepository.save(admin);
                    log.info("Synchronized admin password from environment variable");
                }
            });
        }
    }
}