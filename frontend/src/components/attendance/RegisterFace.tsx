"use client";
import React, { useRef, useState, useEffect } from 'react';
import { loadModels, getFaceDescriptor, saveDescriptorToStorage } from '@/utils/faceUtils';

const RegisterFace = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [streaming, setStreaming] = useState(false);

    useEffect(() => {
        if (streaming) return;
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setStreaming(true);
            }
        }).catch(err => {
            console.error("Camera error:", err);
            setMessage("Unable to access camera");
        });
    }, [streaming]);

    const handleCapture = async () => {
        if (!name) {
            setMessage("Please enter a name");
            return;
        }

        setMessage('Loading...');
        await loadModels();

        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        context.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = canvas.toDataURL('image/png');
        img.onload = async () => {
            try {
                const descriptor = await getFaceDescriptor(img);
                saveDescriptorToStorage(name, descriptor);
                setMessage(`Face saved for "${name}"`);
            } catch {
                setMessage("No face detected");
            }
        };
    };

    return (
        <div className="p-4  rounded flex flex-col justify-center items-center">
            <input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 mr-2"
            />
            <div className="my-2">
                <video ref={videoRef} width="500" height="300" autoPlay muted className='rounded-md'/>
                <canvas ref={canvasRef} width="300" height="200" className="hidden" />
            </div>
            <button
                onClick={handleCapture}
                className="bg-primary cursor-pointer text-white px-3 py-1 rounded"
            >
                Capture & Register
            </button>
            <div className="mt-2">{message}</div>
        </div>
    );
};

export default RegisterFace;
