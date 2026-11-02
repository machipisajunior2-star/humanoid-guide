import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
import { setCategoryColor } from "../redux/categoryColor/categoryColorAction";
import themeColors from "../data/theme-color-data.json";
import categoryColors from "../data/category-color.json";
import "../styling/nav.css";

function NavComponent() {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const colorState = useSelector((state) => state.themeColor);
  const categoryColorState = useSelector((state) => state.categoryColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      document
        .querySelector(".search-input-con")
        .querySelector("label")
        .focus();
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

  
  useEffect(() => {
    const handleResize = (event) => {
      const modal = document.querySelector(".modal");
      const color_picker = document.querySelector(".color-pick");
      const theme_selector = document.querySelector(".theme-selector");

      if (isSearchOpen && window.innerWidth < 700) {
        theme_selector.style.display = "flex";
        if (event.type === "resize") {
          theme_selector.style.display = "flex";
          color_picker.style.display = "none";
          setIsColorPickerOpen(false);
        }
      } else if (window.innerWidth < 700) {
        theme_selector.style.display = "flex";
      } else if (isSearchOpen && window.innerWidth > 700) {
        if (event.type === "resize") {
          theme_selector.style.display = "none";
        }
      } else if (window.innerWidth > 700) {
        if (theme_selector) theme_selector.style.display = "flex";
      } else if (isSearchOpen && window.innerWidth < 950) {
        color_picker.style.display = "none";
      } else if (window.innerWidth < 950) {
        if ((isModalOpen || isColorPickerOpen) && event.type === "resize") {
          if (isModalOpen && event.type === "resize") {
            modal.style.display = "none";
            setIsModalOpen(false);
          } else {
            color_picker.style.display = "none";
            setIsColorPickerOpen(false);
          }
        }
      } else if (window.innerWidth > 950) {
        if (modal) modal.style.display = "none";
        theme_selector.style.display = "flex";
        if (isModalOpen) {
          modal.style.display = "none";
          setIsModalOpen(false);
        } else if (isColorPickerOpen && event.type === "resize") {
          color_picker.style.display = "none";
          setIsColorPickerOpen(false);
        }
      }
    };

    function handleVisibility () {
      const modal = document.querySelector(".modal");
      setIsModalOpen(false);
      if (modal) modal.style.display = "none";
    } 

    document.body.addEventListener("click", handleResize);
    window.addEventListener("blur", handleVisibility);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSearchOpen, isModalOpen, isColorPickerOpen]);


  const categories_desktop = []
  categoryColors.forEach((category, id) => {
    categories_desktop.push(
      <li
      key={id}
        className={
        `${categoryColorState.category === category.category ? 
        `${category.category}_current_page` : 
        `${category.category}_nav`}${colorState.colorPalette.text === "#000000" ? " black" : ""}`
        }
      >
        <Link
          onClick={dispatch(setCategoryColor(location.pathname))}
          style={{ color: colorState.colorPalette.text }}
          to={`/category/${category.category}`}
        >
          {category.category === "all_humanoids" ? "All" : (category.category.charAt(0).toLocaleUpperCase() + category.category.slice(1))}
        </Link>
      </li>,
    );
  })

  const categories_mobile = [];
  categoryColors.forEach((category, id) => {
    categories_mobile.push(
      <li
        key={id}
        className={`${categoryColorState.category === category.category ? `${category.category}_current_page` : `${category.category}_nav`}${colorState.colorPalette.text === "#000000" ? " black" : ""}`}
      >
        <Link
          onClick={() => setIsModalOpen(false)}
          style={{ color: colorState.colorPalette.text }}
          to={`/category/${category.category}`}
        >
          {category.category === "all_humanoids"
            ? "All"
            : category.category.charAt(0).toLocaleUpperCase() +
              category.category.slice(1)}
        </Link>
      </li>,
    );
  });

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

  const style = {
    backgroundColor: `${colorState.colorPalette.text === "#000000" ? "#CFCFCA" : "#404040"}`,
    ":focus": {
      border: `2px solid ${categoryColorState.color ? categoryColorState.color : categoryColors[0].color}`,
    },
  };

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search?q=${e.target[0].value}`);
              }}
            >
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
                  required
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
        {((!isSearchOpen && window.innerWidth < 950) ||
          window.innerWidth < 700) && (
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
        )}

        <Zoom>
          <ul
            style={{
              display: isModalOpen ? "block" : "none",
              backgroundColor: colorState.colorPalette.background,
            }}
            className="modal"
          >
            {categories_mobile}
          </ul>
        </Zoom>
        <ul
          className="desktop-menu"
          style={{ display: `${isSearchOpen ? "none" : "inline-flex"}` }}
        >
          {categories_desktop}
        </ul>
        <div
          className="color-con"
          style={{
            display: `${isSearchOpen && window.innerWidth > 700 ? "none" : "inline-flex"}`,
          }}
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
              color={
                colorState.colorPalette.text === "#000000" ? "grey" : "#d9d9d9"
              }
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
