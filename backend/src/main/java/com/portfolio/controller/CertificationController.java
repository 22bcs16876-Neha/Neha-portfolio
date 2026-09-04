package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.CertificationDto;
import com.portfolio.service.CertificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationService certificationService;

    @GetMapping("/certifications")
    public ResponseEntity<ApiResponse<List<CertificationDto>>> getAllCertifications() {
        return ResponseEntity.ok(ApiResponse.ok(certificationService.getAllCertifications()));
    }

    @PostMapping("/admin/certifications")
    public ResponseEntity<ApiResponse<CertificationDto>> createCertification(@Valid @RequestBody CertificationDto dto) {
        CertificationDto created = certificationService.createCertification(dto);
        return new ResponseEntity<>(ApiResponse.ok("Certification created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/certifications/{id}")
    public ResponseEntity<ApiResponse<CertificationDto>> updateCertification(
            @PathVariable Long id,
            @Valid @RequestBody CertificationDto dto) {
        CertificationDto updated = certificationService.updateCertification(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Certification updated successfully", updated));
    }

    @DeleteMapping("/admin/certifications/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.ok(ApiResponse.ok("Certification deleted successfully", null));
    }
}
