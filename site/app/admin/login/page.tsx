"use client";

import { useState } from "react";
import { Input } from "@/components/ui/pixelact-ui/input";
import { Button } from "@/components/ui/pixelact-ui/button";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔒 Hook your validation / auth logic in here
    // validateCredentials({ username, password });

    console.log({ username, password });

    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffffff",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "32px",
          borderRadius: "12px",
          backgroundColor: "#ff42e6ff",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 600 }}>
            Admin Login
          </h1>
          <p style={{ fontSize: "14px", opacity: 0.7 }}>
            Restricted access
          </p>
        </div>

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "8px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#000000ff",
            color: "white",
            fontWeight: 500,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
