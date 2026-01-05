'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/pixelact-ui/card';
import { Button } from '@/components/ui/button';

interface AudioPlaybackCardProps {
  data: {
    id: number;
    file_path: string;
    mime_type: string;
    created_at: string;
  };
}

export function AudioCard({ data }: AudioPlaybackCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformData, setWaveformData] = useState<Float32Array | null>(null);

  const filename = data.file_path.split('/').pop();
  const src = `/api/admin/extract/stream/${filename}`;

  /* -------------------- Load Audio and Extract Waveform -------------------- */
  useEffect(() => {
    const fetchAndDecode = async () => {
      if (!filename) return;
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);

      // Downsample to canvas width
      const canvasWidth = 400;
      const blockSize = Math.floor(channelData.length / canvasWidth);
      const waveform = new Float32Array(canvasWidth);
      for (let i = 0; i < canvasWidth; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(channelData[i * blockSize + j]);
        }
        waveform[i] = sum / blockSize;
      }
      setWaveformData(waveform);
    };

    fetchAndDecode();
  }, [src, filename]);

  /* -------------------- Draw Static Waveform -------------------- */
  useEffect(() => {
    if (!waveformData) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;

    // Draw entire waveform in gray
    ctx.beginPath();
    waveformData.forEach((amp, i) => {
      const x = i;
      const y = height / 2 - amp * (height / 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [waveformData]);

  /* -------------------- Animate Playback Overlay -------------------- */
  const drawOverlay = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !waveformData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear overlay (keep base waveform)
    ctx.clearRect(0, 0, width, height);

    // Redraw base waveform in gray
    ctx.beginPath();
    waveformData.forEach((amp, i) => {
      const x = i;
      const y = height / 2 - amp * (height / 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw played portion in pink
    const playedPixels = Math.floor(progress * width);
    ctx.beginPath();
    waveformData.slice(0, playedPixels).forEach((amp, i) => {
      const x = i;
      const y = height / 2 - amp * (height / 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#ff4da6';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw vertical playhead
    ctx.beginPath();
    const playheadX = progress * width;
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !waveformData) return;

    const update = () => {
      if (!audio) return;
      const progress = audio.currentTime / audio.duration || 0;
      drawOverlay(progress);
      animationRef.current = requestAnimationFrame(update);
    };

    if (isPlaying) animationRef.current = requestAnimationFrame(update);
    else if (animationRef.current) cancelAnimationFrame(animationRef.current);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, waveformData]);

  /* -------------------- Playback Controls -------------------- */
  const play = async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  /* -------------------- Download -------------------- */
  const download = () => {
    if (!filename) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* -------------------- Render -------------------- */
  return (
    <Card className="border-4 transition-colors duration-300 hover:border-pink-500">
      <CardHeader>
        <CardTitle>Submission #{data.id}</CardTitle>
        <CardDescription>
          {new Date(data.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div
          className={`w-full bg-black border-[4px] shadow-[4px_4px_0_0_#000] ${
            isPlaying ? 'border-pink-500' : 'border-white'
          }`}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={120}
            className="block w-full bg-black"
          />
        </div>

        <audio ref={audioRef} src={src} preload="auto" />

        <div className="flex gap-3">
          <Button size="sm" onClick={play} disabled={isPlaying}>
            Play
          </Button>
          <Button size="sm" onClick={pause} disabled={!isPlaying}>
            Pause
          </Button>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" size="sm" onClick={download}>
          Download Audio
        </Button>
      </CardFooter>
    </Card>
  );
}
