// Filename: PictureButtons.tsx
import React from "react";
import CameraIcon from "../../Svg/CameraIcon";
import DownloadIcon from "../../Svg/DownloadIcon";

interface PictureButtonsProps {
  onComplete: () => void;
  setCapturedImage: (image: string) => void;

}
const PictureButtons: React.FC<PictureButtonsProps> = ({
  onComplete,
  setCapturedImage,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
 
      };
      reader.readAsDataURL(file);
    }
  };

  const openImageSelector = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <span className="Content_container_label">Choisissez votre image</span>
      <button
        className="Content_Button_Picture Content_Take_Picture"
        onClick={() => onComplete()}
      >
        <CameraIcon />
        <span>Prendre une photo</span>
      </button>
      <button
        className="Content_Button_Picture Content_Import_Picture"
        onClick={openImageSelector}
      >
        <DownloadIcon />
        <span>Telecharger ta photo</span>
      </button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </>
  );
};

export default PictureButtons;
