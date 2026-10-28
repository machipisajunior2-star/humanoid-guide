import React from "react"
import { useParams } from "react-router-dom"

export default function Product() {
    let { productSlag } = useParams();
    return (
      <>
        <h1>Product</h1>
        <p>{productSlag}</p>
      </>
    );
}