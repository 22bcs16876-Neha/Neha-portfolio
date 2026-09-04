package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.CodingProfileDto;
import com.portfolio.service.CodingProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CodingProfileController {

    private final CodingProfileService codingProfileService;

    @GetMapping("/coding-profiles")
    public ResponseEntity<ApiResponse<List<CodingProfileDto>>> getAllCodingProfiles() {
        return ResponseEntity.ok(ApiResponse.ok(codingProfileService.getAllCodingProfiles()));
    }

    @PostMapping("/admin/coding-profiles")
    public ResponseEntity<ApiResponse<CodingProfileDto>> createCodingProfile(@Valid @RequestBody CodingProfileDto dto) {
        CodingProfileDto created = codingProfileService.createCodingProfile(dto);
        return new ResponseEntity<>(ApiResponse.ok("Coding profile created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/coding-profiles/{id}")
    public ResponseEntity<ApiResponse<CodingProfileDto>> updateCodingProfile(
            @PathVariable Long id,
            @Valid @RequestBody CodingProfileDto dto) {
        CodingProfileDto updated = codingProfileService.updateCodingProfile(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Coding profile updated successfully", updated));
    }

    @DeleteMapping("/admin/coding-profiles/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCodingProfile(@PathVariable Long id) {
        codingProfileService.deleteCodingProfile(id);
        return ResponseEntity.ok(ApiResponse.ok("Coding profile deleted successfully", null));
    }
}
