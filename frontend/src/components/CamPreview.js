import "./styles/CamPreview.css";
import Webcam from "react-webcam";
import React, {useRef} from "react";

const FACING_MODE_USER = { ideal: "user" };
const FACING_MODE_ENVIRONMENT = { ideal: "environment" };

const videoConstraints = {
  aspectRatio: 0.7727,
  facingMode: FACING_MODE_ENVIRONMENT,
};

const CamPreview = () => {
  const camPreview = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);
  const [isMirrored, setIsMirrored] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = camPreview.current.getScreenshot();
    setUrl(imageSrc);
  }, [camPreview]);

  const flip = React.useCallback(() => {

    setFacingMode(
      prevState =>
      prevState === FACING_MODE_USER
      ? FACING_MODE_ENVIRONMENT
      : FACING_MODE_USER
    );

    facingMode === FACING_MODE_ENVIRONMENT ? setIsMirrored(false) : setIsMirrored(true);
      
  }, [facingMode]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        ref={camPreview}
        screenshotFormat="image/png"
        videoConstraints={{...videoConstraints, facingMode}}
        onUserMedia={onUserMedia}
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