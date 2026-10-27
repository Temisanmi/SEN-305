const API_URL = "http://localhost:8080/api";

const form = document.getElementById("signupForm");
const message = document.getElementById("message");

function showError(text) {
    message.textContent = text;
    message.className = "error";
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    data.matricNumber = data.matricNumber.trim().toUpperCase();

    if (data.password !== data.confirmPassword) {
        showError("Passwords do not match.");
        return;
    }
    delete data.confirmPassword; 

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "Sign up failed. Please try again.");
        }

        window.location.href = "login.html?registered=true";
    } catch (error) {
        showError(error.message === "Failed to fetch"
            ? "Cannot reach the server. Try again later."
            : error.message);
    }
});