import React from "react"
import { useLocation } from "react-router-dom";

export default function Search() {
      const location = useLocation();
      const params = new URLSearchParams(location.search);
      const query = params.get("q");
    return (
      <>
        <h1>Search Here</h1>
        <p>Query: {query}</p>
      </>
    );
}