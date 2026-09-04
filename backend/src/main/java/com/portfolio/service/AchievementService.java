package com.portfolio.service;

import com.portfolio.dto.AchievementDto;
import com.portfolio.entity.Achievement;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;

    @Transactional(readOnly = true)
    public List<AchievementDto> getAllAchievements() {
        return achievementRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public AchievementDto createAchievement(AchievementDto dto) {
        Achievement achievement = Achievement.builder()
                .title(dto.getTitle())
                .category(dto.getCategory() != null ? dto.getCategory().toUpperCase() : "GENERAL")
                .eventOrOrg(dto.getEventOrOrg())
                .achievementDate(dto.getAchievementDate())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(achievementRepository.save(achievement));
    }

    @Transactional
    public AchievementDto updateAchievement(Long id, AchievementDto dto) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement", "id", id));

        achievement.setTitle(dto.getTitle());
        achievement.setCategory(dto.getCategory() != null ? dto.getCategory().toUpperCase() : "GENERAL");
        achievement.setEventOrOrg(dto.getEventOrOrg());
        achievement.setAchievementDate(dto.getAchievementDate());
        achievement.setDescription(dto.getDescription());
        if (dto.getDisplayOrder() != null) {
            achievement.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(achievementRepository.save(achievement));
    }

    @Transactional
    public void deleteAchievement(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement", "id", id));
        achievementRepository.delete(achievement);
    }

    private AchievementDto toDto(Achievement achievement) {
        return AchievementDto.builder()
                .id(achievement.getId())
                .title(achievement.getTitle())
                .category(achievement.getCategory())
                .eventOrOrg(achievement.getEventOrOrg())
                .achievementDate(achievement.getAchievementDate())
                .description(achievement.getDescription())
                .displayOrder(achievement.getDisplayOrder())
                .build();
    }
}
