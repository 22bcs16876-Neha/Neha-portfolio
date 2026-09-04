package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ProjectDto;
import com.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getAllProjects() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getAllProjects()));
    }

    @GetMapping("/projects/featured")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getFeaturedProjects() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getFeaturedProjects()));
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getProjectBySlug(slug)));
    }

    @PostMapping("/admin/projects")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(@Valid @RequestBody ProjectDto dto) {
        ProjectDto created = projectService.createProject(dto);
        return new ResponseEntity<>(ApiResponse.ok("Project created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/admin/projects/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectDto dto) {
        ProjectDto updated = projectService.updateProject(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", updated));
    }

    @DeleteMapping("/admin/projects/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully", null));
    }
}
