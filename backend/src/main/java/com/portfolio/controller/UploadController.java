package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.entity.StoredFile;
import com.portfolio.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/api/admin/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileStorageService.storeFile(file);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("url", fileUrl);
        responseData.put("originalName", file.getOriginalFilename());
        responseData.put("size", String.valueOf(file.getSize()));

        return ResponseEntity.ok(ApiResponse.ok("File uploaded successfully to Aiven database", responseData));
    }

    @GetMapping({"/uploads/{filename:.+}", "/api/uploads/{filename:.+}"})
    public ResponseEntity<byte[]> serveFile(@PathVariable String filename) {
        // Stream strictly and dynamically from Aiven MySQL database
        Optional<StoredFile> stored = fileStorageService.getStoredFile(filename);
        if (stored.isPresent()) {
            StoredFile file = stored.get();
            MediaType mediaType;
            try {
                mediaType = MediaType.parseMediaType(
                        file.getContentType() != null ? file.getContentType() : FileStorageService.probeContentType(filename)
                );
            } catch (Exception e) {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getOriginalName() + "\"")
                    .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
                    .body(file.getData());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}