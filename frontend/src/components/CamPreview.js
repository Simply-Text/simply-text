import "./styles/CamPreview.css";
import Webcam from "react-webcam";
import React, {useEffect, useRef} from "react";
import {addPage} from "../utils/firebase"
import { getFunctions, httpsCallable } from "firebase/functions";
import { createWorker } from "tesseract.js";
import Search from "./Search";

const FACING_MODE_USER = { exact: "user" };
const FACING_MODE_ENVIRONMENT = { exact: "environment" };

const functions = getFunctions(undefined, 'northamerica-northeast1');
const cloudVisionCall = httpsCallable(functions, 'callCloudVision');

const videoConstraints = {
  facingMode: FACING_MODE_ENVIRONMENT,
  height: 465,
  width: 360
};

const callGoogleVisionApi = async (base64) => {
  let googleVisionRes = await cloudVisionCall({ image: base64 });
  const result = googleVisionRes;
  return result.data.response.responses[0];
}

const manageResult = async(result) => {

  //Update canvas/overlay?

  return(result.fullTextAnnotation.text);
}

const CamPreview = () => {
  const camPreview = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [base64, setBase64] = React.useState(null);
  const [visionText, setVisionText] = React.useState("No Extracted Text");
  const [visionResult, setVisionResult] = React.useState(undefined);
  const [tessText, setTessText] = React.useState("No Extracted Text")
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

  //tesseract
  const worker = createWorker();
  const runTesseract = async (base64) => {
    base64 = "data:image/png;base64," + base64;
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(base64);
    await worker.terminate();
    return text;
  }

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = camPreview.current;
    setUrl(imageSrc.getScreenshot());
    setBase64(imageSrc.getScreenshot().split(',')[1]);
  }, [camPreview]);

  useEffect(() => {
    async function fetchResult() {
      if (base64) {
        const result = await callGoogleVisionApi(base64);
        const tessResult = await runTesseract(base64);
        setVisionResult(result);
        setVisionText(await manageResult(result));
        setTessText(tessResult);

        await addPage("user", result);
      }
    }

    fetchResult();
  }, [base64]);

  const flip = React.useCallback(() => {

    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );

  }, []);

  const clearScreen = React.useCallback(() => {
    setVisionResult("No Extracted Text");
    setTessText("No Extracted Text");
    setUrl(null);
  }, []);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <div id="webcam">
        <Webcam
          className="webcam-component"
          ref={camPreview}
          screenshotFormat="image/png"
          videoConstraints={{ ...videoConstraints, facingMode }}
          onUserMedia={onUserMedia}
          mirrored={false}
          screenshotQuality={0.7}
        />
      </div>
      <div className="button-group">
        <button className="button secondary" onClick={() => clearScreen()}>Clear</button>
        <button className="button" onClick={capturePhoto}>Capture</button>
        <button className="button secondary" onClick={flip}>Flip</button>
      </div>
      {url && (
        <div id="outside-wrap">
          <div id="image-container">
            <img id="image" src={url} alt="Screenshot" />
          </div>
        </div>
      )}
      <div id="extractedText">
        <p>{visionText}</p>
        <p>{tessText}</p>
      </div>
    </>
  );
};

export default CamPreview;