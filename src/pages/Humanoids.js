
import React from "react";
import { useSelector } from "react-redux";
import humanoidsData from "../data/data.json";
import HumanoidComponent from "../components/HumanoidComponent";

function Humanoids() {
  const navigationColorState = useSelector(
    (state) => state.navigationColor.color,
  );

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
        {humanoidsData.map((humanoid, i) => <HumanoidComponent data={humanoid} i={i} />)}
      </section>
    </main>
  );
}

export default Humanoids;
