package com.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendOtpResponse {
    private String email;
    private String name;
    private String role;
    private String time;
    private String passcode;
    private String serviceId;
    private String templateId;
    private String publicKey;
    private boolean dispatched;
    private String dispatchMessage;
}
