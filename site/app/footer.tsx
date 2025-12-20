"use client"

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/pixelact-ui/alert-dialog";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/pixelact-ui/select";
import { Button } from "@/components/ui/pixelact-ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import AudioRecorder from "@/components/audio-recorder"

export default function Footer() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  type InputMode = "text" | "audio";
  // Variable for voice note or text input
  const [inputMode, setInputMode] = useState<InputMode>("text");

  // Function to handle form submisson
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(false);
    setError(null);



    // grab the API from the submit file
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      const data = await res.json();
      setSent(true);
      return
    }
  }

  return (
    <footer className="bg-black text-white border-t border-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left section */}
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Balloon Tomb
        </div>

        {/* Center section - Links */}
        <div className="flex gap-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Submit</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Dull apps? Shit Trains?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tell us your stories and we might add to a song...
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Select
                value={inputMode}
                onValueChange={(value) => setInputMode(value as InputMode)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose input type"/>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>

              {inputMode === "text" && (
                <textarea
                  className="w-full p-3 text-sm text-white bg-black border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Give us the tea!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              )}

              {inputMode === "audio" && (
                <AudioRecorder/>
              )}

              {/*

              <textarea
                className="w-full p-3 text-sm text-white bg-black border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  // Prints to the browser console 
                  console.log(message);
                }}
                required
              />

              <AudioRecorder/>

              */}

              {error && <p className="error">{error}</p>}

              <AlertDialogFooter>
                <AlertDialogAction asChild>
                  <Button
                    onClick={handleSubmit}
                    disabled={sent}
                    variant="success"
                  >
                    {sent ? 'Sent': 'Submit'}
                  </Button>
                </AlertDialogAction>

              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Right section - Socials */}
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/balloon_tomb/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            Instagram
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            Spotify
          </a>
        </div>
      </div>
    </footer>
  );
}
