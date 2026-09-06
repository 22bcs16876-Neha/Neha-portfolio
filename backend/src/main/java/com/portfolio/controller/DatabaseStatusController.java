package com.portfolio.controller;

import com.portfolio.config.DatabaseConfig;
import com.portfolio.dto.ApiResponse;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/status")
@RequiredArgsConstructor
public class DatabaseStatusController {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ProfileRepository profileRepository;
    private final com.portfolio.repository.StoredFileRepository storedFileRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStatus() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("status", "ONLINE");
        status.put("databaseType", DatabaseConfig.getActiveDatabaseType());
        status.put("databaseTarget", DatabaseConfig.getActiveDatabaseTarget());
        status.put("isCloudDatabase", DatabaseConfig.isCloudDatabase());

        Map<String, Object> counts = new LinkedHashMap<>();
        counts.put("profiles", profileRepository.count());
        counts.put("projects", projectRepository.count());
        counts.put("skills", skillRepository.count());
        counts.put("storedFiles", storedFileRepository.count());
        status.put("records", counts);

        return ResponseEntity.ok(ApiResponse.ok(status));
    }
}