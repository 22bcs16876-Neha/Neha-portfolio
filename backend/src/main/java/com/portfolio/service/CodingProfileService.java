package com.portfolio.service;

import com.portfolio.dto.CodingProfileDto;
import com.portfolio.entity.CodingProfile;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.CodingProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CodingProfileService {

    private final CodingProfileRepository codingProfileRepository;

    @Transactional(readOnly = true)
    public List<CodingProfileDto> getAllCodingProfiles() {
        return codingProfileRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public CodingProfileDto createCodingProfile(CodingProfileDto dto) {
        CodingProfile profile = CodingProfile.builder()
                .platform(dto.getPlatform())
                .username(dto.getUsername())
                .profileUrl(dto.getProfileUrl())
                .iconName(dto.getIconName())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(codingProfileRepository.save(profile));
    }

    @Transactional
    public CodingProfileDto updateCodingProfile(Long id, CodingProfileDto dto) {
        CodingProfile profile = codingProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CodingProfile", "id", id));

        profile.setPlatform(dto.getPlatform());
        profile.setUsername(dto.getUsername());
        profile.setProfileUrl(dto.getProfileUrl());
        profile.setIconName(dto.getIconName());
        if (dto.getDisplayOrder() != null) {
            profile.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(codingProfileRepository.save(profile));
    }

    @Transactional
    public void deleteCodingProfile(Long id) {
        CodingProfile profile = codingProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CodingProfile", "id", id));
        codingProfileRepository.delete(profile);
    }

    private CodingProfileDto toDto(CodingProfile profile) {
        return CodingProfileDto.builder()
                .id(profile.getId())
                .platform(profile.getPlatform())
                .username(profile.getUsername())
                .profileUrl(profile.getProfileUrl())
                .iconName(profile.getIconName())
                .displayOrder(profile.getDisplayOrder())
                .build();
    }
}
