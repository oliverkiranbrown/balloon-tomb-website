// Placeholder admin dashboard
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextCard } from "@/components/admin/text_card";
import { Spinner } from "@/components/ui/spinner";

interface TextDataObject {
  // Structure of the text object returned by the db
  id: number,
  message: string,
  created_at: string
}

export default function AdminDashboard() {
  const [textData, setTextData] = useState<TextDataObject[]>([])
  const [loading, setLoading] = useState(false);

  async function grabText() {
    setLoading(true);
    try {
      const result = await fetch('api/admin/extract/text', { method: 'GET' });

      if (result.ok) {
        const data = await result.json();
        setTextData(data.payload || []);
      } 
    } finally {
        setLoading(false);
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add UI to say copied
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-white">
      <div>
        <header className="text-lg font-bold text-black-600 mb-2 text-lg font-bold text-black-600 mb-2 text-center w-full max-w-4xl">Admin Dashboard</header>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex-col gap-4">
          <h2>Text Submissions</h2>
          
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
        <div>
          <h2>Audio Submissions</h2>
          <div className="flex-col gap-4">
            <text>ghjk</text>
          </div>
        </div>
      </div>
    </div>
  ); 
}