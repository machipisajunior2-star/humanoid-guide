/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
import { setNavigationColor } from "../redux/navigationColor/navigationColorAction";
import themeColors from "../data/theme-color-data.json";
import categoryColors from "../data/category-color.json";
import "../styling/nav.css";

function NavComponent() {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const colorState = useSelector((state) => state.themeColor.colorPalette);
  const categoryColorState = useSelector((state) => state.categoryColor);
  const navigationColorState = useSelector((state) => state.navigationColor);
  const [isCategoryButtonActive, setIsCategoryButtonActive] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.slice(1).split("/")[0] === "category") {
      const index = location.pathname.slice(1).indexOf("/");
      const categoryParam = location.pathname.substring(index + 1).slice(1);
      dispatch(setCategoryColor(categoryParam));
    } else {
      dispatch(setCategoryColor(""));
    }
    dispatch(setNavigationColor(location.pathname))
  }, [dispatch, location.pathname])

  useEffect(() => {
    const handleClick = (event) => {
      document
        .querySelector(".search-input-con")
        .querySelector("label")
        .focus();
      console.log(event.target)
      if (
        event.target !== document.querySelector(".modal") &&
        isModalOpen &&
        event.target !==
          document.querySelector(".mobile-menu").querySelector("svg") &&
        event.target !==
          document.querySelector(".mobile-menu").querySelector("path") &&
        event.target !== document.querySelector("details") &&
        event.target !== document.querySelector("summary")
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
    function handleScroll() {
      document
        .querySelector(".desktop-menu")
        .querySelector("details")
        .removeAttribute("open");
      setIsModalOpen(false);
      setIsColorPickerOpen(false);
    }

    window.addEventListener("scroll", handleScroll);
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [isColorPickerOpen, isModalOpen, isSearchOpen]);

  useEffect(() => {
    const handleResize = (event) => {
      const menu_button = document.querySelector(".mobile-menu");
      const modal = document.querySelector(".modal");
      const color_picker = document.querySelector(".color-pick");
      const theme_selector = document.querySelector(".theme-selector");

      if (window.innerWidth < 700) {
        theme_selector.style.display = "flex";
      } else if (isSearchOpen && window.innerWidth > 700) {
        if (event.type === "resize") {
          if (menu_button) menu_button.style.display = "none";
          theme_selector.style.display = "none";
        }
      } else if (window.innerWidth > 700) {
        if (theme_selector) theme_selector.style.display = "flex";
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

    function handleVisibility() {
      const modal = document.querySelector(".modal");
      setIsModalOpen(false);
      if (modal) modal.style.display = "none";
    }

    document.body.addEventListener("click", handleResize);
    window.addEventListener("blur", handleVisibility);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSearchOpen, isModalOpen, isColorPickerOpen]);

  const categories_desktop = [];
  categoryColors.forEach((category, id) => {
    categories_desktop.push(
      <li
        key={id}
        css={css({
          ":hover a::before": {
            content: `"\\2B24"`,
            color: category.color,
          },
        })}
      >
        <Link
          onClick={() => {
            const desktopMenu = document.querySelector(".desktop-menu");
            const details = desktopMenu.querySelector("details");
            if (details) {
              details.removeAttribute("open");
            }
          }}
          to={`/category/${category.category}`}
          css={css({
            color: colorState.text,
            "::before": {
              paddingRight: "10px",
              color: `${categoryColorState.category === category.category ? category.color : ""}`,
              content: `${categoryColorState.category === category.category ? `"\\2B24"` : '"\\1F785"'}`,
              fontSize: "1em",
            },
          })}
        >
          {category.category.charAt(0).toLocaleUpperCase() +
            category.category.slice(1)}
        </Link>
      </li>,
    );
  });

  const categories_mobile = [];
  categoryColors.forEach((category, id) => {
    categories_mobile.push(
      <li
        key={id}
        css={css({
          ":hover a::before": {
            content: `"\\2B24"`,
            color: category.color,
          },
        })}
      >
        <Link
          onClick={() => {
            const desktopMenu = document.querySelector(".modal");
            const details = desktopMenu.querySelector("details");
            if (details) {
              details.removeAttribute("open");
            }
          }}
          to={`/category/${category.category}`}
          css={css({
            color: colorState.text,
            "::before": {
              paddingRight: "10px",
              color: `${categoryColorState.category === category.category ? category.color : ""}`,
              content: `${categoryColorState.category === category.category ? `"\\2B24"` : '"\\1F785"'}`,
              fontSize: "1em",
            },
          })}
        >
          {category.category.charAt(0).toLocaleUpperCase() +
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
          setIsColorPickerOpen(false);
          document.querySelector(".color-pick").style.display = "none";
          if (location.pathname === "/") {
            window.location.reload();
          }
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
    backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
    ":focus": {
      border: `2px solid ${categoryColorState.color ? categoryColorState.color : "#FF4C00"}`,
    },
  };

  if (location.pathname === "/404") {
    return null;
  }

  return (
    <section className="app-navigation-con">
      <div
        className={`heading${colorState.text === "#000000" ? " black" : ""}`}
      >
        <Link to="/" key="home_page_button">
          <h1 style={{ color: colorState.text }} className={homeClass("/")}>
            HUMANOIDS
          </h1>
        </Link>
      </div>
      <div className="navigation-con">
        <button
          className="search-nav-con"
          onClick={() => {
            if (location.pathname.slice(1) !== "search")
              setIsSearchOpen((isOpen) => !isOpen);
          }}
          style={{ display: `${isSearchOpen ? "none" : "inline-flex"}` }}
        >
          <BsSearch
            size={window.innerWidth < 600 ? "0.8em" : "0.9375em"}
            color={colorState.text}
          />
          <p style={{ color: colorState.text }}>Search</p>
        </button>
        <div
          className="search-input-con"
          style={{ display: `${isSearchOpen ? "inline-flex" : "none"}` }}
        >
          <Zoom duration={500}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSearchOpen(false);
                navigate(`/search?q=${e.target[0].value}`);
              }}
            >
              <label style={style}>
                <BsSearch
                  size={window.innerWidth < 600 ? "0.9em" : "0.9375em"}
                  color={`${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`}
                />
                <input
                  id="search-field"
                  type="search"
                  placeholder="Search"
                  autoFocus
                  style={{
                    color: `${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`,
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
                color={colorState.text}
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
              color={colorState.text}
            />
          </div>
        )}

        <Zoom>
          <ul
            style={{
              display: isModalOpen ? "block" : "none",
              color: colorState.text,
              backgroundColor: colorState.background,
            }}
            className="modal"
          >
            <li
              css={css({
                ":hover a::before": {
                  content: `"\\2B24"`,
                  color: "#FF4C00",
                },
              })}
            >
              <Link
                key="humanoids_nav_button"
                to="/humanoids"
                css={css({
                  color: colorState.text,
                  "::before": {
                    paddingRight: "10px",
                    color: `${navigationColorState.navigation === "humanoids" ? "#FF4C00" : ""}`,
                    content: `${navigationColorState.navigation === "humanoids" ? `"\\2B24"` : '"\\1F785"'}`,
                    fontSize: "1em",
                  },
                })}
              >
                Humanoids
              </Link>
            </li>
            <li>
              <details
                onClick={(e) => {
                  setIsCategoryButtonActive((isActive) => !isActive);
                }}
              >
                <summary
                  style={{
                    listStyle: "none",
                  }}
                >
                  <span style={{ color: categoryColorState.color }}>
                    {isCategoryButtonActive ? "\u25BC" : "\u25B6"}
                  </span>
                  Categories
                </summary>
                <ul
                  style={{
                    background: `${colorState.background}`,
                    borderRadius: "none !important"
                  }}
                  className="categories-list"
                >
                  {categories_mobile}
                </ul>
              </details>
            </li>
            <li
              css={css({
                ":hover a::before": {
                  content: `"\\2B24"`,
                  color: "#27C3AE",
                },
              })}
            >
              <Link
                key="learn_nav_link"
                to="/learn"
                css={css({
                  color: colorState.text,
                  "::before": {
                    paddingRight: "10px",
                    color: `${navigationColorState.navigation === "learn" ? "#27C3AE" : ""}`,
                    content: `${navigationColorState.navigation === "learn" ? `"\\2B24"` : '"\\1F785"'}`,
                    fontSize: "1em",
                  },
                })}
              >
                Learn
              </Link>
            </li>
            <li
              css={css({
                ":hover a::before": {
                  content: `"\\2B24"`,
                  color: "#4096C8",
                },
              })}
            >
              <Link
                key="news_nav_link"
                to="/news"
                css={css({
                  color: colorState.text,
                  "::before": {
                    paddingRight: "10px",
                    color: `${navigationColorState.navigation === "news" ? "#4096C8" : ""}`,
                    content: `${navigationColorState.navigation === "news" ? `"\\2B24"` : '"\\1F785"'}`,
                    fontSize: "1em",
                  },
                })}
              >
                News
              </Link>
            </li>
          </ul>
        </Zoom>
        <ul
          className="desktop-menu"
          style={{
            display: `${isSearchOpen ? "none" : "inline-flex"}`,
            color: colorState.text,
          }}
        >
          <li
            css={css({
              ":hover a::before": {
                content: `"\\2B24"`,
                color: "#FF4C00",
              },
            })}
          >
            <Link
              key="humanoids_nav_desktop_link"
              to="/humanoids"
              css={css({
                color: colorState.text,
                "::before": {
                  paddingRight: "10px",
                  color: `${navigationColorState.navigation === "humanoids" ? "#FF4C00" : ""}`,
                  content: `${navigationColorState.navigation === "humanoids" ? `"\\2B24"` : '"\\1F785"'}`,
                  fontSize: "1em",
                },
              })}
            >
              Humanoids
            </Link>
          </li>
          <li>
            <details
              onClick={() => {
                setIsCategoryButtonActive((isActive) => !isActive);
              }}
            >
              <summary
                style={{
                  listStyle: "none",
                }}
              >
                <span style={{ color: categoryColorState.color }}>
                  {isCategoryButtonActive ? "\u25BC" : "\u25B6"}
                </span>
                Categories
              </summary>
              <ul
                style={{
                  background: `${colorState.background}`,
                  zIndex: "1000",
                }}
                className="categories-list"
              >
                {categories_desktop}
              </ul>
            </details>
          </li>
          <li
            css={css({
              ":hover a::before": {
                content: `"\\2B24"`,
                color: "#27C3AE",
              },
            })}
          >
            <Link
              key="learn_nav_link_desktop"
              to="/learn"
              css={css({
                color: colorState.text,
                "::before": {
                  paddingRight: "10px",
                  color: `${navigationColorState.navigation === "learn" ? "#27C3AE" : ""}`,
                  content: `${navigationColorState.navigation === "learn" ? `"\\2B24"` : '"\\1F785"'}`,
                  fontSize: "1em",
                },
              })}
            >
              Learn
            </Link>
          </li>
          <li
            css={css({
              ":hover a::before": {
                content: `"\\2B24"`,
                color: "#4096C8",
              },
            })}
          >
            <Link
              key="news_nav_link_desktop"
              to="/news"
              css={css({
                color: colorState.text,
                "::before": {
                  paddingRight: "10px",
                  color: `${navigationColorState.navigation === "news" ? "#4096C8" : ""}`,
                  content: `${navigationColorState.navigation === "news" ? `"\\2B24"` : '"\\1F785"'}`,
                  fontSize: "1em",
                },
              })}
            >
              News
            </Link>
          </li>
        </ul>
        <div
          className="color-con"
          style={{
            display: `${isSearchOpen && window.innerWidth > 700 ? "none" : "inline-flex"}`,
          }}
        >
          <div
            className={`theme-selector${isColorPickerOpen ? " theme-selector-active" : " theme-selector-inactive"}`}
          >
            <BsToggles
              onClick={() => {
                setIsModalOpen(false);
                setIsColorPickerOpen((isOpen) => !isOpen);
                setIsSearchOpen(false);
              }}
              color={colorState.text === "#000000" ? "grey" : "#d9d9d9"}
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
