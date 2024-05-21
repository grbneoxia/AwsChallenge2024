import React from "react";
import PictureButtons from "./PictureButton";
import CameraCapture from "./CameraCapture";
import CameraPreview from "./CameraPreview";

const Camera = () => {
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  return (
    <>
      {capturedImage ? (
        <CameraPreview
          onComplete={function (): void {}}
          capturedImage={capturedImage || ""}
          isResultsMode={false}
          retry={() => setCapturedImage(null)}
        />
      ) : (
        <CameraCapture setCapturedImage={setCapturedImage} />
      )}
    </>
  );
};

export default Camera;
