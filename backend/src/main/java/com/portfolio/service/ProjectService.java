package com.portfolio.service;

import com.portfolio.dto.ProjectDto;
import com.portfolio.entity.Project;
import com.portfolio.exception.BadRequestException;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getFeaturedProjects() {
        return projectRepository.findByIsFeaturedTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "slug", slug));
        return toDto(project);
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return toDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto) {
        String slug = dto.getSlug();
        if (!StringUtils.hasText(slug)) {
            slug = generateSlug(dto.getTitle());
        } else {
            slug = sanitizeSlug(slug);
        }

        if (projectRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        Project project = Project.builder()
                .title(dto.getTitle())
                .slug(slug)
                .shortDescription(dto.getShortDescription())
                .fullDescription(dto.getFullDescription())
                .problemSolved(dto.getProblemSolved())
                .features(dto.getFeatures())
                .technologies(dto.getTechnologies())
                .githubUrl(dto.getGithubUrl())
                .liveUrl(dto.getLiveUrl())
                .imageUrl(dto.getImageUrl())
                .isFeatured(Boolean.TRUE.equals(dto.getIsFeatured()))
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(projectRepository.save(project));
    }

    @Transactional
    public ProjectDto updateProject(Long id, ProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        project.setTitle(dto.getTitle());
        if (StringUtils.hasText(dto.getSlug())) {
            String sanitized = sanitizeSlug(dto.getSlug());
            if (!sanitized.equals(project.getSlug()) && projectRepository.existsBySlug(sanitized)) {
                throw new BadRequestException("Slug already in use: " + sanitized);
            }
            project.setSlug(sanitized);
        }
        project.setShortDescription(dto.getShortDescription());
        project.setFullDescription(dto.getFullDescription());
        project.setProblemSolved(dto.getProblemSolved());
        project.setFeatures(dto.getFeatures());
        project.setTechnologies(dto.getTechnologies());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveUrl(dto.getLiveUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setIsFeatured(Boolean.TRUE.equals(dto.getIsFeatured()));
        if (dto.getDisplayOrder() != null) {
            project.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        projectRepository.delete(project);
    }

    private String generateSlug(String title) {
        if (title == null) return "project-" + System.currentTimeMillis();
        return title.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    private String sanitizeSlug(String slug) {
        return slug.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    private ProjectDto toDto(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .slug(project.getSlug())
                .shortDescription(project.getShortDescription())
                .fullDescription(project.getFullDescription())
                .problemSolved(project.getProblemSolved())
                .features(project.getFeatures())
                .technologies(project.getTechnologies())
                .githubUrl(project.getGithubUrl())
                .liveUrl(project.getLiveUrl())
                .imageUrl(project.getImageUrl())
                .isFeatured(project.getIsFeatured())
                .displayOrder(project.getDisplayOrder())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
