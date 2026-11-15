import React from "react";
import ArticleComponent from "../components/ArticleComponent";
import articleData from "../data/articles.json";
import "../styling/learn.css";

export default function Learn() {
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
          <div className="article_container"><ArticleComponent id={4} /></div>
          <div className="article_container"><ArticleComponent id={5} /></div>
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
              <ArticleComponent id={i} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
