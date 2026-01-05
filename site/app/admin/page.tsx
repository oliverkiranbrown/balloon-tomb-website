// Placeholder admin dashboard
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextCard } from "@/components/admin/text_card";
import { Spinner } from "@/components/ui/spinner";
import { AudioCard } from "@/components/admin/audio_card";

// Structure of the text object returned by the db
interface TextDataObject {
  id: number,
  message: string,
  created_at: string
}
// Structure of the audio metadata returned by db
interface AudioMetadataObject {
  id: number,
  file_path: string,
  mime_type: string,
  created_at: string
}

export default function AdminDashboard() {
  const [textData, setTextData] = useState<TextDataObject[]>([])
  const [loadingText, setLoadingText] = useState(false);
  const [audioMetadata, setAudioMetadata] = useState<AudioMetadataObject[]>([]);
  const [loadingAudioMetadata, setLoadingAudioMetadata] = useState(false);

  /* ---------------- Functions to handle text ---------------------- */
  async function grabText() {
    setLoadingText(true);
    try {
      const result = await fetch('api/admin/extract/text', { method: 'GET' });

      if (result.ok) {
        const data = await result.json();
        setTextData(data.payload || []);
      } 
    } finally {
        setLoadingText(false);
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add UI to say copied
  }

  /* ---------------- Functions to handle audio ---------------------- */
  async function grabAudioMetadata() {
    setLoadingAudioMetadata(true);
    try {
      const result = await fetch('api/admin/extract/audio', { method: 'GET' });

      if (result.ok) {
        const data = await result.json();
        setAudioMetadata(data.payload || [])
      }
    } finally {
      setLoadingAudioMetadata(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-2 bg-white">
      <div>
        <header className="text-3xl font-extrabold py-4">
          Admin Dashboard
        </header>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex-col gap-4">
          <h2 className="text-xl font-extrabold py-4">Text Submissions</h2>
          
          {/* ----------- Text Loaded vs Unloaded --------------*/}
          {textData.length > 0 ? (
            <div className="w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-4">
                {textData.map((item) => (
                  <TextCard
                    key={item.id}
                    data={item}
                    onCopy={handleCopy}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl mx-auto text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No submissions yet
              </h3>
              <p className="text-gray-500 mb-6">
                Click to load text submissions
              </p>
              <Button onClick={grabText}>
                Load Submissions
              </Button>
            </div>
          )}
        </div>
        <div className="flex-col gap-4">
          <h2 className="text-xl font-extrabold py-4">Audio Submissions</h2>

          {/* ----------- Audio Loaded vs Unloaded --------------*/}
          {audioMetadata.length > 0 ? (
            <div className="w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-4">
                {audioMetadata.map((item) => (
                  <AudioCard
                    key={item.id}
                    data={item}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl mx-auto text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No submissions yet
              </h3>
              <p className="text-gray-500 mb-6">
                Click to load audio submissions
              </p>
              <Button onClick={grabAudioMetadata}>
                Load Submissions
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  ); 
}