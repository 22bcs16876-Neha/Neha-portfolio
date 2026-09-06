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
            return null;
        }

        return toDto(profile);
    }

    @Transactional
    public ProfileDto updateProfile(ProfileDto dto) {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(Profile::new);

        if (dto.getFullName() != null) profile.setFullName(dto.getFullName());
        if (dto.getTitle() != null) profile.setTitle(dto.getTitle());
        if (dto.getTagline() != null) profile.setTagline(dto.getTagline());
        if (dto.getRoleBadge() != null) profile.setRoleBadge(dto.getRoleBadge());
        if (dto.getStatusText() != null) profile.setStatusText(dto.getStatusText());
        if (dto.getHeroTechStack() != null) profile.setHeroTechStack(dto.getHeroTechStack());
        if (dto.getBio() != null) profile.setBio(dto.getBio());
        if (dto.getShortAbout() != null) profile.setShortAbout(dto.getShortAbout());
        if (dto.getFullAbout() != null) profile.setFullAbout(dto.getFullAbout());
        if (dto.getEmail() != null) profile.setEmail(dto.getEmail());
        if (dto.getPhone() != null) profile.setPhone(dto.getPhone());
        if (dto.getLocation() != null) profile.setLocation(dto.getLocation());
        if (dto.getAvatarUrl() != null) profile.setAvatarUrl(dto.getAvatarUrl());
        if (dto.getResumeUrl() != null) profile.setResumeUrl(dto.getResumeUrl());
        if (dto.getGithubUrl() != null) profile.setGithubUrl(dto.getGithubUrl());
        if (dto.getLinkedinUrl() != null) profile.setLinkedinUrl(dto.getLinkedinUrl());
        if (dto.getLeetcodeUrl() != null) profile.setLeetcodeUrl(dto.getLeetcodeUrl());
        if (dto.getYearsOfExperience() != null) profile.setYearsOfExperience(dto.getYearsOfExperience());
        if (dto.getProjectsCount() != null) profile.setProjectsCount(dto.getProjectsCount());
        if (dto.getProblemsSolvedCount() != null) profile.setProblemsSolvedCount(dto.getProblemsSolvedCount());
        if (dto.getTechnologiesCount() != null) profile.setTechnologiesCount(dto.getTechnologiesCount());

        if (dto.getStat1Label() != null) profile.setStat1Label(dto.getStat1Label());
        if (dto.getStat1Value() != null) profile.setStat1Value(dto.getStat1Value());
        if (dto.getStat2Label() != null) profile.setStat2Label(dto.getStat2Label());
        if (dto.getStat2Value() != null) profile.setStat2Value(dto.getStat2Value());
        if (dto.getStat3Label() != null) profile.setStat3Label(dto.getStat3Label());
        if (dto.getStat3Value() != null) profile.setStat3Value(dto.getStat3Value());
        if (dto.getStat4Label() != null) profile.setStat4Label(dto.getStat4Label());
        if (dto.getStat4Value() != null) profile.setStat4Value(dto.getStat4Value());

        // Hero Quote & Triad Cards
        if (dto.getHeroQuote() != null) profile.setHeroQuote(dto.getHeroQuote());
        if (dto.getTriad1Title() != null) profile.setTriad1Title(dto.getTriad1Title());
        if (dto.getTriad1Spec() != null) profile.setTriad1Spec(dto.getTriad1Spec());
        if (dto.getTriad1Desc() != null) profile.setTriad1Desc(dto.getTriad1Desc());
        if (dto.getTriad2Title() != null) profile.setTriad2Title(dto.getTriad2Title());
        if (dto.getTriad2Spec() != null) profile.setTriad2Spec(dto.getTriad2Spec());
        if (dto.getTriad2Desc() != null) profile.setTriad2Desc(dto.getTriad2Desc());
        if (dto.getTriad3Title() != null) profile.setTriad3Title(dto.getTriad3Title());
        if (dto.getTriad3Spec() != null) profile.setTriad3Spec(dto.getTriad3Spec());
        if (dto.getTriad3Desc() != null) profile.setTriad3Desc(dto.getTriad3Desc());

        // Developer's Corner In-Focus & Capabilities
        if (dto.getInFocusTitle() != null) profile.setInFocusTitle(dto.getInFocusTitle());
        if (dto.getInFocusDescription() != null) profile.setInFocusDescription(dto.getInFocusDescription());
        if (dto.getInFocusMetric1Value() != null) profile.setInFocusMetric1Value(dto.getInFocusMetric1Value());
        if (dto.getInFocusMetric1Label() != null) profile.setInFocusMetric1Label(dto.getInFocusMetric1Label());
        if (dto.getInFocusMetric2Value() != null) profile.setInFocusMetric2Value(dto.getInFocusMetric2Value());
        if (dto.getInFocusMetric2Label() != null) profile.setInFocusMetric2Label(dto.getInFocusMetric2Label());
        if (dto.getInFocusMetric3Value() != null) profile.setInFocusMetric3Value(dto.getInFocusMetric3Value());
        if (dto.getInFocusMetric3Label() != null) profile.setInFocusMetric3Label(dto.getInFocusMetric3Label());
        if (dto.getDevCornerCapabilities() != null) profile.setDevCornerCapabilities(dto.getDevCornerCapabilities());

        // About Principles & Location
        if (dto.getEngineeringPrinciples() != null) profile.setEngineeringPrinciples(dto.getEngineeringPrinciples());
        if (dto.getAboutLocationLine() != null) profile.setAboutLocationLine(dto.getAboutLocationLine());

        // Footer Banner
        if (dto.getFooterHeading() != null) profile.setFooterHeading(dto.getFooterHeading());
        if (dto.getFooterSubheading() != null) profile.setFooterSubheading(dto.getFooterSubheading());

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
