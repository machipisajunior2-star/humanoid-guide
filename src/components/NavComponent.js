import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  BsToggles,
  BsBrightnessLowFill,
  BsJustify,
  BsSearch,
  BsXLg,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Zoom from "react-reveal/Zoom";
import Radium from "radium";
import { setColor } from "../redux/themeColor/themeColorAction";
import themeColors from "../data/theme-color-data.json";
import categoryColors from "../data/category-color.json";
import "../styling/nav.css";

function NavComponent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const colorState = useSelector((state) => state.themeColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      document.querySelector(".search-input-con").querySelector("label").focus()
      if (
        event.target !== document.querySelector(".modal") &&
        isModalOpen &&
        event.target !==
          document.querySelector(".mobile-menu").querySelector("svg") &&
        event.target !==
          document.querySelector(".mobile-menu").querySelector("path")
      ) {
        setIsModalOpen(false);
      } else if (
        isColorPickerOpen &&
        event.target !==
          document.querySelector(".theme-selector").querySelector("svg") &&
        event.target !==
          document.querySelector(".theme-selector").querySelector("path") &&
        event.target !==
          document.querySelector(".color-pick").querySelector("svg") &&
        event.target !==
          document.querySelector(".color-pick").querySelector("path")
      ) {
        setIsColorPickerOpen(false);
      } else if (
        isSearchOpen &&
        event.target !==
          document.querySelector(".search-input-con").querySelector("svg") &&
        event.target !==
          document.querySelector(".search-input-con").querySelector("label") &&
        event.target !==
          document.querySelector(".search-input-con").querySelector("input") &&
        event.target !==
          document.querySelector(".search-input-con").querySelector("button") &&
        event.target !==
          document.querySelector(".search-input-con").querySelector("path") &&
        event.target !==
          document.querySelector(".search-nav-con").querySelector("path") &&
        event.target !==
          document.querySelector(".search-nav-con").querySelector("svg") &&
        event.target !==
          document.querySelector(".search-nav-con").querySelector("button") &&
        event.target !==
          document.querySelector(".search-nav-con").querySelector("p")
      ) {
        setIsSearchOpen(false);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [isColorPickerOpen, isModalOpen, isSearchOpen]);

  const colors = themeColors;
  const colorButtons = [];
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

  let categoryColor = [categoryColors[0]];
  if (location.pathname.slice(1).split("/")[0] === "category") {
    const index = location.pathname.slice(1).indexOf("/");
    const categoryParam = location.pathname.substring(index + 1).slice(1);
    const data = categoryColors.filter(
      (color) => color.category === categoryParam,
    );
    if (data.length > 0) {
      categoryColor = data;
    }
  }

  const style = {
    backgroundColor: `${colorState.colorPalette.text === "#000000" ? "#CFCFCA" : "#404040"}`,
    ":focus": {
      border: `2px solid ${categoryColor ? categoryColor[0].color : categoryColor[0].color}`,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile_menu = document.querySelector(".mobile-menu");
      const modal = document.querySelector(".modal");
      if (isSearchOpen && window.innerWidth < 700) {
        mobile_menu.style.display = "flex";
      } else if (isSearchOpen && window.innerWidth < 950) {
        mobile_menu.style.display = "none";
      } else if (window.innerWidth < 950) {
        mobile_menu.style.display = "flex";
      } else if (window.innerWidth > 950) {
        mobile_menu.style.display = "none";
        if (isModalOpen) {
          modal.style.display = "none";
          setIsModalOpen(false)
        }
      }
    };

    document.body.addEventListener("click", handleResize);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSearchOpen, isModalOpen]);

  if (location.pathname === "/404") {
    return null;
  }

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
        <button
          className="search-nav-con"
          onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
          style={{ display: `${isSearchOpen ? "none" : "inline-flex"}` }}
        >
          <BsSearch
            size={window.innerWidth < 600 ? "0.8em" : "0.9375em"}
            color={colorState.colorPalette.text}
          />
          <p style={{ color: colorState.colorPalette.text }}>Search</p>
        </button>
        <div
          className="search-input-con"
          style={{ display: `${isSearchOpen ? "inline-flex" : "none"}` }}
        >
          <Zoom duration={500}>
            <form>
              <label style={style}>
                <BsSearch
                  size={window.innerWidth < 600 ? "0.9em" : "0.9375em"}
                  color={`${colorState.colorPalette.text === "#000000" ? "#262626" : "#d9d9d9"}`}
                />
                <input
                  id="search-field"
                  type="search"
                  placeholder="Search"
                  autoFocus
                  style={{
                    color: `${colorState.colorPalette.text === "#000000" ? "#262626" : "#d9d9d9"}`,
                  }}
                />
              </label>
            </form>
            <button
              onClick={() => {
                setIsSearchOpen(false);
              }}
            >
              <BsXLg
                size={window.innerWidth < 600 ? "1em" : "1.5em"}
                color={colorState.colorPalette.text}
              />
            </button>
          </Zoom>
        </div>
        <div
          className={`mobile-menu${isModalOpen ? " mobile-menu-active" : " mobile-menu-inactive"}`}
        >
          <BsJustify
            onClick={() => {
              setIsModalOpen((isOpen) => !isOpen);
              setIsColorPickerOpen(false);
              setIsSearchOpen(false);
            }}
            size={window.innerWidth < 600 ? "1em" : "1.1375em"}
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
        <ul
          className="desktop-menu"
          style={{ display: `${isSearchOpen ? "none" : "inline-flex"}` }}
        >
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
        <div
          className="color-con"
          style={{ display: `${isSearchOpen ? "none" : "inline-flex"}` }}
        >
          <div
            className={`theme-selector${isColorPickerOpen ? " theme-selector-active" : ""}`}
          >
            <BsToggles
              onClick={() => {
                setIsModalOpen(false);
                setIsColorPickerOpen((isOpen) => !isOpen);
                setIsSearchOpen(false);
              }}
              size={window.innerWidth < 600 ? "1em" : "1.1375em"}
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

export default Radium(NavComponent);
