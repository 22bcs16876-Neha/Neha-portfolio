package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.SkillDto;
import com.portfolio.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<SkillDto>>> getAllSkills() {
        return ResponseEntity.ok(ApiResponse.ok(skillService.getAllSkills()));
    }

    @GetMapping("/skills/category/{category}")
    public ResponseEntity<ApiResponse<List<SkillDto>>> getSkillsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(ApiResponse.ok(skillService.getSkillsByCategory(category)));
    }

    @PostMapping("/admin/skills")
    public ResponseEntity<ApiResponse<SkillDto>> createSkill(@Valid @RequestBody SkillDto dto) {
        SkillDto created = skillService.createSkill(dto);
        return new ResponseEntity<>(ApiResponse.ok("Skill created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/skills/{id}")
    public ResponseEntity<ApiResponse<SkillDto>> updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillDto dto) {
        SkillDto updated = skillService.updateSkill(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Skill updated successfully", updated));
    }

    @DeleteMapping("/admin/skills/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.ok("Skill deleted successfully", null));
    }
}
