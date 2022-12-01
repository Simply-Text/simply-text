import "./styles/Search.css";
import { searchForText } from "../utils/typesense";
import { simpleSearch, searchWithFilters } from "../utils/firebase";
import React, { useRef } from "react";
import { query } from "firebase/firestore";

const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState("");
    const [withFilters, setWithFilters] = React.useState(false);
    const [filters, setFilters] = React.useState({ author: "", date: "" });
    const [filterShown, setFilterShown] = React.useState(null);
    const [doneSearching, setDoneSearching] = React.useState(false);
    const [resultDat, setResultDat] = React.useState({});


    return (
        <>
            <div className="search-region">
                <div className="search-field">
                    <input type="text" className="search-box" onChange={(e) => {
                        setSearchTerm(e.target.value);
                        console.log(searchTerm);
                    }}></input>
                    <button className="search-btn search-box" onClick={() => {
                        const results = searchWithFilters(searchTerm, filters);
                        results.then((e) => {
                            console.log(e);
                            setResultDat({ results: e });
                            setDoneSearching(true);
                        });

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                    <button className="filter-btn search-box" onClick={() => {
                        if (withFilters) {
                            setWithFilters(false);
                        } else {
                            setWithFilters(true);
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                        </svg>
                    </button>
                </div>
                {withFilters ? <div className="search-filters" visibility="hidden">
                    <span className="date-filter">
                        <button onClick={() => {
                            setFilterShown("date");
                        }}>Date</button>
                        {filterShown == "date" ? <input value={filters.date} type="text" onChange={
                            (e) => {
                                setFilters({ date: e.target.value, author: filters.author });
                                console.log(filters);
                            }} /> : null}
                    </span>
                    <span className="author-filter">
                        <button onClick={() => {
                            setFilterShown("author");
                        }}>Author</button>
                        {filterShown == "author" ? <input value={filters.author} type="text" onChange={
                            (e) => {
                                setFilters({ date: filters.date, author: e.target.value });
                                console.log(filters);
                            }} /> : null}
                    </span>
                </div> : null}
                <div className="search-results">
                    <h4>Filters:</h4>
                    {filters.date != null ? <p>Date: {filters.date}</p> : null}
                    {filters.author != null ? <p>Author: {filters.author}</p> : null}
                    <h4>Search Results:</h4>
                    {doneSearching ? <ResultList resultDat={resultDat} /> : null}
                </div>
            </div>
        </>

    )
}

const ResultList = (resultDat) => {
    const cnv = React.useRef(null)
    const [selected, setSelected] = React.useState(false);
    const [result, setResult] = React.useState({});
    const printResults = () => {
        console.log(resultDat.resultDat);


        return (resultDat.resultDat.results.map(r =>
            <div className="Result" key={r.author + r.date} onClick={() => {
                setResult(r);
                setSelected(true);
            }} style={{ backgroundColor: "lightgray", borderColor: "darkgray", border: 1 + "px", padding: 5 + "px" }}>
                <p>Author: {r.author}</p>
                <p>Date: {r.date}</p>
                <p>{r.prev}</p>
            </div>)

        );
    }

    const inspect = () => {
        var ctx = cnv.current.getContext("2d")

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.strokeStyle = "#00FF00";

        var image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
            for (let i = 0; i < result.rects.length; i++) {
                ctx.strokeRect(result.rects[i].left, result.rects[i].top, result.rects[i].width, result.rects[i].height);
            }
        }
        image.src = "data:image/png;base64," + result.image;

        return (
            <>
                <h6>Author: {result.author}</h6>
                <h6>Date: {result.date}</h6>
                <h6>Content:</h6>
                <p>{result.text}</p>
            </>
        );
    }

    return (
        <>
            <div className="scrollable">
                {printResults()}
            </div>
            <div className="ResultInspector">
                <h4>Inspect:</h4>
                {selected ? inspect() : null}
                <canvas ref={cnv} width={360} height={425}></canvas>
            </div>
        </>
    );
}


export default Search;