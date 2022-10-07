import "./CamPreview.css";
import Webcam from "react-webcam";

const imageConstraints = {
  width: 180,
  height: 320,
  facingMode: { exact: "environment" },
};

// Will add screenshot functionality and look into appropriate resolution
export default function CamPreview() {
  return (
    <div className="CamPreview">
      <Webcam videoConstraints={imageConstraints} mirrored="true" />
    </div>
  );
}
