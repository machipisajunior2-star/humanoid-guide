import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import articles from "../data/articles.json"

export default function Article() {
  let { article } = useParams();
  const articleData = articles.filter(data => data.title === article)
console.log(article)
  let sections = []
  if (articleData) articleData[0].sections.forEach(element => {
    sections.push(
    <div>
        <h2>{parse(element.title)}</h2>
        <p>{parse(element.content)}</p>
    </div>
    )
  })

  return (
    <main id="container">
        <h1>{parse(articleData[0].title)}</h1>
        <p>{parse(articleData[0].details)}</p>
        {sections}
    </main>
  );
}