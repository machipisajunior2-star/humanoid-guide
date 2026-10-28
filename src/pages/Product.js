import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product/productActions";

export default function Product() {
    let { productSlag } = useParams();
    const dispatch = useDispatch()
    const data = useSelector((state) => state);
        useEffect(() => {
          dispatch(fetchProduct(productSlag));
        }, [dispatch, productSlag]);
    return (
      <>
        <h1>Product</h1>
        <p>{data.product.name}</p>
      </>
    );
}