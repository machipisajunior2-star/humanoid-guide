/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Radium from "radium";
import humanoidsData from "../data/data.json";
import "../styling/category.css";

function Category() {
  let navigate = useNavigate();
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const categoryColorState = useSelector((state) => state.categoryColor.color);
  let { useType } = useParams();
  const humanoidData = humanoidsData.filter(
    (humanoid) => humanoid.useType.toLowerCase() === useType,
  );

  function createArticle(data, i) {
    return (
      <article
        className="humanoid_teaser"
        onClick={(e) => {
          if (
            e.target.className !== "category-button-name" &&
            e.target.className !== "category-button"
          )
            navigate(`/product/${data.slag}`);
        }}
        key={`humanoid_teaser_${i}`}
        css={css({
          ":hover .humanoid_name_container h2::before": {
            content: `"\\2B24"`,
            color: categoryColorState,
          },
        })}
      >
        <div
          className="teaser_content"
          key={`teaser_content${i}`}
          style={{
            ":active": {
              outline: `2px solid ${categoryColorState}`,
              borderRadius: "25px",
            },
          }}
        >
          <div className="teaser_image_container">
            <img src={data.image[0]} alt={data.name}></img>
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
                })}>{data.name}</h2>
            </div>
            <button
              onClick={() =>
                navigate(`/category/${data.useType.toLowerCase()}`)
              }
              key={`category-button-${i}`}
              className="category-button"
              style={{
                border: `1px solid ${themeColorState.text}`,
                ":hover": {
                  background: categoryColorState,
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
                {data.useType}
              </span>
            </button>
          </div>
        </div>
      </article>
    );
  }
  return (
    <main className="category_page_wrapper">
      <header>
        <h1 className="category_heading" style={{ color: categoryColorState }}>
          {useType.charAt(0).toLocaleUpperCase() + useType.slice(1)}
        </h1>
      </header>
      <section className="category_page_container">
        {humanoidData.map((humanoid, i) => createArticle(humanoid, i))}
      </section>
    </main>
  );
}

export default Radium(Category);
