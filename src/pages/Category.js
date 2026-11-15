import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import humanoidsData from "../data/data.json";
import HumanoidComponent from "../components/HumanoidComponent";
import "../styling/category.css";

function Category() {
  const categoryColorState = useSelector((state) => state.categoryColor.color);
  let { useType } = useParams();
  const humanoidData = humanoidsData.filter(
    (humanoid) => humanoid.useType.toLowerCase() === useType,
  );

  return (
    <main className="category_page_wrapper">
      <header>
        <h1 className="category_heading" style={{ color: categoryColorState }}>
          {useType.charAt(0).toLocaleUpperCase() + useType.slice(1)}
        </h1>
      </header>
      <section className="category_page_container">
        {humanoidData.map((humanoid, i) => <HumanoidComponent data={humanoid} i={i} />)}
      </section>
    </main>
  );
}

export default Category;
