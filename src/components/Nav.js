import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BsSunFill, BsBrightnessLowFill, BsJustify } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Zoom from "react-reveal/Zoom";
import themeColors from "../data/theme-color-data.json";
import { setColor } from "../redux/themeColor/themeColorAction";
import "../styling/nav.css";

export default function Nav() {
  const colorState = useSelector((state) => state.themeColor);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (location.pathname === "/404") {
    return null;
  }
  const colors = themeColors;
  const colorButtons = []
  colors.forEach((color) => { 
    colorButtons.push(
      <button
        onClick={() => {
          dispatch(setColor(color.id));
          document.querySelector(".color-pick").style.display = "none";
        }}
        key={color.id}
      >
        <BsBrightnessLowFill color={color.background} size="1.5em" />
      </button>,
    );
  });
  const homeClass = (path) =>
    `${location.pathname === path ? "home_heading" : ""}`;
  const categoryClass = (path, category) =>
    `${location.pathname === path ? `${category}_current_page` : `${category}_nav`}`;

  // window.addEventListener("mousedown", (event) => {
  //   console.log(isColorPickerOpen)
  //   if (
  //     isColorPickerOpen &&
  //     event.target !== document.querySelector(".color-pick")
  //   ) {
  //     setIsColorPickerOpen((isOpen) => !isOpen);
  //   } else if (isModalOpen && event.target !== document.querySelector(".modal")) {
  //     setIsModalOpen((isOpen) => !isOpen);
  //   }
  // });

  return (
    <section className="app-navigation-con">
      <div
        className={`heading${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
      >
        <Link to="/">
          <h1
            style={{ color: colorState.colorPalette.text }}
            className={homeClass("/")}
          >
            HUMANOIDS
          </h1>
        </Link>
      </div>
      <div className="navigation-con">
        <div></div>
        <div
          className={`mobile-menu${isModalOpen ? " mobile-menu-active" : " mobile-menu-inactive"}`}
        >
          <BsJustify
            onClick={() => {
              setIsModalOpen((isOpen) => !isOpen);
              setIsColorPickerOpen(false);
            }}
            size="1.5em"
            color={colorState.colorPalette.text}
          />
        </div>
        <Zoom>
          <ul
            style={{
              display: isModalOpen ? "block" : "none",
              backgroundColor: colorState.colorPalette.background,
            }}
            className="modal"
          >
            <li
              className={`${categoryClass(
                "/category/all_humanoids",
                "all_humanoids",
              )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
            >
              <Link
                onClick={() => setIsModalOpen(false)}
                style={{ color: colorState.colorPalette.text }}
                to="/category/all_humanoids"
              >
                All
              </Link>
            </li>
            <li
              className={`${categoryClass(
                "/category/consumer",
                "consumer",
              )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
            >
              <Link
                onClick={() => setIsModalOpen(false)}
                style={{ color: colorState.colorPalette.text }}
                to="/category/consumer"
              >
                Consumer
              </Link>
            </li>
            <li
              className={`${categoryClass(
                "/category/research",
                "research",
              )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
            >
              <Link
                onClick={() => setIsModalOpen(false)}
                style={{ color: colorState.colorPalette.text }}
                to="/category/research"
              >
                Research
              </Link>
            </li>
            <li
              className={`${categoryClass(
                "/category/education",
                "education",
              )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
            >
              <Link
                onClick={() => setIsModalOpen(false)}
                style={{ color: colorState.colorPalette.text }}
                to="/category/education"
              >
                Education
              </Link>
            </li>
            <li
              className={`${categoryClass(
                "/category/professional",
                "professional",
              )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
            >
              <Link
                onClick={() => setIsModalOpen(false)}
                style={{ color: colorState.colorPalette.text }}
                to="/category/professional"
              >
                Professional
              </Link>
            </li>
          </ul>
        </Zoom>
        <ul className="desktop-menu">
          <li
            className={`${categoryClass(
              "/category/all_humanoids",
              "all_humanoids",
            )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
          >
            <Link
              style={{ color: colorState.colorPalette.text }}
              to="/category/all_humanoids"
            >
              All
            </Link>
          </li>
          <li
            className={`${categoryClass(
              "/category/consumer",
              "consumer",
            )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
          >
            <Link
              style={{ color: colorState.colorPalette.text }}
              to="/category/consumer"
            >
              Consumer
            </Link>
          </li>
          <li
            className={`${categoryClass(
              "/category/research",
              "research",
            )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
          >
            <Link
              style={{ color: colorState.colorPalette.text }}
              to="/category/research"
            >
              Research
            </Link>
          </li>
          <li
            className={`${categoryClass(
              "/category/education",
              "education",
            )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
          >
            <Link
              style={{ color: colorState.colorPalette.text }}
              to="/category/education"
            >
              Education
            </Link>
          </li>
          <li
            className={`${categoryClass(
              "/category/professional",
              "professional",
            )}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
          >
            <Link
              style={{ color: colorState.colorPalette.text }}
              to="/category/professional"
            >
              Professional
            </Link>
          </li>
        </ul>
        <div className="color-con">
          <div
            className={`theme-selector${isColorPickerOpen ? " theme-selector-active" : ""}`}
          >
            <BsSunFill
              onClick={() => {
                setIsModalOpen(false);
                setIsColorPickerOpen((isOpen) => !isOpen);
              }}
              size="1.5em"
            />
          </div>
          <Zoom>
            <div
              className="color-pick"
              style={{ display: isColorPickerOpen ? "grid" : "none" }}
            >
              {colorButtons}
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
}
