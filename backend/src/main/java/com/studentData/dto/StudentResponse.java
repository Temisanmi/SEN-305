package com.studentData.dto;

import com.studentData.entity.Student;
import com.studentData.entity.enums.Department;
import com.studentData.entity.enums.Gender;
import com.studentData.entity.enums.Hostel;
import com.studentData.entity.enums.Level;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class StudentResponse {
    private final String firstName;
    private final String lastName;
    private final String matricNumber;
    private final Department department;
    private final LocalDate dob;
    private final Gender gender;
    private final Level level;
    private final Hostel hostel;
    private final String email;
    private final String phone;

    public StudentResponse(Student student) {
        this.firstName = student.getFirstName();
        this.lastName = student.getLastName();
        this.matricNumber = student.getMatricNumber();
        this.department = student.getDepartment();
        this.dob = student.getDob();
        this.gender = student.getGender();
        this.level = student.getLevel();
        this.hostel = student.getHostel();
        this.email = student.getEmail();
        this.phone = student.getPhone();
    }
}