/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product/productActions";
import humanoids from "../data/data.json";
import Videos from "../components/Videos";
import EmblaCarousel from "../components/embla/EmblaCarousel";
import { colorPicker } from "../utils";
import "../styling/embla.css";
import "../styling/product.css";

export default function Product() {
  let navigate = useNavigate();
  let { productSlag } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.product);
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const humanoidImagesData = humanoids.filter(
    (humanoid) => humanoid.slag === productSlag,
  );
  console.log(data);

  const OPTIONS = { axis: "y" };
  const SLIDES = humanoidImagesData[0].image;
  const currentDateObj = new Date(data.announcedAt);
  const year = currentDateObj.getFullYear();
  useEffect(() => {
    dispatch(fetchProduct(productSlag));
  }, [dispatch, productSlag]);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return !data || Object.keys(data).length === 0 ? (
    <h2>Loading...</h2>
  ) : data.error ? (
    <h2>{data.error}</h2>
  ) : (
    <main className="product_wrapper">
      <section className="product_details_section">
        <header>
          <h1
            className="product_name"
            style={{ color: colorPicker(data.userType.toLowerCase()) }}
          >
            {humanoidImagesData[0].name}
          </h1>
        </header>
        <div className="product_details_container">
          <EmblaCarousel
            slides={SLIDES}
            options={OPTIONS}
            color={colorPicker(data.userType.toLowerCase())}
          />
          <div className="product_details">
            <p>{data.description}</p>
            <div className="deatils_container">
              <small>CREATOR</small>
              <a
                className="manufacturer_link"
                href={data.websiteUrl}
                alt={data.manufacturer.name}
              >
                {data.manufacturer.name}
                <span>&#8599;</span>
              </a>
            </div>
            <div className="deatils_container">
              <small>YEAR</small>
              <p>{year}</p>
            </div>
            <div className="deatils_container">
              <small>Country</small>
              <p>
                {regionNames.of(data.designCountryCode)}{" "}
                {data.designCountryCode}
              </p>
            </div>
            <div className="deatils_container">
              <small>Category</small>
              <button
                onClick={() =>
                  navigate(`/category/${data.userType.toLowerCase()}`)
                }
                className="category-button"
                css={css({
                  border: `1px solid ${themeColorState.text}`,
                  ":hover": {
                    background: colorPicker(data.userType.toLowerCase()),
                    border: "transparent",
                  },
                })}
              >
                <span
                  className="category-button-name"
                  style={{ color: themeColorState.text }}
                >
                  {data.userType}
                </span>
              </button>
            </div>
            <div className="deatils_container">
              <small>LOCOMOTION TYPE</small>
                <p>
                  {data.locomotionType}
                </p>
            </div>
          </div>
        </div>
      </section>
      <section className="humanoid_videos_secction">

      </section>
      {/* <h1>Product</h1>
      <p>{data.name}</p>
      <Videos /> */}
    </main>
  );
}
