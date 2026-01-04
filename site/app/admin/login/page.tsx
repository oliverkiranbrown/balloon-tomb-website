"use client";

import { useState } from "react";
import { Input } from "@/components/ui/pixelact-ui/input";
import { Button } from "@/components/ui/pixelact-ui/button";
import { 
AlertDialog, 
AlertDialogTrigger, 
AlertDialogContent, 
AlertDialogHeader, 
AlertDialogFooter, 
AlertDialogTitle, 
AlertDialogDescription,
AlertDialogAction,
} from "@/components/ui/pixelact-ui/alert-dialog";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check for validity of user (sets cookie if correct)
      const result = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (result.ok) {
        const data = await result.json();
        console.log('Authentication successful', data)

        window.location.href = '/admin';

      } else {
        const error = await result.json();
        console.error('Auth Failed: ', error.error);
        setIsError(true);
        // Show user in UI
      }
    } catch (err) {
      console.error('Network Error', err);
      setIsError(true);
      // Handle in UI
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the user inputs their details incorrectly, reset
  const handleError = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setUsername('');
    setPassword('');
  }

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

        <div className="flex justify-center">
          {isError === false && (
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={{
                backgroundColor: "#000000ff",
                color: "white",
                fontWeight: 500,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          )}
          
          {isError === true && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="warning">Error</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Authentication Failure</AlertDialogTitle>
                  <AlertDialogDescription>
                    The username or password seems to be incorrect. 
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction asChild>
                    <Button 
                      variant="warning" 
                      onClick={handleError}
                    >
                      Try Again
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

        </div>
      </form>
    </div>
  );
}