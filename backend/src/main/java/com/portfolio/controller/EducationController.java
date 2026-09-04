package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.EducationDto;
import com.portfolio.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping("/education")
    public ResponseEntity<ApiResponse<List<EducationDto>>> getAllEducations() {
        return ResponseEntity.ok(ApiResponse.ok(educationService.getAllEducations()));
    }

    @PostMapping("/admin/education")
    public ResponseEntity<ApiResponse<EducationDto>> createEducation(@Valid @RequestBody EducationDto dto) {
        EducationDto created = educationService.createEducation(dto);
        return new ResponseEntity<>(ApiResponse.ok("Education created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/education/{id}")
    public ResponseEntity<ApiResponse<EducationDto>> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationDto dto) {
        EducationDto updated = educationService.updateEducation(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Education updated successfully", updated));
    }

    @DeleteMapping("/admin/education/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.ok(ApiResponse.ok("Education deleted successfully", null));
    }
}
