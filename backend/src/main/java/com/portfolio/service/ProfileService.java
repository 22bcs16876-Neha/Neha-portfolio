package com.portfolio.service;

import com.portfolio.dto.ProfileDto;
import com.portfolio.entity.Profile;
import com.portfolio.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Transactional(readOnly = true)
    public ProfileDto getProfile() {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElse(null);

        if (profile == null) {
            return ProfileDto.builder()
                    .fullName("Software Engineer")
                    .title("Full-Stack & Systems Developer")
                    .build();
        }

        return toDto(profile);
    }

    @Transactional
    public ProfileDto updateProfile(ProfileDto dto) {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(Profile::new);

        profile.setFullName(dto.getFullName());
        profile.setTitle(dto.getTitle());
        profile.setTagline(dto.getTagline());
        profile.setRoleBadge(dto.getRoleBadge());
        profile.setStatusText(dto.getStatusText());
        profile.setHeroTechStack(dto.getHeroTechStack());
        profile.setBio(dto.getBio());
        profile.setShortAbout(dto.getShortAbout());
        profile.setFullAbout(dto.getFullAbout());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        profile.setLocation(dto.getLocation());
        profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setResumeUrl(dto.getResumeUrl());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setLeetcodeUrl(dto.getLeetcodeUrl());
        profile.setYearsOfExperience(dto.getYearsOfExperience());
        profile.setProjectsCount(dto.getProjectsCount());
        profile.setProblemsSolvedCount(dto.getProblemsSolvedCount());
        profile.setTechnologiesCount(dto.getTechnologiesCount());

        profile.setStat1Label(dto.getStat1Label());
        profile.setStat1Value(dto.getStat1Value());
        profile.setStat2Label(dto.getStat2Label());
        profile.setStat2Value(dto.getStat2Value());
        profile.setStat3Label(dto.getStat3Label());
        profile.setStat3Value(dto.getStat3Value());
        profile.setStat4Label(dto.getStat4Label());
        profile.setStat4Value(dto.getStat4Value());

        // Hero Quote & Triad Cards
        profile.setHeroQuote(dto.getHeroQuote());
        profile.setTriad1Title(dto.getTriad1Title());
        profile.setTriad1Spec(dto.getTriad1Spec());
        profile.setTriad1Desc(dto.getTriad1Desc());
        profile.setTriad2Title(dto.getTriad2Title());
        profile.setTriad2Spec(dto.getTriad2Spec());
        profile.setTriad2Desc(dto.getTriad2Desc());
        profile.setTriad3Title(dto.getTriad3Title());
        profile.setTriad3Spec(dto.getTriad3Spec());
        profile.setTriad3Desc(dto.getTriad3Desc());

        // Developer's Corner In-Focus & Capabilities
        profile.setInFocusTitle(dto.getInFocusTitle());
        profile.setInFocusDescription(dto.getInFocusDescription());
        profile.setInFocusMetric1Value(dto.getInFocusMetric1Value());
        profile.setInFocusMetric1Label(dto.getInFocusMetric1Label());
        profile.setInFocusMetric2Value(dto.getInFocusMetric2Value());
        profile.setInFocusMetric2Label(dto.getInFocusMetric2Label());
        profile.setInFocusMetric3Value(dto.getInFocusMetric3Value());
        profile.setInFocusMetric3Label(dto.getInFocusMetric3Label());
        profile.setDevCornerCapabilities(dto.getDevCornerCapabilities());

        // About Principles & Location
        profile.setEngineeringPrinciples(dto.getEngineeringPrinciples());
        profile.setAboutLocationLine(dto.getAboutLocationLine());

        // Footer Banner
        profile.setFooterHeading(dto.getFooterHeading());
        profile.setFooterSubheading(dto.getFooterSubheading());

        if (dto.getDefaultTheme() != null && !dto.getDefaultTheme().isBlank()) {
            String sanitized = ("dark".equalsIgnoreCase(dto.getDefaultTheme()) || "black".equalsIgnoreCase(dto.getDefaultTheme())) ? "dark" : "light";
            profile.setDefaultTheme(sanitized);
        }

        Profile saved = profileRepository.save(profile);
        return toDto(saved);
    }

    @Transactional
    public ProfileDto updateDefaultTheme(String theme) {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(Profile::new);
        String sanitized = ("dark".equalsIgnoreCase(theme) || "black".equalsIgnoreCase(theme)) ? "dark" : "light";
        profile.setDefaultTheme(sanitized);
        Profile saved = profileRepository.save(profile);
        return toDto(saved);
    }

    private ProfileDto toDto(Profile profile) {
        return ProfileDto.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .title(profile.getTitle())
                .tagline(profile.getTagline())
                .roleBadge(profile.getRoleBadge())
                .statusText(profile.getStatusText())
                .heroTechStack(profile.getHeroTechStack())
                .bio(profile.getBio())
                .shortAbout(profile.getShortAbout())
                .fullAbout(profile.getFullAbout())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .location(profile.getLocation())
                .avatarUrl(profile.getAvatarUrl())
                .resumeUrl(profile.getResumeUrl())
                .githubUrl(profile.getGithubUrl())
                .linkedinUrl(profile.getLinkedinUrl())
                .leetcodeUrl(profile.getLeetcodeUrl())
                .yearsOfExperience(profile.getYearsOfExperience())
                .projectsCount(profile.getProjectsCount())
                .problemsSolvedCount(profile.getProblemsSolvedCount())
                .technologiesCount(profile.getTechnologiesCount())
                .stat1Label(profile.getStat1Label())
                .stat1Value(profile.getStat1Value())
                .stat2Label(profile.getStat2Label())
                .stat2Value(profile.getStat2Value())
                .stat3Label(profile.getStat3Label())
                .stat3Value(profile.getStat3Value())
                .stat4Label(profile.getStat4Label())
                .stat4Value(profile.getStat4Value())
                .defaultTheme(profile.getDefaultTheme() != null ? profile.getDefaultTheme() : "light")
                .heroQuote(profile.getHeroQuote())
                .triad1Title(profile.getTriad1Title())
                .triad1Spec(profile.getTriad1Spec())
                .triad1Desc(profile.getTriad1Desc())
                .triad2Title(profile.getTriad2Title())
                .triad2Spec(profile.getTriad2Spec())
                .triad2Desc(profile.getTriad2Desc())
                .triad3Title(profile.getTriad3Title())
                .triad3Spec(profile.getTriad3Spec())
                .triad3Desc(profile.getTriad3Desc())
                .inFocusTitle(profile.getInFocusTitle())
                .inFocusDescription(profile.getInFocusDescription())
                .inFocusMetric1Value(profile.getInFocusMetric1Value())
                .inFocusMetric1Label(profile.getInFocusMetric1Label())
                .inFocusMetric2Value(profile.getInFocusMetric2Value())
                .inFocusMetric2Label(profile.getInFocusMetric2Label())
                .inFocusMetric3Value(profile.getInFocusMetric3Value())
                .inFocusMetric3Label(profile.getInFocusMetric3Label())
                .devCornerCapabilities(profile.getDevCornerCapabilities())
                .engineeringPrinciples(profile.getEngineeringPrinciples())
                .aboutLocationLine(profile.getAboutLocationLine())
                .footerHeading(profile.getFooterHeading())
                .footerSubheading(profile.getFooterSubheading())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
