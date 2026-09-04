package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class UploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileStorageService.storeFile(file);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("url", fileUrl);
        responseData.put("originalName", file.getOriginalFilename());
        responseData.put("size", String.valueOf(file.getSize()));

        return ResponseEntity.ok(ApiResponse.ok("File uploaded successfully", responseData));
    }
}
