package com.portfolio.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateEmailJsRequest {
    private String serviceId;
    private String templateId;
    private String publicKey;
}
