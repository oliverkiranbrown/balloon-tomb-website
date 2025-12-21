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
import AudioRecorder from "@/components/audio-recorder"

export default function Footer() {
  const [textData, setTextData] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
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

    // Choose which API call is relevant
    if (inputMode === "text") {

      // Grab API call for text submission
      const res = await fetch('/api/text_submit', {
        method: 'POST',
        // payload is simple string
        body: JSON.stringify({ textData }),
      });

      // If fine, send - does this need custom handling?
      if (res.ok) {
        const data = await res.json();
        setSent(true);
        return;
      }

    } else {

      // Create payload for audio file
      const formData = new FormData();
      formData.append("audio", audioBlob!); 
      formData.append("url", audioURL || ""); 

      // Grab API call for audio submission
      const res = await fetch('/api/audio_submit', {
        method: 'POST',
        body: formData
      });

      // If fine, send - does this need custom handling?
      if (res.ok) {
        const data = await res.json();
        setSent(true);
        return;
      } 
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
                  className="w-full h-45 p-3 text-sm text-white bg-black border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Give us the tea!"
                  value={textData}
                  onChange={(e) => setTextData(e.target.value)}
                />
              )}

              {inputMode === "audio" && (
                <AudioRecorder
                  onAudioChange={
                    (blob, url) => {
                      setAudioBlob(blob),
                      setAudioURL(url)
                    }
                  }
                />
              )}

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
