const API_URL = "http://localhost:8080/api";

const message = document.getElementById("message");

function goToLogin() {
    window.location.href = "login.html";
}

function formatEnum(value) {
    if (value.startsWith("LEVEL_")) return `${value.slice(6)} Level`;
    return value
        .toLowerCase()
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
        await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
    } finally {
        goToLogin();
    }
});

async function loadProfile() {
    try {
        const response = await fetch(`${API_URL}/students/me`, { credentials: "include" });

        if (response.status === 401) {
            goToLogin();
            return;
        }
        if (!response.ok) throw new Error();

        const student = await response.json();

        document.getElementById("fullName").textContent =
            `${student.firstName} ${student.lastName}`;

        document.querySelectorAll("[data-field]").forEach((el) => {
            const field = el.dataset.field;
            const value = student[field] ?? "";

            if (["department", "level", "hostel", "gender"].includes(field)) {
                el.textContent = formatEnum(value);
            } else if (field === "dob") {
                el.textContent = formatDate(value);
            } else {
                el.textContent = value;
            }
        });
    } catch (error) {
        document.getElementById("fullName").textContent = "Student Dashboard";
        message.textContent = "Could not load your details. Try again later.";
        message.className = "error";
    }
}

loadProfile();