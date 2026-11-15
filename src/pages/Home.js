/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowRight } from "react-icons/hi";
import { RiRobot3Fill } from "react-icons/ri";
import { configeAnimation } from "../utils";
import data from "../data/data.json";
import HumanoidComponent from "../components/HumanoidComponent";
import ArticleComponent from "../components/ArticleComponent";
import FeautureHumanoid from "../components/FeatureHumanoidComponent";
import "../styling/home.css";

function Home() {
  const [humanoidPicker, setHumanoidPicker] = useState({
    first: Math.floor(Math.random() * 31),
    second: Math.floor(Math.random() * 31),
  });
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  function generateNumbers() {
    const one = Math.floor(Math.random() * 31);
    const two = Math.floor(Math.random() * 31);
    if (one !== two) {
      setHumanoidPicker({ first: one, second: two });
    } else {
      generateNumbers();
    }
  }

  useEffect(() => {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const c2 = canvas2.getContext("2d");
    const c = canvas1.getContext("2d");
    configeAnimation(c, c2, canvas1, canvas2, themeColorState);
  }, [themeColorState]);

  return (
    <main id="Home-Page-container">
      <section className="canvas-container">
        <canvas ref={canvasRef1} id="canvas-1"></canvas>
        <canvas ref={canvasRef2} id="canvas-2"></canvas>
      </section>
      <FeautureHumanoid id={0} />
      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <h2 className="section_heading">LATEST HUMANOIDS</h2>
        </header>
        <div className="humanoids_container">
          <div className="first_stack">
            <HumanoidComponent data={data[25]} i={25} />
          </div>
          <div className="second_stack">
            <HumanoidComponent data={data[9]} i={9} />
            <HumanoidComponent data={data[3]} i={3} />
            <HumanoidComponent data={data[14]} i={14} />
          </div>
        </div>
      </section>
      <section className="second-feature-humanoid">
        <FeautureHumanoid id={6} />
      </section>
      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <h2 className="section_heading">HUMANOIDS HELPERS</h2>
        </header>
        <div className="humanoids_container" style={{ flexDirection: "row" }}>
          <div
            className="first_stack, helper_stack"
            style={{
              borderRight: "1px solid #404040",
              borderLeft: "none",
              padding: "0 19px 0 0",
            }}
          >
            <HumanoidComponent data={data[15]} i={15} />
          </div>
          <div className="second_stack">
            <HumanoidComponent data={data[27]} i={27} />
            <HumanoidComponent data={data[4]} i={4} />
            <HumanoidComponent data={data[11]} i={11} />
          </div>
        </div>
      </section>
      <section className="learn_article_section_container">
        <header className="learn_article_heading_container">
          <h1>LEARN ABOUT HUMANOIDS</h1>
          <Link to="/learn" style={{ color: themeColorState.text }}>
            See all articles and resources
            <span>
              <HiArrowRight />
            </span>
          </Link>
        </header>
        <div className="articles_container">
          <div className="article_container"><ArticleComponent id={7} /></div>
          <div className="article_container"><ArticleComponent id={8} /></div>
          <div className="article_container"><ArticleComponent id={2} /></div>
          <div className="article_container"><ArticleComponent id={1} /></div>
        </div>
      </section>

      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <div className="random_humanoid_header_content">
            <h1 className="section_heading">TWO RANDOM HUMANOIDS</h1>
            <button
              className="random_generator"
              key={"random_button_2"}
              css={css({
                ":hover": {
                  background: "#FF4C00",
                },
                background: themeColorState.text === "#000000" ? "#CFCFCA" : "",
              })}
              onClick={() => generateNumbers()}
            >
              <RiRobot3Fill
                size={25}
                color={
                  themeColorState.text === "#000000"
                    ? "#767676"
                    : themeColorState.text
                }
              />
            </button>
          </div>
        </header>
        <div
          className="humanoids_container"
          id="random_humanoid"
          style={{ flexDirection: "row" }}
        >
          <div className="second_stack" id="random_teaser">
              <HumanoidComponent data={data[humanoidPicker.first]} i={humanoidPicker.first} />
          </div>
          <div className="first_stack" id="random_teaser">
              <HumanoidComponent data={data[humanoidPicker.second]} i={humanoidPicker.second} />
          </div>
        </div>
      </section>

      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <h2 className="section_heading">EXPLORE HUMANOIDS CATEGORIES</h2>
        </header>
        <div className="explore_humanoids_category_container">
          <Link
            to="category/consumer"
            style={{
              color: themeColorState.text,
              background:
                themeColorState.text === "#000000" ? "#CFCFCA" : "#404040",
            }}
          >
            Consumer
          </Link>
          <Link
            to="category/research"
            style={{
              color: themeColorState.text,
              background:
                themeColorState.text === "#000000" ? "#CFCFCA" : "#404040",
            }}
          >
            Research
          </Link>
          <Link
            to="category/professional"
            style={{
              color: themeColorState.text,
              background:
                themeColorState.text === "#000000" ? "#CFCFCA" : "#404040",
            }}
          >
            Professional
          </Link>
          <Link
            to="category/education"
            style={{
              color: themeColorState.text,
              background:
                themeColorState.text === "#000000" ? "#CFCFCA" : "#404040",
            }}
          >
            Education
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
