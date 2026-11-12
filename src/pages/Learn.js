/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import articleData from "../data/articles.json";
import "../styling/learn.css";

export default function Learn() {
  let navigate = useNavigate();
  const themeColorState = useSelector(
    (state) => state.themeColor.colorPalette.text,
  );

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
              })}>{articleData[id].title}</h2>
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
    <main id="learn_page_container">
      <header>
        <h1>Learn About Humanoids</h1>
      </header>
      <section
        className="learn_article_section_container"
        id="learn_page_section_conatiner"
      >
        <header className="learn_article_heading_container">
          <h2>FEATURED</h2>
        </header>
        <div className="articles_container">
          <div className="article_container">{createLearnArticle(4)}</div>
          <div className="article_container">{createLearnArticle(5)}</div>
        </div>
      </section>
      <section
        className="learn_article_section_container"
        id="learn_page_section_conatiner"
      >
        <header className="learn_article_heading_container">
          <h2>ARTICLES</h2>
        </header>
        <div className="articles_container" id="articles-container">
          {articleData.map((article, i) => (
            <div className="article_container" key={`article_container_${i}`}>
              {createLearnArticle(i)}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
