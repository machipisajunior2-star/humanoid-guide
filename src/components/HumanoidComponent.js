/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { colorPicker } from "../utils";

export default function HumanoidComponent(props) {
  const { data, i } = props;
  let navigate = useNavigate();
    const themeColorState = useSelector((state) => state.themeColor.colorPalette);
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
        css={css({
          ":active": {
            outline: `2px solid ${colorPicker(data.useType.toLowerCase())}`,
            borderRadius: "25px",
          },
        })}
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
            onClick={() => navigate(`/category/${data.useType.toLowerCase()}`)}
            key={`humanoid-button-all${i}`}
            className="category-button"
            css={css({
              border: `1px solid ${themeColorState.text}`,
              ":hover": {
                background: colorPicker(data.useType.toLowerCase()),
                border: "transparent",
              },
            })}
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
