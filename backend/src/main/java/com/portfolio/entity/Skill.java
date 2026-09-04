package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    // e.g. BACKEND, FRONTEND, DATABASE, DEVOPS, PROGRAMMING, TOOLS
    @Column(nullable = false, length = 40)
    private String category;

    // e.g. ADVANCED, PROFICIENT, FAMILIAR
    @Column(length = 30)
    @Builder.Default
    private String proficiency = "PROFICIENT";

    // e.g. Server, Database, Code, Cpu, Terminal, GitBranch, Layers, Layout
    @Column(name = "icon_name", length = 50)
    private String iconName;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
