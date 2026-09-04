package com.portfolio.service;

import com.portfolio.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "jpg", "jpeg", "png", "webp", "gif", "svg", "pdf"
    );

    public FileStorageService(@Value("${upload.dir:./uploads}") String uploadDir) {
        Path targetPath;
        try {
            targetPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(targetPath);
            log.info("File upload storage directory initialized at: {}", targetPath);
        } catch (Exception ex) {
            log.warn("Could not create upload directory '{}': {}. Falling back to system temp directory.", uploadDir, ex.getMessage());
            try {
                targetPath = Paths.get(System.getProperty("java.io.tmpdir"), "uploads").toAbsolutePath().normalize();
                Files.createDirectories(targetPath);
                log.info("Fallback upload directory initialized at: {}", targetPath);
            } catch (Exception tempEx) {
                targetPath = Paths.get(".").toAbsolutePath().normalize();
                log.error("Could not create temp directory either: {}", tempEx.getMessage());
            }
        }
        this.fileStorageLocation = targetPath;
    }

    public String storeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Failed to store empty file.");
        }

        String originalFilename = StringUtils.cleanPath(
                file.getOriginalFilename() != null ? file.getOriginalFilename() : "file"
        );

        // Security check: reject paths with directory traversal
        if (originalFilename.contains("..")) {
            throw new BadRequestException("Filename contains invalid path sequence: " + originalFilename);
        }

        // Validate extension
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            extension = originalFilename.substring(i + 1).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("File type '." + extension + "' is not permitted. Allowed: " + String.join(", ", ALLOWED_EXTENSIONS));
        }

        // Generate safe unique filename
        String safeName = originalFilename.substring(0, i).replaceAll("[^a-zA-Z0-9_-]", "_");
        if (safeName.length() > 30) {
            safeName = safeName.substring(0, 30);
        }
        String uniqueFilename = safeName + "-" + UUID.randomUUID().toString().substring(0, 8) + "." + extension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFilename);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            log.info("Successfully stored uploaded file: {}", uniqueFilename);
            return "/uploads/" + uniqueFilename;
        } catch (IOException ex) {
            log.error("Could not store file {}: {}", uniqueFilename, ex.getMessage());
            throw new RuntimeException("Could not store file " + uniqueFilename + ". Please try again!", ex);
        }
    }
}
