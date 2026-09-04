package com.portfolio.service;

import com.portfolio.dto.ExperienceDto;
import com.portfolio.entity.Experience;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Transactional(readOnly = true)
    public List<ExperienceDto> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public ExperienceDto createExperience(ExperienceDto dto) {
        Experience experience = Experience.builder()
                .company(dto.getCompany())
                .role(dto.getRole())
                .location(dto.getLocation())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .isCurrent(Boolean.TRUE.equals(dto.getIsCurrent()))
                .description(dto.getDescription())
                .responsibilities(dto.getResponsibilities())
                .technologies(dto.getTechnologies())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(experienceRepository.save(experience));
    }

    @Transactional
    public ExperienceDto updateExperience(Long id, ExperienceDto dto) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", id));

        experience.setCompany(dto.getCompany());
        experience.setRole(dto.getRole());
        experience.setLocation(dto.getLocation());
        experience.setStartDate(dto.getStartDate());
        experience.setEndDate(dto.getEndDate());
        experience.setIsCurrent(Boolean.TRUE.equals(dto.getIsCurrent()));
        experience.setDescription(dto.getDescription());
        experience.setResponsibilities(dto.getResponsibilities());
        experience.setTechnologies(dto.getTechnologies());
        if (dto.getDisplayOrder() != null) {
            experience.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(experienceRepository.save(experience));
    }

    @Transactional
    public void deleteExperience(Long id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", id));
        experienceRepository.delete(experience);
    }

    private ExperienceDto toDto(Experience experience) {
        return ExperienceDto.builder()
                .id(experience.getId())
                .company(experience.getCompany())
                .role(experience.getRole())
                .location(experience.getLocation())
                .startDate(experience.getStartDate())
                .endDate(experience.getEndDate())
                .isCurrent(experience.getIsCurrent())
                .description(experience.getDescription())
                .responsibilities(experience.getResponsibilities())
                .technologies(experience.getTechnologies())
                .displayOrder(experience.getDisplayOrder())
                .build();
    }
}
