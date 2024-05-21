// Filename: PictureButtons.tsx
import React from "react";
import CameraIcon from "../../Svg/CameraIcon";
import DownloadIcon from "../../Svg/DownloadIcon";

const Overlay: React.FC = ({}) => {

  return (
    <>
      <svg
        className="overlay"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className="overlay__path"
   
          vector-effect="non-scaling-stroke"
          d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
        />
      </svg>
    </>
  );
};

export default Overlay;
