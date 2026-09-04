package com.portfolio.service;

import com.portfolio.dto.SkillDto;
import com.portfolio.entity.Skill;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    @Transactional(readOnly = true)
    public List<SkillDto> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryOrderByDisplayOrderAsc(category)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public SkillDto createSkill(SkillDto dto) {
        Skill skill = Skill.builder()
                .name(dto.getName())
                .category(dto.getCategory().toUpperCase())
                .proficiency(dto.getProficiency() != null ? dto.getProficiency() : "PROFICIENT")
                .iconName(dto.getIconName())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(skillRepository.save(skill));
    }

    @Transactional
    public SkillDto updateSkill(Long id, SkillDto dto) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));

        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory().toUpperCase());
        skill.setProficiency(dto.getProficiency() != null ? dto.getProficiency() : "PROFICIENT");
        skill.setIconName(dto.getIconName());
        if (dto.getDisplayOrder() != null) {
            skill.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(skillRepository.save(skill));
    }

    @Transactional
    public void deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));
        skillRepository.delete(skill);
    }

    private SkillDto toDto(Skill skill) {
        return SkillDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .proficiency(skill.getProficiency())
                .iconName(skill.getIconName())
                .displayOrder(skill.getDisplayOrder())
                .build();
    }
}
