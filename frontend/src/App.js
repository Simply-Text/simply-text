import "./App.css";
import UserInfo from "./components/UserInfo";
import AuthProvider from "./components/AuthProvider";
import MainContent from "./MainContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import Register from "./components/Register";

function App() {
  return (
    <div className="App text-center">
      <header className="App-header">
        <h1 className="company-title">SimplyText</h1>
      </header>

      <Router basename={process.env.PUBLIC_URL}>
        <UserInfo />
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/reset" element={<ResetPassword />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
        <MainContent />
      </Router>
    </div>
  );
}

export default App;
