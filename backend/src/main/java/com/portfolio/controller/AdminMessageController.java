package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactMessageDto;
import com.portfolio.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
public class AdminMessageController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactMessageDto>>> getAllMessages(
            @RequestParam(required = false) String status) {
        List<ContactMessageDto> messages;
        if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("ALL")) {
            messages = contactService.getMessagesByStatus(status);
        } else {
            messages = contactService.getAllMessages();
        }
        return ResponseEntity.ok(ApiResponse.ok(messages));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ContactMessageDto>> updateMessageStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        if (status == null || status.trim().isEmpty()) {
            status = "READ";
        }
        ContactMessageDto updated = contactService.updateMessageStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Message status updated", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.ok("Message deleted successfully", null));
    }
}
