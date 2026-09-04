package com.portfolio.service;

import com.portfolio.dto.EducationDto;
import com.portfolio.entity.Education;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;

    @Transactional(readOnly = true)
    public List<EducationDto> getAllEducations() {
        return educationRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public EducationDto createEducation(EducationDto dto) {
        Education education = Education.builder()
                .degree(dto.getDegree())
                .institution(dto.getInstitution())
                .fieldOfStudy(dto.getFieldOfStudy())
                .startYear(dto.getStartYear())
                .endYear(dto.getEndYear())
                .gradeOrCgpa(dto.getGradeOrCgpa())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(educationRepository.save(education));
    }

    @Transactional
    public EducationDto updateEducation(Long id, EducationDto dto) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));

        education.setDegree(dto.getDegree());
        education.setInstitution(dto.getInstitution());
        education.setFieldOfStudy(dto.getFieldOfStudy());
        education.setStartYear(dto.getStartYear());
        education.setEndYear(dto.getEndYear());
        education.setGradeOrCgpa(dto.getGradeOrCgpa());
        education.setDescription(dto.getDescription());
        if (dto.getDisplayOrder() != null) {
            education.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(educationRepository.save(education));
    }

    @Transactional
    public void deleteEducation(Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));
        educationRepository.delete(education);
    }

    private EducationDto toDto(Education education) {
        return EducationDto.builder()
                .id(education.getId())
                .degree(education.getDegree())
                .institution(education.getInstitution())
                .fieldOfStudy(education.getFieldOfStudy())
                .startYear(education.getStartYear())
                .endYear(education.getEndYear())
                .gradeOrCgpa(education.getGradeOrCgpa())
                .description(education.getDescription())
                .displayOrder(education.getDisplayOrder())
                .build();
    }
}
