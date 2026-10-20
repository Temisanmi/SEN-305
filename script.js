const form = document.getElementById("biodataForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const matricNumber = document.getElementById("matricNumber").value.trim();
    const level = document.getElementById("level").value;
    const hostel = document.getElementById("hostel").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    if (
        firstName === "" ||
        lastName === "" ||
        matricNumber === "" ||
        level === "" ||
        hostel === "" ||
        gender === "" ||
        email === ""
    ) {
        message.textContent = "Please fill in all fields.";
        message.className = "error";
        return;
    }

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Matric Number:", matricNumber);
    console.log("Level:", level);
    console.log("Hostel:", hostel);
    console.log("Gender:", gender);
    console.log("Email:", email);

    message.textContent =
        `Biodata submitted successfully! Welcome, ${firstName} ${lastName}.`;

    message.className = "success";

    form.reset();
});
