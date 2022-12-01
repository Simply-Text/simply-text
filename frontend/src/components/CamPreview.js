import "./styles/CamPreview.css";
import "./styles/Main.css";
import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { createWorker } from "tesseract.js";
import { useNavigate } from "react-router-dom";
import TextHandler from "./ExtractedTextHandler";

const FACING_MODE_USER = { exact: "user" };
const FACING_MODE_ENVIRONMENT = { exact: "environment" };

const functions = getFunctions(undefined, 'northamerica-northeast1');
const cloudVisionCall = httpsCallable(functions, 'callCloudVision');

const videoConstraints = {
  facingMode: FACING_MODE_ENVIRONMENT,
  width: 360, 
  height: 465,
};

const callGoogleVisionApi = async (base64) => {
  let googleVisionRes = await cloudVisionCall({ image: base64 });
  const result = googleVisionRes;
  return result.data
}

const webcamComponent = (camPreview, onUserMedia, facingMode) => {
  return (
    <Webcam
        className="webcam-component"
        ref={camPreview}
        screenshotFormat="image/png"
        videoConstraints={{ ...videoConstraints, facingMode }}
        onUserMedia={onUserMedia}
        mirrored={false}
        screenshotQuality={0.7}
      ></Webcam>
  );
};

const CamPreview = () => {
  const camPreview = useRef(null);
  const canvasRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [base64, setBase64] = React.useState(null);
  const [visionText, setVisionText] = React.useState(null);
  const [visionResult, setVisionResult] = React.useState(undefined);
  const [tessText, setTessText] = React.useState(null)
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);
  const [wordDat,setWordDat] = React.useState([]);
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

        try {
          const result = await callGoogleVisionApi(base64);
          const visionText = result.response.responses[0].fullTextAnnotation.text;
          setVisionResult(result.response.responses[0]);
          console.log(result)

        //find all rectangles
        var rects = [];
        var tessResult = "";
        const rawResults = result.response.responses[0].textAnnotations;

        var fullText = rawResults[0].description;

        var content = [{ words: [] }]; //send to firebase
        var curPar = 0;
        //build results
        for (let i = 1; i < rawResults.length; i++) {
          const vertices = rawResults[i].boundingPoly.vertices;
          const xMin = Math.min(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
          const xMax = Math.max(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
          const yMin = Math.min(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);
          const yMax = Math.max(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);
          const w = xMax - xMin;
          const h = yMax - yMin;

          const word = { text: rawResults[i].description, rectangle: { top: yMin - 3, left: xMin - 3, width: w + 6, height: h + 6 } };
          //tessResult += " | " + await runTesseract(base64, rect);

          rects.push(word.rectangle);

          //add word to content
          
          var wordPos = fullText.search(word.text);
          var linePos = fullText.search("\n");
 
          if(wordPos < linePos){ //word comes before line break
            content[curPar].words.push(word);
            fullText = fullText.substring(wordPos+1);
          } else {
            curPar++;
            content.push({ words: [] })
            content[curPar].words.push(word);
            fullText = fullText.substring(linePos+1);
          }



        }

        
        setWordDat(content);
        console.log(content);
        console.log(wordDat);
        setVisionText(visionText);
        setTessText(tessResult);




          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          
          context.fillStyle = "#FFFFFF";
          context.fillRect(0,0,canvas.width,canvas.height);
          context.strokeStyle = "#00FF00";
          var image = new Image();
          image.onload = () => {


            context.drawImage(image, 0, 0);
            
            //find lines
            //turn to black and white for line detection
            var width = image.width;
            var height = image.height;
            var imgPixels = context.getImageData(0, 0, width, height);

            // for (var y = 0; y < height; y++) {
            //   for (var x = 0; x < width; x++) {
            //     var i = (y * 4) * width + x * 4;

            //     var total = ((imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) > 500) ? 255 : 0;

            //     imgPixels.data[i] = total;
            //     imgPixels.data[i + 1] = total;
            //     imgPixels.data[i + 2] = total;
            //   }
            // }

            context.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

            //TODO: add line detection
            
            //draw rectangles
            for (let i = 0; i < rects.length; i++) {
              context.strokeRect(rects[i].left, rects[i].top, rects[i].width, rects[i].height);
            }
            console.log("done");

            

          }
          image.src = "data:image/png;base64," + base64;

        } catch(e) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          
          context.fillStyle = "#FFFFFF";
          context.fillRect(0,0,canvas.width,canvas.height);
          context.strokeStyle = "#00FF00";
          var imageNoData = new Image();
          imageNoData.onload = () => {
            context.drawImage(imageNoData, 0, 0);

            var width = imageNoData.width;
            var height = imageNoData.height;
            var imgPixels = context.getImageData(0, 0, width, height);
            context.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

          }
          imageNoData.src = "data:image/png;base64," + base64;
          setTessText(null);
          setVisionText(null);
        }
      }
    }

    fetchResult();
  }, [base64]);

  const getTextHandler = React.useCallback(() => {
    return <TextHandler fullText={visionText} image={base64} vResult={visionResult} tResult={tessText} wordData={wordDat}/>
  }, [visionText, visionResult, base64, tessText]);

  const flip = React.useCallback(() => {

    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );

  }, []);

  const clearScreen = React.useCallback(() => {
    setVisionResult(null);
    setVisionText(null);
    setTessText(null);
    setUrl(null);
  }, []);

  const onUserMedia = (e) => {
    console.log(e);
  }

  return (
    <>
      <div id="webcam">
      {webcamComponent(camPreview, onUserMedia(), facingMode)}
      </div>
      <div className="button-group">
        <button className="button secondary" onClick={() => clearScreen()}>Clear</button>
        <button className="button" onClick={capturePhoto}>Capture</button>
        <button className="button secondary" onClick={flip}>Flip</button>
      </div>
      {url && (
        <div id="outside-wrap">
          <div id="image-container">
            <canvas ref={canvasRef} id="input-overlay" width={360} height={425}></canvas>
          </div>
        </div>
      )}
      <div>
        {getTextHandler()}
      </div>
    </>
  );
};

export default CamPreview;