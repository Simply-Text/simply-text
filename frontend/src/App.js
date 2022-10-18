import "./App.css";
import { FirebaseApp } from "firebase/app";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import CamPreview from "./components/CamPreview";
import Search from "./components/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="company-title">SimplyText</h1>
      </header>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/reset" element={<ResetPassword />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
        </Routes>
      </Router>
      <CamPreview />
    </div>
  );
}

export default App;
