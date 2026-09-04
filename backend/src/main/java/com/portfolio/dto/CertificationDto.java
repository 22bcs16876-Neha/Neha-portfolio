package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificationDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Issuer is required")
    private String issuer;

    private String issueDate;
    private String credentialId;
    private String credentialUrl;
    private String imageUrl;
    private Integer displayOrder;
}
