import React, { useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import humanoidsData from "../data/data.json";
import "../styling/category.css"

export default function Category() {
  let navigate = useNavigate();
  const [isHumanoidActive, setIsHumanoidActive] = useState("");
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const categoryColorState = useSelector((state) => state.categoryColor.color);
  let { useType } = useParams();
  const humanoidData = humanoidsData.filter((humanoid) => humanoid.useType.toLowerCase() === useType);

    function createArticle(data, i) {
        return (
          <article
            className="humanoid_teaser"
            onMouseEnter={() => {
              setIsHumanoidActive(data.name);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsHumanoidActive("");
            }}
            onClick={(e) => {
              if (
                e.target.className !== "category-button-name" &&
                e.target.className !== "category-button"
              )
                navigate(`/product/${data.slag}`);
            }}
            key={`humanoid_teaser_${i}`}
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
                  <b
                    key={`humanoid_name_container${i}`}
                    style={{
                      color:
                        isHumanoidActive === data.name
                          ? categoryColorState
                          : "",
                      fontSize: "2em",
                    }}
                  >
                    {isHumanoidActive === data.name ? "\u2022" : "\u25CB"}
                  </b>
                  <h2>{data.name}</h2>
                </div>
                <button
                  onClick={() => navigate(
                    `/category/${data.useType.toLowerCase()}`,
                  )}
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
        <h1 className="category_heading" style={{color: categoryColorState}}>
          {useType.charAt(0).toLocaleUpperCase() +
            useType.slice(1)}
        </h1>
      </header>
      <section className="category_page_container">
        {humanoidData.map((humanoid, i) => (
          createArticle(humanoid, i)
        ))}
      </section>
    </main>
  );
}