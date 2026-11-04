import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const selectedTheme = useSelector(
    (state) => state.themeColor.colorPalette.text,
  );
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  useEffect(() => {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const c2 = canvas2.getContext("2d");
    const c = canvas1.getContext("2d");
    configeAnimation(c, c2, canvas1, canvas2, selectedTheme);
  }, [selectedTheme]);

  function colorPicker(category) {
    const colorData = categoryColors.filter(
      (data) => data.category === category,
    );
    return colorData[0].color;
  }

  function createArticle(id) {
      return (
        <article
          className="humanoid_teaser"
          onMouseEnter={(e) => {
            console.log(e)
            setIsHumanoidActive(data[id].name);
          }}
          onMouseLeave={() => {
            setIsHumanoidActive("");
          }}
          key={id}
        >
          <div className="teaser_content">
            <div className="teaser_image_container">
              <img src={data[id].image[0]} alt={data[id].name}></img>
            </div>
            <div className="teaser_details_container">
              <div className="latest_humanoid_name">
                <b
                  key={`${id}-b`}
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
              <div
                key={id}
                className="category-container"
                style={{
                  border: `1px solid ${themeColorState.text}`,
                  ":hover": {
                    backgroundColor: colorPicker(
                      data[id].useType.toLowerCase(),
                    ),
                    borderColor: "transparent",
                  },
                }}
              >
                <Link
                  to={`/category/${data[id].useType.toLowerCase()}`}
                  className="category-link"
                  style={{
                    color: themeColorState.text,
                  }}
                >
                  {data[id].useType}
                </Link>
              </div>
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
        key={0}
        style={{
          ":active": {
            outline: `2px solid ${colorPicker(data[0].useType.toLowerCase())}`,
          },
          backgroundImage: `url(${data[0].image[0]})`,
        }}
        onClick={() => {
          navigate(`/product/${data[0].slag}`);
        }}
      >
        <div className="home_featured_humanoid_container">
          <div className="home_featured_humanoid">
            <span className="home_featured">FEATURED HUMANOID</span>
            <div className="featured_humanoid">
              <h1 className="humanoid_name">
                {data[0].name}
                <span style={{ display: `${isActive ? "flex" : "none"}` }}>
                  <Slide left>
                    <HiArrowRight />
                  </Slide>
                </span>
              </h1>
              <p className="home_subheading">{data[0].tagline}</p>
            </div>
          </div>
          <div
            className="category-container"
            style={{
              ":hover": {
                backgroundColor: colorPicker(data[0].useType.toLowerCase()),
                borderColor: "transparent",
              },
            }}
          >
            <Link
              to={`/category/${data[0].useType.toLowerCase()}`}
              className="category-link"
            >
              {data[0].useType}
            </Link>
          </div>
        </div>
      </section>
      <section className="latest_humanoids_section_container">
        <header className="section_heading_container">
          <h2 className="section_heading">LATEST HUMANOIDS</h2>
        </header>
        <div className="latest_humanoids_container">
          <div className="first_stack">
          {createArticle(25)}
          </div>
          <div className="second_stack">
            {createArticle(9)}
            {createArticle(3)}
            {createArticle(14)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Radium(Home)