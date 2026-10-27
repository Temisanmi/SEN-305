package com.studentData.dto;

import com.studentData.entity.enums.Department;
import com.studentData.entity.enums.Gender;
import com.studentData.entity.enums.Hostel;
import com.studentData.entity.enums.Level;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    @Size(min = 3, max = 25, message = "Invalid length")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 3, max = 25, message = "Invalid length")
    private String lastName;

    @NotBlank(message = "Matric number is required!")
    private String matricNumber;

    @NotNull(message = "Enter your department")
    private Department department;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Set a correct DOB!")
    private LocalDate dob;

    @NotNull(message = "Enter your gender")
    private Gender gender;

    @NotNull(message = "Enter your level")
    private Level level;

    @NotNull(message = "Enter your hostel")
    private Hostel hostel;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "[0-9+ ]{10,15}", message = "Phone number must be 10 to 15 digits")
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}