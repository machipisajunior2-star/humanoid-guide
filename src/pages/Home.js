import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowRight } from "react-icons/hi";
import Slide from "react-reveal/Slide";
import Radium from "radium";
import { configeAnimation } from "../utils";
import data from "../data/data.json";
import categoryColors from "../data/category-color.json";
import "../styling/home.css";

function Home() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isHumanoidActive, setIsHumanoidActive] = useState("");
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  useEffect(() => {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const c2 = canvas2.getContext("2d");
    const c = canvas1.getContext("2d");
    configeAnimation(c, c2, canvas1, canvas2, themeColorState);
  }, [themeColorState]);

  function colorPicker(category) {
    const colorData = categoryColors.filter(
      (data) => data.category === category,
    );
    return colorData[0].color;
  }

  function createFeatureHumanoid(id) {
    return (
      <section
        className={
          isActive
            ? "featured-content feature-content-active"
            : "featured-content feature-content-inactive"
        }
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        key={`featured-content${id}`}
        style={{
          ":active": {
            outline: `2px solid ${colorPicker(data[id].useType.toLowerCase())}`,
          },
          backgroundImage: `url(${data[id].image[0]})`,
        }}
        onClick={(e) => {
            if (
              e.target.className !== "category-button-name" &&
              e.target.className !== "category-button"
            )
              navigate(`/product/${data[id].slag}`);
        }}
      >
        <div className="home_featured_humanoid_container">
          <div className="home_featured_humanoid">
            <span
              className="home_featured"
              style={{ background: id === 6 ? "#FA5F9F" : "#4096C8" }}
            >
              FEATURED HUMANOID
            </span>
            <div className="featured_humanoid">
              <h1 className="humanoid_name">
                {data[id].name}
                <span
                  key={`humanoid-span-slider${id}`}
                  style={{ display: `${isActive ? "flex" : "none"}` }}
                >
                  <Slide left>
                    <HiArrowRight />
                  </Slide>
                </span>
              </h1>
              <p
                className="home_subheading"
                style={{ color: id === 6 ? themeColorState.text : "black" }}
              >
                {data[id].tagline}
              </p>
            </div>
          </div>
          <button
                onClick={() => navigate(
                  `/category/${data[id].useType.toLowerCase()}`,
                )}
            className="category-button"
            key={`category-button${id}`}
            style={{
              border:
                id === 6
                  ? `1px solid ${themeColorState.text}`
                  : "1px solid black",
              ":hover": {
                background: colorPicker(data[id].useType.toLowerCase()),
                border: "transparent",
              },
            }}
          >
            <span
              className="category-button-name"
              style={{ color: id === 6 ? themeColorState.text : "black" }}
            >
              {data[id].useType}
            </span>
          </button>
        </div>
      </section>
    );
  }

  function createArticle(id) {
      return (
        <article
          className="humanoid_teaser"
          onMouseEnter={() => {
            setIsHumanoidActive(data[id].name);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsHumanoidActive("");
          }}
          onClick={(e) => {
            if (
              e.target.className !== "category-button-name" &&
              e.target.className !== "category-button"
            )
              navigate(`/product/${data[id].slag}`);
          }}
          key={`humanoid_teaser_${id}`}
        >
          <div
            className="teaser_content"
            key={`teaser_content${id}`}
            style={{
              ":active": {
                outline: `2px solid ${colorPicker(data[id].useType.toLowerCase())}`,
                borderRadius: "25px",
              },
            }}
          >
            <div className="teaser_image_container">
              <img src={data[id].image[0]} alt={data[id].name}></img>
            </div>
            <div className="teaser_details_container">
              <div className="humanoid_name_container">
                <b
                  key={`humanoid_name_container${id}`}
                  style={{
                    color:
                      isHumanoidActive === data[id].name
                        ? colorPicker(data[id].useType.toLowerCase())
                        : "",
                    fontSize: "2em",
                  }}
                >
                  {isHumanoidActive === data[id].name ? "\u2022" : "\u25CB"}
                </b>
                <h2>{data[id].name}</h2>
              </div>
              <button
                onClick={() => navigate(
                  `/category/${data[id].useType.toLowerCase()}`,
                )}
                key={`category-button${id}`}
                className="category-button"
                style={{
                  border: `1px solid ${themeColorState.text}`,
                  ":hover": {
                    background: colorPicker(data[id].useType.toLowerCase()),
                    border: "transparent",
                  },
                }}
              >
                <span
                  className="category-button-name"
                  style={{
                    color: themeColorState.text,
                  }}
                >
                  {data[id].useType}
                </span>
              </button>
            </div>
          </div>
        </article>
      );
  }

  return (
    <main id="Home-Page-container">
      <section className="canvas-container">
        <canvas ref={canvasRef1} id="canvas-1"></canvas>
        <canvas ref={canvasRef2} id="canvas-2"></canvas>
      </section>
      {createFeatureHumanoid(0)}
      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <h2 className="section_heading">LATEST HUMANOIDS</h2>
        </header>
        <div className="humanoids_container">
          <div className="first_stack">{createArticle(25)}</div>
          <div className="second_stack">
            {createArticle(9)}
            {createArticle(3)}
            {createArticle(14)}
          </div>
        </div>
      </section>
      <section className="second-feature-humanoid">
        {createFeatureHumanoid(6)}
      </section>
      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <h2 className="section_heading">HUMANOIDS HELPERS</h2>
        </header>
        <div className="humanoids_container" style={{ flexDirection: "row" }}>
          <div
            className="first_stack, helper_stack"
            style={{
              borderRight: "1px solid #BFBFBF",
              borderLeft: "none",
              padding: "0 19px 0 0",
            }}
          >
            {createArticle(15)}
          </div>
          <div className="second_stack">
            {createArticle(27)}
            {createArticle(4)}
            {createArticle(11)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Radium(Home)