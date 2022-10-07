import "./styles/CamPreview.css";
import Webcam from "react-webcam";

const imageConstraints = {
  aspectRatio: 0.7727,
  facingMode: { ideal: "environment" },
};

// Will add screenshot functionality and look into appropriate resolution
export default function CamPreview() {
  return (
    <div className="CamPreview">
      <Webcam width={360} videoConstraints={imageConstraints}/>
    </div>
  );
}
