import React from "react"
import { useParams } from "react-router-dom";

export default function Category() {
    let { useType } = useParams();
    return (
      <>
        <h1>Category</h1>
        <p>{useType}</p>
      </>
    );
}