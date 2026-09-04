package com.portfolio.repository;

import com.portfolio.entity.CodingProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingProfileRepository extends JpaRepository<CodingProfile, Long> {
    List<CodingProfile> findAllByOrderByDisplayOrderAsc();
}
