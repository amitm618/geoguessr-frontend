import React, { useState } from "react";

const AuthForm = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = mode === "login" ? "login" : "register";

    const url = `${API_BASE_URL}/${endpoint}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      console.log("✅ Auth Success:", data); // DEBUG
      onAuthSuccess(data.access_token);
    } catch (err) {
      console.error("❌ Auth error:", err);
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
  };

  return (
    <div className="auth-form">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleGoogleLogin} className="google-login-button">
          🌐 Sign in with Google
        </button>
      </div>

      {error && <p className="error-text">❌ {error}</p>}

      <p style={{ marginTop: "1rem" }}>
        {mode === "login" ? "Don't have an account?" : "Already registered?"}{" "}
        <button
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "login" ? "register" : "login"))
          }
        >
          {mode === "login" ? "Register" : "Login"} instead
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
