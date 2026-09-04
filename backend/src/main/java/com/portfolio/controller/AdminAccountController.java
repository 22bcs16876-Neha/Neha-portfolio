package com.portfolio.controller;

import com.portfolio.dto.*;
import com.portfolio.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/account")
@RequiredArgsConstructor
public class AdminAccountController {

    private final AuthService authService;

    @GetMapping
    public ResponseEntity<ApiResponse<AdminAccountDto>> getAccount(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : "admin";
        AdminAccountDto dto = authService.getAdminAccount(username);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    @PutMapping("/email")
    public ResponseEntity<ApiResponse<AdminAccountDto>> updateEmail(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdateEmailRequest request) {
        String username = userDetails != null ? userDetails.getUsername() : "admin";
        AdminAccountDto dto = authService.updateAdminEmail(username, request);
        return ResponseEntity.ok(ApiResponse.ok("Admin email updated successfully", dto));
    }

    @PutMapping("/emailjs")
    public ResponseEntity<ApiResponse<AdminAccountDto>> updateEmailJs(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateEmailJsRequest request) {
        String username = userDetails != null ? userDetails.getUsername() : "admin";
        AdminAccountDto dto = authService.updateEmailJsConfig(username, request);
        return ResponseEntity.ok(ApiResponse.ok("EmailJS configuration updated successfully", dto));
    }
}
