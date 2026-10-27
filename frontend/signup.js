const API_URL = "http://localhost:8080/api";

const form = document.getElementById("signupForm");
const message = document.getElementById("message");

function showMessage(text) {
    message.textContent = text;
    message.className = "error";
}

function showFieldError(field, text) {
    const errorEl = form.querySelector(`[data-error-for="${field}"]`);
    const input = document.getElementById(field);
    if (!errorEl || !input) return false;

    errorEl.textContent = text;
    input.classList.add("invalid");
    return true;
}

function clearErrors() {
    form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    message.textContent = "";
    message.className = "";
}

form.addEventListener("input", (event) => {
    const errorEl = form.querySelector(`[data-error-for="${event.target.id}"]`);
    if (errorEl) errorEl.textContent = "";
    event.target.classList.remove("invalid");
});

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearErrors();

    const data = Object.fromEntries(new FormData(form));

    for (const [key, value] of Object.entries(data)) {
        const cleaned = key.toLowerCase().includes("password") ? value : value.trim();
        data[key] = cleaned === "" ? null : cleaned;
    }
    if (data.matricNumber) data.matricNumber = data.matricNumber.toUpperCase();

    if (data.password !== data.confirmPassword) {
        showFieldError("confirmPassword", "Passwords do not match.");
        return;
    }
    delete data.confirmPassword; 

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            window.location.href = "login.html?registered=true";
            return;
        }

        const error = await response.json().catch(() => ({}));

        if (error.errors) {
            Object.entries(error.errors).forEach(([field, text]) => showFieldError(field, text));
            showMessage("Please correct the highlighted fields.");
            form.querySelector(".invalid")?.focus();
        } else if (response.status === 409) {
            showFieldError("matricNumber", error.message); 
        } else {
            showMessage(error.message || "Sign up failed. Please try again.");
        }
    } catch (error) {
        showMessage("Cannot reach the server. Try again later.");
    }
});