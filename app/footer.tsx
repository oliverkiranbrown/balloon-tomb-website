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
import { Button } from "@/components/ui/pixelact-ui/button";
import { DialogClose } from "@radix-ui/react-dialog";


export default function Footer() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;

    // TODO: send message to API
    console.log("Submitted message:", message);

    setMessage(message);
  };

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

              <textarea
                className="w-full min-h-[120px] p-3 text-sm text-white bg-black border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  /* Prints to the browser console */
                  console.log(message);
                } }
              />

              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button
                    variant="destructive"
                  >
                    Cancel
                  </Button>
                </AlertDialogCancel>

                <AlertDialogAction asChild>
                  <Button
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    variant="success"
                  >
                    Submit
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
