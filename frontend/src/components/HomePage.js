import CamPreview from "./CamPreview";
import Search from "./Search";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const capture = React.useCallback( () => {
        navigate("/capture");
    },[navigate]);

    const search = React.useCallback( () => {
        navigate("/search");
    }, [navigate]);

    return (
        <>
            <button className="button secondary" onClick={capture}>Capture</button>
            <button className="button secondary" onClick={search}>Search</button>
        </>
    );

};

export default HomePage;