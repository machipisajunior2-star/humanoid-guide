/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import articleData from "../data/articles.json";

export default function ArticleComponent(props) {
  let navigate = useNavigate();
  const themeColorState = useSelector(
    (state) => state.themeColor.colorPalette.text,
  );
  const {id} = props

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
