package com.portfolio.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {
    private long totalProjects;
    private long totalSkills;
    private long totalExperiences;
    private long totalCertifications;
    private long totalEducations;
    private long totalAchievements;
    private long unreadMessagesCount;
    private long totalMessagesCount;
    private List<ContactMessageDto> recentMessages;
}
