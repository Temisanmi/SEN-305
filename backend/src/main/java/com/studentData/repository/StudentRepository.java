package com.studentData.repository;

import com.studentData.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByMatricNumber(String matricNumber);

    Optional<Student> findByMatricNumber(String matricNumber);
}