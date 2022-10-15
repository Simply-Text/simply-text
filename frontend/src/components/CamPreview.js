import "./styles/CamPreview.css";
import Webcam from "react-webcam";
import React, {useRef} from "react";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  aspectRatio: 0.7727,
  facingMode: {exact: FACING_MODE_ENVIRONMENT},
};

const CamPreview = () => {
  const camPreview = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

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
  }, []);

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
        mirrored={true}
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