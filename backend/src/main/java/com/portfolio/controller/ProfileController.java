package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ProfileDto;
import com.portfolio.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<ProfileDto>> getProfile() {
        ProfileDto profile = profileService.getProfile();
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    @PutMapping("/admin/profile")
    public ResponseEntity<ApiResponse<ProfileDto>> updateProfileAdmin(@Valid @RequestBody ProfileDto dto) {
        ProfileDto updated = profileService.updateProfile(dto);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }

    @PutMapping("/admin/profile/theme")
    public ResponseEntity<ApiResponse<ProfileDto>> updateDefaultTheme(@RequestBody java.util.Map<String, String> body) {
        String theme = body != null ? body.getOrDefault("defaultTheme", "light") : "light";
        ProfileDto updated = profileService.updateDefaultTheme(theme);
        return ResponseEntity.ok(ApiResponse.ok("Portal default theme updated successfully", updated));
    }
}
