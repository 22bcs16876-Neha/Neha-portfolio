package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", length = 100)
    private String fullName;

    @Column(length = 150)
    private String title;

    @Column(length = 255)
    private String tagline;

    @Column(name = "role_badge", length = 80)
    private String roleBadge;

    @Column(name = "status_text", length = 120)
    private String statusText;

    @Column(name = "hero_tech_stack", length = 300)
    private String heroTechStack;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String bio;

    @Lob
    @Column(name = "short_about", columnDefinition = "TEXT")
    private String shortAbout;

    @Lob
    @Column(name = "full_about", columnDefinition = "TEXT")
    private String fullAbout;

    @Column(length = 120)
    private String email;

    @Column(length = 40)
    private String phone;

    @Column(length = 100)
    private String location;

    @Lob
    @Column(name = "avatar_url", columnDefinition = "LONGTEXT")
    private String avatarUrl;

    @Lob
    @Column(name = "resume_url", columnDefinition = "LONGTEXT")
    private String resumeUrl;

    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Column(name = "linkedin_url", length = 255)
    private String linkedinUrl;

    @Column(name = "leetcode_url", length = 255)
    private String leetcodeUrl;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "projects_count")
    private Integer projectsCount;

    @Column(name = "problems_solved_count")
    private Integer problemsSolvedCount;

    @Column(name = "technologies_count")
    private Integer technologiesCount;

    // Customizable Dynamic Quick Fact Metrics (any role can customize labels & values)
    @Column(name = "stat1_label", length = 80)
    private String stat1Label;

    @Column(name = "stat1_value", length = 50)
    private String stat1Value;

    @Column(name = "stat2_label", length = 80)
    private String stat2Label;

    @Column(name = "stat2_value", length = 50)
    private String stat2Value;

    @Column(name = "stat3_label", length = 80)
    private String stat3Label;

    @Column(name = "stat3_value", length = 50)
    private String stat3Value;

    @Column(name = "stat4_label", length = 80)
    private String stat4Label;

    @Column(name = "stat4_value", length = 50)
    private String stat4Value;

    @Column(name = "default_theme", length = 20)
    private String defaultTheme;

    // Hero Editorial Quote
    @Lob
    @Column(name = "hero_quote", columnDefinition = "TEXT")
    private String heroQuote;

    // Hero Triad Architecture Focus Cards
    @Column(name = "triad1_title", length = 100)
    private String triad1Title;

    @Column(name = "triad1_spec", length = 120)
    private String triad1Spec;

    @Lob
    @Column(name = "triad1_desc", columnDefinition = "TEXT")
    private String triad1Desc;

    @Column(name = "triad2_title", length = 100)
    private String triad2Title;

    @Column(name = "triad2_spec", length = 120)
    private String triad2Spec;

    @Lob
    @Column(name = "triad2_desc", columnDefinition = "TEXT")
    private String triad2Desc;

    @Column(name = "triad3_title", length = 100)
    private String triad3Title;

    @Column(name = "triad3_spec", length = 120)
    private String triad3Spec;

    @Lob
    @Column(name = "triad3_desc", columnDefinition = "TEXT")
    private String triad3Desc;

    // Developer's Corner - In-Focus Spotlight & Metrics
    @Column(name = "in_focus_title", length = 200)
    private String inFocusTitle;

    @Lob
    @Column(name = "in_focus_description", columnDefinition = "TEXT")
    private String inFocusDescription;

    @Column(name = "in_focus_metric1_value", length = 50)
    private String inFocusMetric1Value;

    @Column(name = "in_focus_metric1_label", length = 80)
    private String inFocusMetric1Label;

    @Column(name = "in_focus_metric2_value", length = 50)
    private String inFocusMetric2Value;

    @Column(name = "in_focus_metric2_label", length = 80)
    private String inFocusMetric2Label;

    @Column(name = "in_focus_metric3_value", length = 50)
    private String inFocusMetric3Value;

    @Column(name = "in_focus_metric3_label", length = 80)
    private String inFocusMetric3Label;

    // Developer's Corner - 6 Core Competencies JSON or text
    @Lob
    @Column(name = "dev_corner_capabilities", columnDefinition = "TEXT")
    private String devCornerCapabilities;

    // About Section - Engineering Principles & Location Line
    @Lob
    @Column(name = "engineering_principles", columnDefinition = "TEXT")
    private String engineeringPrinciples;

    @Column(name = "about_location_line", length = 300)
    private String aboutLocationLine;

    // Footer Engagement Banner
    @Column(name = "footer_heading", length = 200)
    private String footerHeading;

    @Lob
    @Column(name = "footer_subheading", columnDefinition = "TEXT")
    private String footerSubheading;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
