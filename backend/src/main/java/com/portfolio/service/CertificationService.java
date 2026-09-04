package com.portfolio.service;

import com.portfolio.dto.CertificationDto;
import com.portfolio.entity.Certification;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository certificationRepository;

    @Transactional(readOnly = true)
    public List<CertificationDto> getAllCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public CertificationDto createCertification(CertificationDto dto) {
        Certification certification = Certification.builder()
                .title(dto.getTitle())
                .issuer(dto.getIssuer())
                .issueDate(dto.getIssueDate())
                .credentialId(dto.getCredentialId())
                .credentialUrl(dto.getCredentialUrl())
                .imageUrl(dto.getImageUrl())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return toDto(certificationRepository.save(certification));
    }

    @Transactional
    public CertificationDto updateCertification(Long id, CertificationDto dto) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));

        certification.setTitle(dto.getTitle());
        certification.setIssuer(dto.getIssuer());
        certification.setIssueDate(dto.getIssueDate());
        certification.setCredentialId(dto.getCredentialId());
        certification.setCredentialUrl(dto.getCredentialUrl());
        certification.setImageUrl(dto.getImageUrl());
        if (dto.getDisplayOrder() != null) {
            certification.setDisplayOrder(dto.getDisplayOrder());
        }

        return toDto(certificationRepository.save(certification));
    }

    @Transactional
    public void deleteCertification(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        certificationRepository.delete(certification);
    }

    private CertificationDto toDto(Certification certification) {
        return CertificationDto.builder()
                .id(certification.getId())
                .title(certification.getTitle())
                .issuer(certification.getIssuer())
                .issueDate(certification.getIssueDate())
                .credentialId(certification.getCredentialId())
                .credentialUrl(certification.getCredentialUrl())
                .imageUrl(certification.getImageUrl())
                .displayOrder(certification.getDisplayOrder())
                .build();
    }
}
