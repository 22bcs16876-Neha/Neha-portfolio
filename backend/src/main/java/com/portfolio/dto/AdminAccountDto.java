package com.portfolio.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminAccountDto {
    private String username;
    private String email;
    private String emailjsPublicKey;
    private String emailjsServiceId;
    private String emailjsTemplateId;
}
