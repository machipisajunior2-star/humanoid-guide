/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import logos from "../data/logos.json";
import "../styling/footer.css";

export default function Footer() {
  const location = useLocation();
  const colorState = useSelector((state) => state.themeColor.colorPalette);
  if (location.pathname === "/404") {
    return null;
  }
  return (
    <section className="footer_section_wrapper">
      <div className="humanoid_companies_container">
        <small
          style={{
            color: colorState.text === "#000000" ? "#6C6C6B" : "#BFBFBF",
          }}
        >
          RELATED COMPANIES THAT PRODUCE HUMADOIDS
        </small>
        <div className="marquee fadeout-horizontal">
          <div className="marquee-track">
            {logos.map((logo, i) => (
              <a
                href={logo.company_url}
                key={`company_logo_${i + 1}`}
                className="marquee-item"
                style={{ "--item-position": i + 1 }}
              >
                <img
                  className="company_logo_img"
                  src={logo.logo_url}
                  alt={logo.company_name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="app-navigation-con foot_nav_con">
        <div
          className={`heading${colorState.text === "#000000" ? " black" : ""}`}
        >
          <Link to="/" key="home_page_button">
            <h1 style={{ color: colorState.text }}>HUMANOIDS</h1>
            <small
              style={{
                color: colorState.text === "#000000" ? "#6C6C6B" : "#BFBFBF",
              }}
            >
              CREATED BY <br />
              HAMID MURAMBIWA
            </small>
          </Link>
        </div>
        <ul
          className="footer_nav_link_container"
          style={{
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
              to="/about"
              css={css({
                color: colorState.text,
                "::before": {
                  paddingRight: "10px",
                  content: '"\\1F785"',
                  fontSize: "1em",
                },
              })}
            >
              ABOUT
            </Link>
          </li>
          <li
            css={css({
              ":hover a::before": {
                content: `"\\2B24"`,
                color: "#FF4C00",
              },
            })}
          >
            <Link
              to="/contact"
              css={css({
                color: colorState.text,
                "::before": {
                  paddingRight: "10px",
                  content: '"\\1F785"',
                  fontSize: "1em",
                },
              })}
            >
              CONTACT
            </Link>
          </li>
          <li>
            <a
              href="https://facebook.com/hamid.faris3"
              className="footer_nav_link"
            >
              <FaFacebookF color={colorState.text} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/machipisajunior2-star"
              className="footer_nav_link"
            >
              <FaGithub color={colorState.text} />
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}
