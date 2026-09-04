package com.portfolio.service;

import com.portfolio.dto.ContactMessageDto;
import com.portfolio.dto.DashboardStatsDto;
import com.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificationRepository certificationRepository;
    private final EducationRepository educationRepository;
    private final AchievementRepository achievementRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final ContactService contactService;

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        long totalProjects = projectRepository.count();
        long totalSkills = skillRepository.count();
        long totalExperiences = experienceRepository.count();
        long totalCertifications = certificationRepository.count();
        long totalEducations = educationRepository.count();
        long totalAchievements = achievementRepository.count();
        long unreadMessagesCount = contactMessageRepository.countByStatus("UNREAD");
        long totalMessagesCount = contactMessageRepository.count();

        List<ContactMessageDto> recentMessages = contactService.getAllMessages().stream()
                .limit(5)
                .toList();

        return DashboardStatsDto.builder()
                .totalProjects(totalProjects)
                .totalSkills(totalSkills)
                .totalExperiences(totalExperiences)
                .totalCertifications(totalCertifications)
                .totalEducations(totalEducations)
                .totalAchievements(totalAchievements)
                .unreadMessagesCount(unreadMessagesCount)
                .totalMessagesCount(totalMessagesCount)
                .recentMessages(recentMessages)
                .build();
    }
}
