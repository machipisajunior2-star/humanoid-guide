/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowRight } from "react-icons/hi";
import { RiRobot3Fill } from "react-icons/ri";
import Slide from "react-reveal/Slide";
import Radium from "radium";
import { configeAnimation } from "../utils";
import data from "../data/data.json";
import articleData from "../data/articles.json";
import { colorPicker } from "../utils";
import "../styling/home.css";

function Home() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
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
            onClick={() =>
              navigate(`/category/${data[id].useType.toLowerCase()}`)
            }
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
        onClick={(e) => {
          if (
            e.target.className !== "category-button-name" &&
            e.target.className !== "category-button"
          )
            navigate(`/product/${data[id].slag}`);
        }}
        key={`humanoid_teaser_${id}`}
        css={css({
          ":hover .humanoid_name_container h2::before": {
            content: `"\\2B24"`,
            color: colorPicker(data[id].useType.toLowerCase()),
          },
        })}
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
              <h2
                css={css({
                  color: themeColorState.text,
                  "::before": {
                    paddingRight: "10px",
                    content: '"\\1F785"',
                    fontSize: "1em",
                  },
                })}
              >
                {data[id].name}
              </h2>
            </div>
            <button
              onClick={() =>
                navigate(`/category/${data[id].useType.toLowerCase()}`)
              }
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

  function createLearnArticle(id) {
    return (
      <article
        className="article_teaser"
        onClick={() => {
          const params = articleData[id].title.replace("?", "%3f");
          navigate(`/learn/${params}`);
        }}
        key={`article_teaser_${id}`}
        css={css({
          ":hover .article_text header h2::before": {
            content: `"\\2B24"`,
            color: "#27C3AE",
          },
        })}
      >
        <div className="article_text">
          <header>
            <h2
              css={css({
                color: themeColorState.text,
                "::before": {
                  paddingRight: "10px",
                  content: '"\\1F785"',
                  fontSize: "1em",
                },
              })}
            >
              {articleData[id].title}
            </h2>
          </header>
          <p>{articleData[id].description}</p>
        </div>
        <div className="article_image_container">
          {articleData[id].image && (
            <img src={`${articleData[id].image}`} alt={`article-${id}`} />
          )}
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
              borderRight: "1px solid #404040",
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
          <div className="article_container">{createLearnArticle(7)}</div>
          <div className="article_container">{createLearnArticle(8)}</div>
          <div className="article_container">{createLearnArticle(2)}</div>
          <div className="article_container">{createLearnArticle(1)}</div>
        </div>
      </section>

      <section className="humanoids_section_container">
        <header className="section_heading_container">
          <div className="random_humanoid_header_content">
            <h1 className="section_heading">TWO RANDOM HUMANOIDS</h1>
            <button
              className="random_generator"
              key={"random_button_2"}
              style={{
                ":hover": {
                  background: "#FF4C00",
                },
                background: themeColorState.text === "#000000" ? "#CFCFCA" : "",
              }}
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
            <article
              className="humanoid_teaser"
              onClick={(e) => {
                if (
                  e.target.className !== "category-button-name" &&
                  e.target.className !== "category-button"
                )
                  navigate(`/product/${data[humanoidPicker.first].slag}`);
              }}
              key={`humanoid_teaser_random1${humanoidPicker.first}`}
              css={css({
                ":hover .humanoid_name_container h2::before": {
                  content: `"\\2B24"`,
                  color: colorPicker(
                    data[humanoidPicker.first].useType.toLowerCase(),
                  ),
                },
              })}
            >
              <div
                className="teaser_content"
                key={`teaser_content_random1${humanoidPicker.first}`}
                style={{
                  ":active": {
                    outline: `2px solid ${colorPicker(data[humanoidPicker.first].useType.toLowerCase())}`,
                    borderRadius: "25px",
                  },
                }}
              >
                <div className="teaser_image_container">
                  <img
                    src={data[humanoidPicker.first].image[0]}
                    alt={data[humanoidPicker.first].name}
                  ></img>
                </div>
                <div className="teaser_details_container">
                  <div className="humanoid_name_container">
                    <h2
                      css={css({
                        color: themeColorState.text,
                        "::before": {
                          paddingRight: "10px",
                          content: '"\\1F785"',
                          fontSize: "1em",
                        },
                      })}
                    >
                      {data[humanoidPicker.first].name}
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/category/${data[humanoidPicker.first].useType.toLowerCase()}`,
                      )
                    }
                    key={`category-button_random1${humanoidPicker.first}`}
                    className="category-button"
                    style={{
                      border: `1px solid ${themeColorState.text}`,
                      ":hover": {
                        background: colorPicker(
                          data[humanoidPicker.first].useType.toLowerCase(),
                        ),
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
                      {data[humanoidPicker.first].useType}
                    </span>
                  </button>
                </div>
              </div>
            </article>
          </div>
          <div className="first_stack" id="random_teaser">
            <article
              className="humanoid_teaser"
              onClick={(e) => {
                if (
                  e.target.className !== "category-button-name" &&
                  e.target.className !== "category-button"
                )
                  navigate(`/product/${data[humanoidPicker.second].slag}`);
              }}
              key={`humanoid_teaser_random2${humanoidPicker.second}`}
              css={css({
                ":hover .humanoid_name_container h2::before": {
                  content: `"\\2B24"`,
                  color: colorPicker(
                    data[humanoidPicker.second].useType.toLowerCase(),
                  ),
                },
              })}
            >
              <div
                className="teaser_content"
                key={`teaser_content_random2${humanoidPicker.second}`}
                style={{
                  ":active": {
                    outline: `2px solid ${colorPicker(data[humanoidPicker.second].useType.toLowerCase())}`,
                    borderRadius: "25px",
                  },
                }}
              >
                <div className="teaser_image_container">
                  <img
                    src={data[humanoidPicker.second].image[0]}
                    alt={data[humanoidPicker.second].name}
                  ></img>
                </div>
                <div className="teaser_details_container">
                  <div className="humanoid_name_container">
                    <h2
                      css={css({
                        color: themeColorState.text,
                        "::before": {
                          paddingRight: "10px",
                          content: '"\\1F785"',
                          fontSize: "1em",
                        },
                      })}
                    >
                      {data[humanoidPicker.second].name}
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/category/${data[humanoidPicker.second].useType.toLowerCase()}`,
                      )
                    }
                    key={`category-button_random2${humanoidPicker.second}`}
                    className="category-button"
                    style={{
                      border: `1px solid ${themeColorState.text}`,
                      ":hover": {
                        background: colorPicker(
                          data[humanoidPicker.second].useType.toLowerCase(),
                        ),
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
                      {data[humanoidPicker.second].useType}
                    </span>
                  </button>
                </div>
              </div>
            </article>
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

export default Radium(Home);
