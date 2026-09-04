package com.portfolio.service;

import com.portfolio.dto.ContactMessageDto;
import com.portfolio.dto.ContactRequest;
import com.portfolio.entity.ContactMessage;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    @Transactional
    public ContactMessageDto saveMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName().trim())
                .email(request.getEmail().trim().toLowerCase())
                .subject(request.getSubject().trim())
                .message(request.getMessage().trim())
                .status("UNREAD")
                .build();

        ContactMessage saved = contactMessageRepository.save(message);
        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDto> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDto> getMessagesByStatus(String status) {
        return contactMessageRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase())
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public ContactMessageDto updateMessageStatus(Long id, String status) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));

        message.setStatus(status.toUpperCase());
        return toDto(contactMessageRepository.save(message));
    }

    @Transactional
    public void deleteMessage(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));
        contactMessageRepository.delete(message);
    }

    private ContactMessageDto toDto(ContactMessage message) {
        return ContactMessageDto.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .subject(message.getSubject())
                .message(message.getMessage())
                .status(message.getStatus())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
