package com.portfolio.service;

import com.portfolio.dto.*;
import com.portfolio.entity.AdminUser;
import com.portfolio.entity.Profile;
import com.portfolio.exception.BadRequestException;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.AdminUserRepository;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.security.JwtTokenProvider;
import com.portfolio.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${emailjs.service-id:service_u63zkza}")
    private String emailJsServiceId;

    @Value("${emailjs.template-id:template_ftzgvwc}")
    private String emailJsTemplateId;

    @Value("${emailjs.public-key:}")
    private String emailJsPublicKey;

    @Value("${admin.default-email:amitkr9523da@gmail.com}")
    private String defaultAdminEmail;

    @Value("${admin.default-username:admin}")
    private String defaultAdminUsername;

    @Transactional(readOnly = true)
    public AuthResponse login(AuthRequest request) {
        String inputTarget = request.getUsername();
        AdminUser user;

        if (inputTarget != null && !inputTarget.trim().isEmpty()) {
            user = adminUserRepository.findByUsername(inputTarget.trim())
                    .or(() -> adminUserRepository.findByEmail(inputTarget.trim()))
                    .orElseThrow(() -> new BadRequestException("Invalid master credentials"));
        } else {
            user = adminUserRepository.findByEmail(defaultAdminEmail)
                    .or(() -> adminUserRepository.findByUsername(defaultAdminUsername))
                    .or(() -> adminUserRepository.findAll().stream().findFirst())
                    .orElseThrow(() -> new ResourceNotFoundException("Admin account not found"));
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid master password");
        }

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, userPrincipal.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return AuthResponse.builder()
                .token(jwt)
                .tokenType("Bearer")
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public SendOtpResponse sendOtp(SendOtpRequest request) {
        AdminUser user;
        if (request != null && request.getTarget() != null && !request.getTarget().trim().isEmpty()) {
            String target = request.getTarget().trim();
            user = adminUserRepository.findByEmail(target)
                    .or(() -> adminUserRepository.findByUsername(target))
                    .orElseThrow(() -> new ResourceNotFoundException("Admin account not found for target: " + target));
        } else {
            user = adminUserRepository.findByEmail(defaultAdminEmail)
                    .or(() -> adminUserRepository.findByUsername(defaultAdminUsername))
                    .or(() -> adminUserRepository.findAll().stream().findFirst())
                    .orElseThrow(() -> new ResourceNotFoundException("Admin account not found in system"));
        }

        // Generate 6-digit numeric OTP
        int randomPin = ThreadLocalRandom.current().nextInt(100000, 1000000);
        String otp = String.valueOf(randomPin);

        user.setOtpCode(otp);
        user.setOtpExpiresAt(LocalDateTime.now().plusMinutes(15));
        adminUserRepository.save(user);

        log.info("Generated 6-digit OTP for admin [{} / {}], expires in 15 minutes", user.getUsername(), user.getEmail());

        String name = profileRepository.findAll().stream().findFirst()
                .map(Profile::getFullName)
                .orElse("Neha");
        String role = profileRepository.findAll().stream().findFirst()
                .map(p -> p.getRoleBadge() != null ? p.getRoleBadge() : "AI Engineer")
                .orElse("AI Engineer");

        String svcId = (user.getEmailjsServiceId() != null && !user.getEmailjsServiceId().isBlank())
                ? user.getEmailjsServiceId() : emailJsServiceId;
        String tplId = (user.getEmailjsTemplateId() != null && !user.getEmailjsTemplateId().isBlank())
                ? user.getEmailjsTemplateId() : emailJsTemplateId;
        String pubKey = (user.getEmailjsPublicKey() != null && !user.getEmailjsPublicKey().isBlank())
                ? user.getEmailjsPublicKey() : emailJsPublicKey;

        boolean dispatched = false;
        String dispatchMessage;
        if (pubKey != null && !pubKey.trim().isEmpty()) {
            dispatched = dispatchEmailJs(svcId, tplId, pubKey, user.getEmail(), name, role, otp);
            dispatchMessage = dispatched 
                    ? "Email dispatched directly to registered address via EmailJS" 
                    : "EmailJS returned an error during dispatch";
        } else {
            dispatchMessage = "EmailJS Public Key is not configured yet in settings";
        }

        return SendOtpResponse.builder()
                .email(user.getEmail())
                .name(name)
                .role(role)
                .time("15 minutes")
                .passcode(otp)
                .serviceId(svcId)
                .templateId(tplId)
                .publicKey(pubKey)
                .dispatched(dispatched)
                .dispatchMessage(dispatchMessage)
                .build();
    }

    private boolean dispatchEmailJs(String serviceId, String templateId, String publicKey, String email, String name, String role, String otp) {
        if (publicKey == null || publicKey.trim().isEmpty()) {
            log.warn("EmailJS Public Key is not configured. Cannot dispatch email to {}", email);
            return false;
        }

        try {
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            String payload = "{"
                    + "\"service_id\":\"" + escapeJson(serviceId) + "\","
                    + "\"template_id\":\"" + escapeJson(templateId) + "\","
                    + "\"user_id\":\"" + escapeJson(publicKey) + "\","
                    + "\"template_params\":{"
                    + "\"to_email\":\"" + escapeJson(email) + "\","
                    + "\"email\":\"" + escapeJson(email) + "\","
                    + "\"to_name\":\"" + escapeJson(name) + "\","
                    + "\"name\":\"" + escapeJson(name) + "\","
                    + "\"role\":\"" + escapeJson(role) + "\","
                    + "\"passcode\":\"" + escapeJson(otp) + "\","
                    + "\"otp\":\"" + escapeJson(otp) + "\","
                    + "\"time\":\"15 minutes\","
                    + "\"message\":\"Your admin login verification OTP is: " + escapeJson(otp) + " (valid for 15 minutes)\""
                    + "}"
                    + "}";

            java.net.http.HttpRequest httpRequest = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create("https://api.emailjs.com/api/v1.0/email/send"))
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                    .header("Origin", "http://localhost:5173")
                    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(payload, java.nio.charset.StandardCharsets.UTF_8))
                    .build();

            java.net.http.HttpResponse<String> response = client.send(httpRequest, java.net.http.HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("EmailJS email successfully dispatched to {}! Response: {}", email, response.body());
                return true;
            } else {
                log.error("EmailJS dispatch returned HTTP {}: {}", response.statusCode(), response.body());
                return false;
            }
        } catch (Exception e) {
            log.error("Exception during EmailJS HTTP dispatch: {}", e.getMessage());
            return false;
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
    }

    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        if (request.getOtp() == null || request.getOtp().trim().isEmpty()) {
            throw new BadRequestException("OTP code cannot be empty");
        }

        String code = request.getOtp().trim();
        AdminUser user;

        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            user = adminUserRepository.findByEmail(request.getEmail().trim())
                    .or(() -> adminUserRepository.findByUsername(request.getEmail().trim()))
                    .orElseThrow(() -> new BadRequestException("Admin account not found"));
        } else {
            user = adminUserRepository.findAll().stream()
                    .filter(u -> code.equals(u.getOtpCode()))
                    .findFirst()
                    .orElseGet(() -> adminUserRepository.findByEmail(defaultAdminEmail)
                            .orElseThrow(() -> new BadRequestException("Admin account not found")));
        }

        if (user.getOtpCode() == null || !user.getOtpCode().equals(code)) {
            throw new BadRequestException("Invalid OTP code. Please enter the correct code sent to your email.");
        }

        if (user.getOtpExpiresAt() == null || user.getOtpExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP code has expired. Please request a fresh one-time password.");
        }

        // Clear OTP on successful verification
        user.setOtpCode(null);
        user.setOtpExpiresAt(null);
        adminUserRepository.save(user);

        log.info("OTP verification successful for admin [{}]", user.getUsername());

        // Authenticate user & issue JWT
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, userPrincipal.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return AuthResponse.builder()
                .token(jwt)
                .tokenType("Bearer")
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public void changePassword(String username, ChangePasswordRequest request) {
        AdminUser user = adminUserRepository.findByUsername(username)
                .or(() -> adminUserRepository.findByEmail(username))
                .or(() -> adminUserRepository.findAll().stream().findFirst())
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found with username: " + username));

        if (request.getCurrentPassword() != null && !request.getCurrentPassword().trim().isEmpty()) {
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
                throw new BadRequestException("Current password does not match");
            }
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        adminUserRepository.save(user);
        log.info("Master password updated successfully for admin [{}]", user.getUsername());
    }

    @Transactional(readOnly = true)
    public AdminAccountDto getAdminAccount(String username) {
        AdminUser user = adminUserRepository.findByUsername(username)
                .or(() -> adminUserRepository.findByEmail(username))
                .or(() -> adminUserRepository.findAll().stream().findFirst())
                .orElseThrow(() -> new ResourceNotFoundException("Admin account not found"));

        return AdminAccountDto.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .emailjsServiceId(user.getEmailjsServiceId() != null ? user.getEmailjsServiceId() : emailJsServiceId)
                .emailjsTemplateId(user.getEmailjsTemplateId() != null ? user.getEmailjsTemplateId() : emailJsTemplateId)
                .emailjsPublicKey(user.getEmailjsPublicKey() != null ? user.getEmailjsPublicKey() : emailJsPublicKey)
                .build();
    }

    @Transactional
    public AdminAccountDto updateAdminEmail(String username, UpdateEmailRequest request) {
        AdminUser user = adminUserRepository.findByUsername(username)
                .or(() -> adminUserRepository.findByEmail(username))
                .or(() -> adminUserRepository.findAll().stream().findFirst())
                .orElseThrow(() -> new ResourceNotFoundException("Admin account not found"));

        user.setEmail(request.getEmail().trim().toLowerCase());
        adminUserRepository.save(user);
        log.info("Admin email updated to: {}", user.getEmail());

        return getAdminAccount(user.getUsername());
    }

    @Transactional
    public AdminAccountDto updateEmailJsConfig(String username, UpdateEmailJsRequest request) {
        AdminUser user = adminUserRepository.findByUsername(username)
                .or(() -> adminUserRepository.findByEmail(username))
                .or(() -> adminUserRepository.findAll().stream().findFirst())
                .orElseThrow(() -> new ResourceNotFoundException("Admin account not found"));

        if (request.getServiceId() != null) user.setEmailjsServiceId(request.getServiceId().trim());
        if (request.getTemplateId() != null) user.setEmailjsTemplateId(request.getTemplateId().trim());
        if (request.getPublicKey() != null) user.setEmailjsPublicKey(request.getPublicKey().trim());

        adminUserRepository.save(user);
        log.info("EmailJS settings updated for admin: {}", user.getUsername());

        return getAdminAccount(user.getUsername());
    }
}


