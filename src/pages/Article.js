/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import articles from "../data/articles.json";
import "../styling/article.css"

export default function Article() {
  let { article } = useParams();
  const ref = useRef()
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const articleData = articles.filter(
    (data) => data.title === article,
  );
  let sections = [];
  if (articleData)
    articleData[0].sections.forEach((element, i) => {
      sections.push(
        <div className="article_paragraph_section" key={`paragraph_${i}`}>
          <h2>{parse(element.title)}</h2>
          <div>{parse(element.content)}</div>
        </div>
      );
    });

    
    const monthsArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDateObj = new Date(articleData[0].date);
    const day = currentDateObj.getDate();
    const month = monthsArr[currentDateObj.getMonth()];
    const year = currentDateObj.getFullYear();

    useEffect(() => {
      ref.current.addEventListener("click", (e) => {
        if (
          e.target.tagName.toLowerCase() !== "summary" &&
          e.target.tagName.toLowerCase() !== undefined
         )
          ref.current.removeAttribute("open");
      });
    }, [])

  return (
    <main id="article_wrapper">
      <details ref={ref}>
        <summary>{article}</summary>
        <section className="mobile_article_navigation_section">
          <header>
            <h4>Articles</h4>
          </header>
          {articles.map((data, i) => (
            <Link
              key={`article_${i}`}
              to={`/learn/${data.title.replace("?", "%3f")}`}
              css={css({
                color:
                  themeColorState.text === "#000000"
                    ? article === data.title
                      ? "#000000"
                      : "#5A5A5A"
                    : "#BFBFBF",
                "::before": {
                  content: article === data.title ? `"\\2B24"` : '"\\1F785"',
                  color: article === data.title ? "#27C3AE" : "",
                },
                ":hover": {
                  color:
                    themeColorState.text === "#000000" ? "#000000" : "white",
                },
                ":hover::before": {
                  content: `"\\2B24"`,
                  color: "#27C3AE",
                },
              })}
            >
              {data.title}
            </Link>
          ))}
        </section>
      </details>
      <section className="article_navigation_section">
        <header>
          <h4>Articles</h4>
        </header>
        {articles.map((data, i) => (
          <Link
            key={`article_${i}`}
            to={`/learn/${data.title.replace("?", "%3f")}`}
            css={css({
              color:
                themeColorState.text === "#000000"
                  ? article === data.title
                    ? "#000000"
                    : "#5A5A5A"
                  : "#BFBFBF",
              "::before": {
                paddingRight: "10px",
                content: article === data.title ? `"\\2B24"` : '"\\1F785"',
                color: article === data.title ? "#27C3AE" : "",
                fontSize: "1em",
                display: "inline-block",
                position: "absolute",
                left: "30px",
              },
              ":hover": {
                color: themeColorState.text === "#000000" ? "#000000" : "white",
              },
              ":hover::before": {
                content: `"\\2B24"`,
                color: "#27C3AE",
              },
            })}
          >
            {data.title}
          </Link>
        ))}
      </section>
      <section className="article_content_container">
        <header>
          <h1 className="article_title">{parse(articleData[0].title)}</h1>
          <p>{parse(articleData[0].description)}</p>
        </header>
        <div className="article_stamp">
          <small>
            Written by <strong style={{color: themeColorState.text}}>{parse(articleData[0].author)}</strong>
          </small>
          <date>
            <small>
              {month} {day}, {year}
              {articleData[0].time ? `, ${articleData[0].time}` : ""}
            </small>
          </date>
        </div>
        <div className="article_page_details_container">
          {articleData[0].image && <img src={articleData[0].image} alt={articleData[0].title} />}
          <div>{parse(articleData[0].details)}</div>
        </div>
        {sections}
      </section>
    </main>
  );
}
