package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDto {
    private Long id;

    private String fullName;
    private String title;

    private String tagline;
    private String roleBadge;
    private String statusText;
    private String heroTechStack;
    private String bio;
    private String shortAbout;
    private String fullAbout;
    private String email;
    private String phone;
    private String location;
    private String avatarUrl;
    private String resumeUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String leetcodeUrl;
    private Integer yearsOfExperience;
    private Integer projectsCount;
    private Integer problemsSolvedCount;
    private Integer technologiesCount;

    // Customizable metrics
    private String stat1Label;
    private String stat1Value;
    private String stat2Label;
    private String stat2Value;
    private String stat3Label;
    private String stat3Value;
    private String stat4Label;
    private String stat4Value;

    private String defaultTheme;

    // Hero Quote & Triads
    private String heroQuote;
    private String triad1Title;
    private String triad1Spec;
    private String triad1Desc;
    private String triad2Title;
    private String triad2Spec;
    private String triad2Desc;
    private String triad3Title;
    private String triad3Spec;
    private String triad3Desc;

    // Developer's Corner In-Focus & Metrics
    private String inFocusTitle;
    private String inFocusDescription;
    private String inFocusMetric1Value;
    private String inFocusMetric1Label;
    private String inFocusMetric2Value;
    private String inFocusMetric2Label;
    private String inFocusMetric3Value;
    private String inFocusMetric3Label;
    private String devCornerCapabilities;

    // About Principles & Location
    private String engineeringPrinciples;
    private String aboutLocationLine;

    // Footer Banner
    private String footerHeading;
    private String footerSubheading;

    private LocalDateTime updatedAt;
}
