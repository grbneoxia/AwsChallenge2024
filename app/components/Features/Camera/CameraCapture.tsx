
import React, { useRef, useState } from "react";

interface CameraCaptureProps {
  setCapturedImage: (image: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ setCapturedImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erreur lors de l'accès à la caméra:", err);
      setError("Erreur lors de l'accès à la caméra");
    }
  };

  React.useEffect(() => {
    startCamera();
  }, []);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const image = canvas.toDataURL("image/png");
        setCapturedImage(image);
 
        // const tracks = video.srcObject?.getTracks();
        // tracks?.forEach((track) => track.stop()); // Stop the camera after capture
      }
    }
  };

  return (
    <div className="relative max-w3xl">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="absolute pointer-events-all cursor-pointer z-50" onClick={captureImage}>
        <span>CAPTURE</span>
      </button>
      <video
        className="CameraCapture_Preview"
        ref={videoRef}
        autoPlay
        playsInline
        width="100%"
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default CameraCapture;
