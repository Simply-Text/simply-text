import "./App.css";
import { FirebaseApp } from "firebase/app";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="company-title">SimplyText</h1>
      </header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
        </Routes>
      </Router>

      <p>text</p>
    </div>
  );
}

export default App;
