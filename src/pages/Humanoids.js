/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Radium from "radium";
import humanoidsData from "../data/data.json";
import { colorPicker } from "../utils";

function Humanoids() {
  let navigate = useNavigate();
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const navigationColorState = useSelector(
    (state) => state.navigationColor.color,
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
            color: colorPicker(data.useType.toLowerCase()),
          },
        })}
      >
        <div
          className="teaser_content"
          key={`humanoid_content_all${i}`}
          style={{
            ":active": {
              outline: `2px solid ${colorPicker(data.useType.toLowerCase())}`,
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
                })}
              >
                {data.name}
              </h2>
            </div>
            <button
              onClick={() =>
                navigate(`/category/${data.useType.toLowerCase()}`)
              }
              key={`humanoid-button-all${i}`}
              className="category-button"
              style={{
                border: `1px solid ${themeColorState.text}`,
                ":hover": {
                  background: colorPicker(data.useType.toLowerCase()),
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
        <h1
          className="category_heading"
          style={{ color: navigationColorState }}
        >
          Humanoids
        </h1>
      </header>
      <section className="category_page_container">
        {humanoidsData.map((humanoid, i) => createArticle(humanoid, i))}
      </section>
    </main>
  );
}

export default Radium(Humanoids);
