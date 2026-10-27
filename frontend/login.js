const API_URL = "http://localhost:8080/api";

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

if (new URLSearchParams(window.location.search).get("registered")) {
    message.textContent = "Account created. Log in to continue.";
    message.className = "success";
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const matricNumber = document.getElementById("matricNumber").value.trim().toUpperCase();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({ matricNumber, password }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || "Matric number or password is incorrect.");
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        message.textContent = error.message === "Failed to fetch"
            ? "Cannot reach the server. Try again later."
            : error.message;
        message.className = "error";
    }
});