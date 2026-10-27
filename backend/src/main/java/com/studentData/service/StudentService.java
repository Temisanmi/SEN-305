package com.studentData.service;

import com.studentData.dto.StudentResponse;
import com.studentData.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentResponse getByMatricNumber(String matricNumber) {
        return studentRepository.findByMatricNumber(matricNumber)
                .map(StudentResponse::new)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found."));
    }
}