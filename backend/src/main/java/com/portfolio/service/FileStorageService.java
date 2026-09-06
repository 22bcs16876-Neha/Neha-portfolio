package com.portfolio.service;

import com.portfolio.entity.StoredFile;
import com.portfolio.exception.BadRequestException;
import com.portfolio.repository.StoredFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final StoredFileRepository storedFileRepository;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "jpg", "jpeg", "png", "webp", "gif", "svg", "pdf"
    );

    @Transactional
    public String storeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Failed to store empty file.");
        }

        String originalFilename = StringUtils.cleanPath(
                file.getOriginalFilename() != null ? file.getOriginalFilename() : "file"
        );

        if (originalFilename.contains("..")) {
            throw new BadRequestException("Filename contains invalid path sequence: " + originalFilename);
        }

        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            extension = originalFilename.substring(i + 1).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("File type '." + extension + "' is not permitted. Allowed: " + String.join(", ", ALLOWED_EXTENSIONS));
        }

        String safeName = (i > 0 ? originalFilename.substring(0, i) : originalFilename).replaceAll("[^a-zA-Z0-9_-]", "_");
        if (safeName.length() > 30) {
            safeName = safeName.substring(0, 30);
        }
        String uniqueFilename = safeName + "-" + UUID.randomUUID().toString().substring(0, 8) + "." + extension;

        try {
            byte[] fileBytes = file.getBytes();
            String contentType = file.getContentType();
            if (contentType == null || contentType.isBlank()) {
                contentType = probeContentType(uniqueFilename);
            }

            // Save directly into Aiven MySQL database - zero files stored on Render hard disk
            StoredFile storedFile = StoredFile.builder()
                    .filename(uniqueFilename)
                    .originalName(originalFilename)
                    .contentType(contentType)
                    .fileSize((long) fileBytes.length)
                    .data(fileBytes)
                    .build();
            storedFileRepository.save(storedFile);
            log.info("Successfully saved file '{}' directly into Aiven MySQL database ({} bytes)", uniqueFilename, fileBytes.length);

            return "/uploads/" + uniqueFilename;
        } catch (IOException ex) {
            log.error("Could not store file {}: {}", uniqueFilename, ex.getMessage());
            throw new RuntimeException("Could not store file " + uniqueFilename + ". Please try again!", ex);
        }
    }

    @Transactional(readOnly = true)
    public Optional<StoredFile> getStoredFile(String filename) {
        return storedFileRepository.findByFilename(filename);
    }

    public static String probeContentType(String filename) {
        String lower = filename.toLowerCase();
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".webp")) return "image/webp";
        if (lower.endsWith(".gif")) return "image/gif";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".pdf")) return "application/pdf";
        return "application/octet-stream";
    }
}