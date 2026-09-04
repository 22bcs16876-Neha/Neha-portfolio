package com.portfolio.controller;

import com.portfolio.dto.AchievementDto;
import com.portfolio.dto.ApiResponse;
import com.portfolio.service.AchievementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping("/achievements")
    public ResponseEntity<ApiResponse<List<AchievementDto>>> getAllAchievements() {
        return ResponseEntity.ok(ApiResponse.ok(achievementService.getAllAchievements()));
    }

    @PostMapping("/admin/achievements")
    public ResponseEntity<ApiResponse<AchievementDto>> createAchievement(@Valid @RequestBody AchievementDto dto) {
        AchievementDto created = achievementService.createAchievement(dto);
        return new ResponseEntity<>(ApiResponse.ok("Achievement created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/achievements/{id}")
    public ResponseEntity<ApiResponse<AchievementDto>> updateAchievement(
            @PathVariable Long id,
            @Valid @RequestBody AchievementDto dto) {
        AchievementDto updated = achievementService.updateAchievement(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Achievement updated successfully", updated));
    }

    @DeleteMapping("/admin/achievements/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAchievement(@PathVariable Long id) {
        achievementService.deleteAchievement(id);
        return ResponseEntity.ok(ApiResponse.ok("Achievement deleted successfully", null));
    }
}
