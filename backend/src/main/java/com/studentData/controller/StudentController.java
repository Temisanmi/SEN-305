package com.studentData.controller;

import com.studentData.dto.StudentResponse;
import com.studentData.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("/me")
    public StudentResponse me(Authentication authentication) {
        return studentService.getByMatricNumber(authentication.getName());
    }
}