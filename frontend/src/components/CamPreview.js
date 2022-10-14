import "./styles/CamPreview.css";
import Webcam from "react-webcam";
import React, {useRef} from "react";

const imageConstraints = {
  aspectRatio: 0.7727,
  facingMode: { ideal: "environment" },
};

const CamPreview = () => {
  const camPreview = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = camPreview.current.getScreenshot();
    setUrl(imageSrc);
  }, [camPreview]);

  const flipCamera = () => {
    imageConstraints.facingMode = { exact: "environment" };
  };

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        ref={camPreview}
        screenshotFormat="image/png"
        imageConstraints={imageConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
      />
      <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => setUrl(null)}>Refresh</button>
      <button onClick={flipCamera}>Flip</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default CamPreview;