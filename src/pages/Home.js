import React from "react"
import data from "../data/data.json"

export default function Home() {
    return (
      <>
        <h1>Home</h1>
        <p>{data[0].useType}</p>
      </>
    );
}