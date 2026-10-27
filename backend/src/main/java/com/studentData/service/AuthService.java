package com.studentData.service;

import com.studentData.dto.RegisterRequest;
import com.studentData.entity.Student;
import com.studentData.entity.enums.Gender;
import com.studentData.entity.enums.Hostel;
import com.studentData.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {
        String matric = request.getMatricNumber().trim().toUpperCase();

        if (studentRepository.existsByMatricNumber(matric)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "An account with this matric number already exists.");
        }

        // The hostel must match the student's gender
        boolean mismatch =
                (request.getHostel() == Hostel.MALE_HOSTEL && request.getGender() != Gender.MALE)
                        || (request.getHostel() == Hostel.FEMALE_HOSTEL && request.getGender() != Gender.FEMALE);
        if (mismatch) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Selected hostel does not match gender.");
        }

        Student student = new Student();
        student.setFirstName(request.getFirstName().trim());
        student.setLastName(request.getLastName().trim());
        student.setMatricNumber(matric);
        student.setDepartment(request.getDepartment());
        student.setDob(request.getDob());
        student.setGender(request.getGender());
        student.setLevel(request.getLevel());
        student.setHostel(request.getHostel());
        student.setEmail(request.getEmail().trim());
        student.setPhone(request.getPhone().trim());
        student.setPassword(passwordEncoder.encode(request.getPassword()));

        studentRepository.save(student);
    }
}