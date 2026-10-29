import React from "react"
import "../styling/home.css"
import data from "../data/data.json"


export default function Home() {
    return (
      <div id="con">
        <h1>Home</h1>
        <p>{data[0].useType}</p>
        <div id="youtube-player"></div>
      </div>
    );
}