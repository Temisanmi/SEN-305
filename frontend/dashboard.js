const API_URL = "http://localhost:8080/api";

const token = localStorage.getItem("token");
const message = document.getElementById("message");

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

if (!token) {
    logout();
}

document.getElementById("logoutBtn").addEventListener("click", logout);

async function loadProfile() {
    try {
        const response = await fetch(`${API_URL}/students/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401 || response.status === 403) {
            logout();
            return;
        }
        if (!response.ok) throw new Error();

        const student = await response.json();

        document.getElementById("fullName").textContent =
            `${student.firstName} ${student.lastName}`;

        // Fills every element that has data-field="..." in dashboard.html
        document.querySelectorAll("[data-field]").forEach((el) => {
            el.textContent = student[el.dataset.field] ?? "";
        });
    } catch (error) {
        document.getElementById("fullName").textContent = "Student Dashboard";
        message.textContent = "Could not load your details. Try again later.";
        message.className = "error";
    }
}

loadProfile();