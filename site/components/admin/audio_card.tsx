'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/pixelact-ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';

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

  // Refs to store Web Audio nodes / context to avoid multiple creation
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const filename = data.file_path.split('/').pop();
  const src = `/api/admin/extract/stream/${filename}`;

  /* -------------------- Playback Controls -------------------- */
  const play = async () => {
    if (!audioRef.current) return;

    // Resume suspended context (needed on Safari / mobile)
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

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

  /* -------------------- Waveform Visualisation -------------------- */
  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create AudioContext + analyser + source ONCE
    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = isPlaying ? '#ff4da6' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();

    // Stop animation when audio ends
    audio.onended = () => {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // empty array → runs once

  /* -------------------- UI -------------------- */
  return (
    <Card className="border-4 transition-colors duration-300 hover:border-pink-500">
      <CardHeader>
        <CardTitle>Submission #{data.id}</CardTitle>
        <CardDescription>
          {new Date(data.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pixel-art waveform frame */}
        <div
          className={`
            w-full
            bg-black
            border-[4px]
            shadow-[4px_4px_0_0_#000]
            ${isPlaying ? 'border-pink-500' : 'border-white'}
          `}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={120}
            className="block w-full bg-black"
          />
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={src} preload="auto" />

        {/* Playback controls */}
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
