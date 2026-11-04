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
        style={{ backgroundImage: `url(${data[0].image[0]})` }}
        onClick={() => {
          navigate(`/product/${data[0].slag}`);
        }}
      >
        <div className="home_featured_humanoid_container">
          <div className="home_featured_humanoid">
            <span className="home_featured">FEATURED HUMANOID</span>
            <div className="featured_humanoid">
              <h1 className="hummanoid_name">
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
    </main>
  );
}

export default Radium(Home)