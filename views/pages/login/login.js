// login.js – frontend JS

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.textContent = "Please enter both fields.";
    message.className = "error";
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/../dashboard/dashboard.html"; // redirect after login
    } else {
      message.textContent = data.message;
      message.className = "error";
    }
  } catch (error) {
    message.textContent = "Server error.";
    message.className = "error";
  }
});
