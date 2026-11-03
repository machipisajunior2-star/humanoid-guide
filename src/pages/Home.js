import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// import data from "../data/data.json"
import { configeAnimation } from "../utils";
import "../styling/home.css";

export default function Home() {
  const selectedTheme = useSelector(
    (state) => state.themeColor.colorPalette.text,
  );
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  useEffect(() => {
    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const c2 = canvas2.getContext("2d");
    const c = canvas1.getContext("2d");
    configeAnimation(c, c2, canvas1, canvas2, selectedTheme);
  }, [selectedTheme]);

  return (
    <section id="Home-Page-container">
      <section className="canvas-container">
        <canvas ref={canvasRef1} id="canvas-1"></canvas>
        <canvas ref={canvasRef2} id="canvas-2"></canvas>
      </section>
    </section>
  );
}
