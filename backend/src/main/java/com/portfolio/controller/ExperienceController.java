package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ExperienceDto;
import com.portfolio.service.ExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping("/experience")
    public ResponseEntity<ApiResponse<List<ExperienceDto>>> getAllExperiences() {
        return ResponseEntity.ok(ApiResponse.ok(experienceService.getAllExperiences()));
    }

    @PostMapping("/admin/experience")
    public ResponseEntity<ApiResponse<ExperienceDto>> createExperience(@Valid @RequestBody ExperienceDto dto) {
        ExperienceDto created = experienceService.createExperience(dto);
        return new ResponseEntity<>(ApiResponse.ok("Experience created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/experience/{id}")
    public ResponseEntity<ApiResponse<ExperienceDto>> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceDto dto) {
        ExperienceDto updated = experienceService.updateExperience(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Experience updated successfully", updated));
    }

    @DeleteMapping("/admin/experience/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.ok(ApiResponse.ok("Experience deleted successfully", null));
    }
}
