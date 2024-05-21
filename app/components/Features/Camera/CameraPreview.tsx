// Filename: PictureButtons.tsx
import React from "react";
import CameraIcon from "../../Svg/CameraIcon";
import DownloadIcon from "../../Svg/DownloadIcon";

interface CameraPreviewProps {
  onComplete: () => void;
  retry: () => void;
  capturedImage: string;
  isResultsMode: boolean;
}
const CameraPreview: React.FC<CameraPreviewProps> = ({
  onComplete,
  retry,
  capturedImage,
  isResultsMode,
}) => {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = "captured_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <img
        className="CameraPreview_Picture"
        src={capturedImage}
        alt="captured picture"
      ></img>
      <div className="CameraPreview_Choice">
        <button className="RetryButton pointer-events-all cursor-pointer z-90" onClick={() => retry()}>
          <span>Reessayer</span>
        </button>
        {isResultsMode ? (
          <button
            onClick={() => {
              downloadImage();
              onComplete();
            }}
          />
        ) : (
          <button
            onClick={() => {
              onComplete();
            }}
          />
        )}
      </div>
    </>
  );
};

export default CameraPreview;
