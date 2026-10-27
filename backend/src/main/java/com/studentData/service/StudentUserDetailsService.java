package com.studentData.service;

import com.studentData.entity.Student;
import com.studentData.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentUserDetailsService implements UserDetailsService {
    private final StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String matricNumber) throws UsernameNotFoundException {
        Student student = studentRepository.findByMatricNumber(matricNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Student not found"));

        return User.withUsername(student.getMatricNumber())
                .password(student.getPassword())
                .roles("STUDENT")
                .build();
    }
}