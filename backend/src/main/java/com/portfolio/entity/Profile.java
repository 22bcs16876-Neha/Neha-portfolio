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

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 255)
    private String tagline;

    @Column(name = "role_badge", length = 80)
    @Builder.Default
    private String roleBadge = "Software Engineer";

    @Column(name = "status_text", length = 120)
    @Builder.Default
    private String statusText = "Open to Opportunities";

    @Column(name = "hero_tech_stack", length = 300)
    @Builder.Default
    private String heroTechStack = "Java 21, Spring Boot 3, MySQL, Docker, React";

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
    @Builder.Default
    private Integer yearsOfExperience = 4;

    @Column(name = "projects_count")
    @Builder.Default
    private Integer projectsCount = 14;

    @Column(name = "problems_solved_count")
    @Builder.Default
    private Integer problemsSolvedCount = 500;

    @Column(name = "technologies_count")
    @Builder.Default
    private Integer technologiesCount = 20;

    // Customizable Dynamic Quick Fact Metrics (any role can customize labels & values)
    @Column(name = "stat1_label", length = 80)
    @Builder.Default
    private String stat1Label = "Years Experience";

    @Column(name = "stat1_value", length = 50)
    @Builder.Default
    private String stat1Value = "4+";

    @Column(name = "stat2_label", length = 80)
    @Builder.Default
    private String stat2Label = "Projects Completed";

    @Column(name = "stat2_value", length = 50)
    @Builder.Default
    private String stat2Value = "14+";

    @Column(name = "stat3_label", length = 80)
    @Builder.Default
    private String stat3Label = "DSA Problems Solved";

    @Column(name = "stat3_value", length = 50)
    @Builder.Default
    private String stat3Value = "500+";

    @Column(name = "stat4_label", length = 80)
    @Builder.Default
    private String stat4Label = "Technologies Mastered";

    @Column(name = "stat4_value", length = 50)
    @Builder.Default
    private String stat4Value = "20+";

    @Column(name = "default_theme", length = 20)
    @Builder.Default
    private String defaultTheme = "light";

    // Hero Editorial Quote
    @Lob
    @Column(name = "hero_quote", columnDefinition = "TEXT")
    @Builder.Default
    private String heroQuote = "Dependable software is built on predictability, clean abstractions, and defensive engineering. Today, the most valuable systems are not the most complex — they are the most reliable.";

    // Hero Triad Architecture Focus Cards
    @Column(name = "triad1_title", length = 100)
    @Builder.Default
    private String triad1Title = "Backend & Microservices";

    @Column(name = "triad1_spec", length = 120)
    @Builder.Default
    private String triad1Spec = "Java 21 • Spring Boot 3";

    @Lob
    @Column(name = "triad1_desc", columnDefinition = "TEXT")
    @Builder.Default
    private String triad1Desc = "Engineering high-throughput REST APIs, stateless JWT security, distributed service communication, and robust error handling pipelines.";

    @Column(name = "triad2_title", length = 100)
    @Builder.Default
    private String triad2Title = "Data Systems & Modeling";

    @Column(name = "triad2_spec", length = 120)
    @Builder.Default
    private String triad2Spec = "MySQL • PostgreSQL • JPA";

    @Lob
    @Column(name = "triad2_desc", columnDefinition = "TEXT")
    @Builder.Default
    private String triad2Desc = "Relational schema design, transactional boundary configuration, index optimization, query execution plan analysis, and data consistency.";

    @Column(name = "triad3_title", length = 100)
    @Builder.Default
    private String triad3Title = "Production Orchestration";

    @Column(name = "triad3_spec", length = 120)
    @Builder.Default
    private String triad3Spec = "Docker • Linux • Compose";

    @Lob
    @Column(name = "triad3_desc", columnDefinition = "TEXT")
    @Builder.Default
    private String triad3Desc = "Multi-stage container builds, reproducible runtime configurations, container health probes, and defensive deployment practices.";

    // Developer's Corner - In-Focus Spotlight & Metrics
    @Column(name = "in_focus_title", length = 200)
    @Builder.Default
    private String inFocusTitle = "Enterprise Microservices Architecture & High-Throughput Engine";

    @Lob
    @Column(name = "in_focus_description", columnDefinition = "TEXT")
    @Builder.Default
    private String inFocusDescription = "Designed and deployed a resilient microservices foundation with Java 21 and Spring Boot 3. Implements stateless JWT authentication, distributed transactional boundaries, asynchronous order processing, and defensive circuit breakers for high availability under heavy transactional load.";

    @Column(name = "in_focus_metric1_value", length = 50)
    @Builder.Default
    private String inFocusMetric1Value = "99.9%";

    @Column(name = "in_focus_metric1_label", length = 80)
    @Builder.Default
    private String inFocusMetric1Label = "SLA Uptime";

    @Column(name = "in_focus_metric2_value", length = 50)
    @Builder.Default
    private String inFocusMetric2Value = "<85ms";

    @Column(name = "in_focus_metric2_label", length = 80)
    @Builder.Default
    private String inFocusMetric2Label = "P95 Latency";

    @Column(name = "in_focus_metric3_value", length = 50)
    @Builder.Default
    private String inFocusMetric3Value = "Zero";

    @Column(name = "in_focus_metric3_label", length = 80)
    @Builder.Default
    private String inFocusMetric3Label = "Session State";

    // Developer's Corner - 6 Core Competencies JSON or text
    @Lob
    @Column(name = "dev_corner_capabilities", columnDefinition = "TEXT")
    private String devCornerCapabilities;

    // About Section - Engineering Principles & Location Line
    @Lob
    @Column(name = "engineering_principles", columnDefinition = "TEXT")
    private String engineeringPrinciples;

    @Column(name = "about_location_line", length = 300)
    @Builder.Default
    private String aboutLocationLine = "Based in Bengaluru, India. Passionate about participating in open-source development, competitive programming, and continuous hands-on learning.";

    // Footer Engagement Banner
    @Column(name = "footer_heading", length = 200)
    @Builder.Default
    private String footerHeading = "Building resilient systems, one transaction at a time.";

    @Lob
    @Column(name = "footer_subheading", columnDefinition = "TEXT")
    @Builder.Default
    private String footerSubheading = "Open to backend software engineering positions, microservices architecture challenges, and full-stack integration projects.";

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
