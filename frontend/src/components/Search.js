import "./styles/Search.css";
import {searchForText} from "../utils/typesense";
import {simpleSearch,searchWithFilters} from "../utils/firebase";
import React, {useRef} from "react";

function Search() {
    const [searchTerm,setSearchTerm] = React.useState("");
    const [searchResults,setSearchResults] = React.useState("");
    const [withFilters,setWithFilters] = React.useState(false);
    const [filters,setFilters] = React.useState({});
    return (
        <>
        <div className="search-region">
            <div className="search-field">
                <input type="text" className="search-box" onChange={(e) =>{
                    setSearchTerm(e.target.value);
                }}></input>
                <button className="search-btn search-box"  onClick={() => {
                   const results = searchWithFilters(searchTerm,filters);
                   results.then((e) => {
                    var list = "";

                   for(let i = 0; i < e.length; i++){
                    list += `\n\nResult ${i+1}:\n` + e[i]
                   }

                   console.log(list)
                   setSearchResults(list);
                   });
                  
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
                <button className="filter-btn search-box" onClick={() => {
                    if(withFilters){
                        setWithFilters(false);
                    }else {
                        setWithFilters(true);
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                    </svg>
                </button>
            </div>
                {withFilters ? <Filters curFilter={filters} updateFilters={(f) => {setFilters(f); console.log(filters); }}/>  : null}
            <div className="search-results">
                <h4>Filters:</h4>
                {filters.date != null ? <p>Date: {filters.date}</p> : null}
                {filters.author != null ? <p>Author: {filters.author}</p> : null}
                <h4>Search Results:</h4>
                {searchResults}
            </div>
        </div>
        </>
        
    )
}

const Filters = ({updateFilters}, curFilter) => {
    const [filterShown,setFilterShown] = React.useState("none");
    const [filterSet, setFilterSet] = React.useState({
        date: curFilter.date,
        author: curFilter.author
    });


    return (
    <div className="search-filters" visibility="hidden">
    <span className="date-filter">
        <button className="button" onClick={ () => {setFilterShown("date")}}>Date</button>
        {filterShown == "date" ? <input type="text" onChange={
            (e) => {
                filterSet.date = e.target.value == "" ? null : e.target.value;
                updateFilters(filterSet);
            }}/> : null}
    </span>
    <span className="author-filter">
        <button className="button" onClick={() => {setFilterShown("author")}}>Author</button>
        {filterShown == "author" ? <input type="text" onChange={
            (e) => {
                filterSet.author = e.target.value == "" ? null : e.target.value;
                updateFilters(filterSet);
            }} /> : null}
    </span>
</div>
)}


export default Search;