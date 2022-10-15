import "./styles/CamPreview.css";
import Webcam from "react-webcam";
import React, {useRef} from "react";

let frontCamera = false;

const videoConstraints = {
  aspectRatio: 0.7727,
  facingMode: frontCamera ? "user" : "environmnet",
};

const CamPreview = () => {
  const camPreview = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [facingMode, setFacingMode] = React.useState(frontCamera);
  const [isMirrored, setIsMirrored] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = camPreview.current.getScreenshot();
    setUrl(imageSrc);
  }, [camPreview]);

  const flip = React.useCallback(() => {

    frontCamera = !frontCamera;
    setFacingMode(frontCamera);

    setIsMirrored(frontCamera);
  }, []);

  return (
    <>
      <Webcam
        ref={camPreview}
        screenshotFormat="image/png"
        videoConstraints={{...videoConstraints, facingMode}}
        mirrored={isMirrored}
      />
      <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => setUrl(null)}>Refresh</button>
      <button onClick={() => flip()}>Flip</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default CamPreview;