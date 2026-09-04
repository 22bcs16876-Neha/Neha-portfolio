package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactMessageDto;
import com.portfolio.dto.ContactRequest;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactMessageDto>> submitContactMessage(
            @Valid @RequestBody ContactRequest request) {
        ContactMessageDto saved = contactService.saveMessage(request);
        return new ResponseEntity<>(
                ApiResponse.ok("Thank you for reaching out! Your message has been received.", saved),
                HttpStatus.CREATED
        );
    }
}
