import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/pixelact-ui/button";
import { blob } from "stream/consumers";

// Expose the interial variables to the UI component
interface AudioRecorderProps {
    // Define the arguments of the function
    onAudioChange?: (blob: Blob | null, url: string | null) => void; 
}

export default function AudioRecorder(
    { onAudioChange }: AudioRecorderProps
) {
    // Create a reference to media recorder and instantate with null
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    // Create a place to store data and instantate with empty list
    const chunksRef = useRef<Blob[]>([]);
    // State for the audioBlob
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    // URL for audio playback
    const [audioURL, setAudioURL] = useState<string | null>(null);
    // Create a convas to display waveform
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // Create a reference for the animation
    const animationRef = useRef<number | null>(null);

    // Set a state for recording (start as false)
    const [isRecording, setIsRecording] = useState(false);

    // See docs here: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
    const startRecording = async () => {

        // Use the navigator to access user devices and returns a media stream object
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        /* --------------- MedaRecorder -----------------*/ 
        // Use the stream to create a media recorder object.
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm"
        });

        // Listens out and adds chunks to recording when required.
        mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) {
                chunksRef.current.push(event.data);
            }
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;

        /* --------------- Visualise Waveform! -----------------*/ 
        // APi avalible here: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
        const audioContext = new AudioContext();
        // Use the defined stream and send it to the audioContext
        const source = audioContext.createMediaStreamSource(stream);
        // Super cool tool to access audio properties
        const analyser = audioContext.createAnalyser();
        // Window size when performing Fast-Fourier Transform!
        analyser.fftSize = 2048;
        source.connect(analyser);

        // How far should we visualise? 
        const bufferLength = analyser.fftSize;
        // Create an empty vector for volume
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);
            
            const canvasCtx = canvas.getContext("2d");
            if (!canvasCtx) return;

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            canvasCtx.strokeStyle = isRecording ? "#ff4da6" : "#ffffffff";
            canvasCtx.lineWidth = 2;

            // Maybe try switch the colour to white?
            
            canvasCtx.beginPath();

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i=0; i < bufferLength; i++) {
                // normalise the volume at this position
                const v = dataArray[i] / 128.0;
                // Set the height to draw to
                const y = (v * canvas.height) / 2;
                
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };

        
        draw();
        setIsRecording(true);
    }

    // Handle recording stopping
    const stopRecording = async () => {
        // Acccess the mediaRecorder object from Ref and stop
        mediaRecorderRef.current?.stop();
        setIsRecording(false);

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        // Define a function for when recording stopped.
        mediaRecorderRef.current!.onstop = () => {
            
            const audioBlob = new Blob(chunksRef.current, {
                type: "audio/webm",
            });
            const url = URL.createObjectURL(audioBlob);
            
            // Store the blob value/url in state
            setAudioBlob(audioBlob);
            setAudioURL(url);

            // Notify parent
            if (onAudioChange) {
                onAudioChange(audioBlob, url);
            }

            // Clean out the start chunks
            chunksRef.current = [];
            
        };
    };

    function drawSilence(
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#ffffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.5);
        ctx.lineTo(canvas.width, canvas.height * 0.5);
        ctx.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        drawSilence(ctx, canvas);
    }, []);

    // Create a url for each audio state and replace when used. 
    useEffect(() => {
        if (!audioBlob) return;

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [audioBlob]) 

    return (
        <div className="flex w-full flex-col items-center gap-10">
            {/* Pixel-art frame */}
            <div
                className={`
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    bg-black
                    border-[4px]
                    shadow-[4px_4px_0_0_#000]
                    ${isRecording ? "border-pink-500" : "border-white"}
                `}
            >
            <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="block w-full bg-black"
            />
            </div>

            <div className="flex gap-20 place-content-center">
            <Button
                onClick={startRecording}
                disabled={isRecording}
            >
                Record
            </Button>

            <Button
                onClick={stopRecording}
                disabled={!isRecording}
            >
                Stop
            </Button>
            </div>

            {audioURL && (
            <audio
                controls
                src={audioURL}
                className="mt-4"
            />
            )}
        </div>
    );

}