import "./styles/CamPreview.css";
import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
import { addPage } from "../utils/firebase"
import { getFunctions, httpsCallable } from "firebase/functions";
import { createWorker } from "tesseract.js";

const FACING_MODE_USER = { exact: "user" };
const FACING_MODE_ENVIRONMENT = { exact: "environment" };

const functions = getFunctions(undefined, 'northamerica-northeast1');
const cloudVisionCall = httpsCallable(functions, 'callCloudVision');

const videoConstraints = {
  facingMode: FACING_MODE_ENVIRONMENT,
};

const callGoogleVisionApi = async (base64) => {
  let googleVisionRes = await cloudVisionCall({ image: base64 });
  const result = googleVisionRes;
  return result.data
}

const CamPreview = () => {
  const camPreview = useRef(null);
  const canvasRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [base64, setBase64] = React.useState(null);
  const [extractedText, setExtractedText] = React.useState("No Extracted Text");
  const [tessText, setTessText] = React.useState("No Extracted Text")
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

  //tesseract

  const runTesseract = async (base64, rectangle) => {
    base64 = "data:image/png;base64," + base64;
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(base64, rectangle);
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
        console.log(base64);
        const result = await callGoogleVisionApi(base64);
        const visionText = result.response.responses[0].fullTextAnnotation.text;

        //Tesseract

        console.log(result);

        //find all rectangles
        var rects = [];
        var tessResult = "";
        const rawResults = result.response.responses[0].fullTextAnnotation.pages[0].blocks;

        for (let i = 0; i < rawResults.length; i++) {
          const vertices = rawResults[i].boundingBox.vertices;
          const xMin = Math.min(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
          const xMax = Math.max(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
          const yMin = Math.min(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);
          const yMax = Math.max(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);
          const w = xMax - xMin;
          const h = yMax - yMin;

          const rect = { rectangle: { top: yMin, left: xMin, width: w, height: h } };
          tessResult += " | " + await runTesseract(base64, rect);

          rects.push(rect);
        }


        setExtractedText(visionText);
        setTessText(tessResult);




        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        

        context.strokeStyle = "#00FF00";
        var image = new Image();
        image.onload = () => {


          context.drawImage(image, 0, 0);

          //find lines
          //turn to black and white for line detection
          var width = image.width;
          var height = image.height;
          var imgPixels = context.getImageData(0, 0, width, height);

          for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
              var i = (y * 4) * width + x * 4;

              var total = ((imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) > 415) ? 255 : 0;

              imgPixels.data[i] = total;
              imgPixels.data[i + 1] = total;
              imgPixels.data[i + 2] = total;
            }
          }

          context.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

          //TODO: add line detection

          //draw rectangles
          for (let i = 0; i < rects.length; i++) {
            console.log(i);
            console.log(rects);
            context.strokeRect(rects[i].rectangle.left, rects[i].rectangle.top, rects[i].rectangle.width, rects[i].rectangle.height);
          }

          

        }
        image.src = "data:image/png;base64," + base64;
        await addPage("user", visionText);
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

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        ref={camPreview}
        screenshotFormat="image/png"
        width={360}
        videoConstraints={{ ...videoConstraints, facingMode }}
        onUserMedia={onUserMedia}
        mirrored={false}
        screenshotQuality={0.7}
      />
      <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => setUrl(null)}>Refresh</button>
      <button onClick={flip}>Flip</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
      <p>{extractedText}</p>
      <p>{tessText}</p>
      <canvas ref={canvasRef} width={360} height={360}></canvas>
    </>
  );
};

export default CamPreview;