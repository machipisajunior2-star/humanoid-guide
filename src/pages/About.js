/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowRight } from "react-icons/hi";
import "../styling/about.css"

export default function About() {
  const colorState = useSelector((state) => state.themeColor.colorPalette);
  return (
    <main className="info_section_wrapper">
      <div className="info_section_navigation">
        <header>
          <h3>About Humanoids</h3>
        </header>
        <ul>
          <li>
            <Link
              to="/about"
              css={css({
                color: colorState.text === "#000000" ? "black" : "white",
                "::before": {
                  paddingRight: "10px",
                  color: "#FF4C00",
                  content: `"\\2B24"`,
                  fontSize: "1em",
                },
              })}
            >
              About
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
                color: colorState.text === "#000000" ? "#595970" : "#BFBFBF",
                "::before": {
                  paddingRight: "10px",
                  content: '"\\1F785"',
                  fontSize: "1em",
                },
                ":hover": {
                    color: colorState.text === "#000000" ? "black" : "white"
                }
              })}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <section className="info_container">
        <header>
          <h1>About</h1>
        </header>
        <strong>
          Humanoids is an educational robotics guide and software-development
          project created to make humanoid robots easier to understand, explore,
          and build.
        </strong>
        <p>
          Learn all about humanoids, how they work, and how they are changing
          the world. <Link to="/humanoids">Explore</Link> the humanoid
          collection. Browse detailed technical specs and read the latest
          humanoid <Link to="/news">news</Link>. Get inspired by the amazing
          world of humanoids and <Link to="/learn">learn</Link> how you can get
          started in developing humanoids.
        </p>
        <p>
          Humanoids is a public learning resource for anyone interested in the
          future of robotics.
          <br />
          The project brings together clear explanations, visual references,
          technical articles, beginner-friendly guides, and news about humanoid
          robots. Its goal is to connect the ideas behind humanoid robotics with
          the practical skills needed to understand how these machines are
          designed, programmed, and controlled.
          <br />A humanoid robot generally resembles the human body, often
          combining a torso, head, arms, and legs. This form is useful because
          humanoids are designed to operate in environments built for people
          and, in some cases, interact with tools made for human use.
        </p>
        <h2>A software developer’s perspective</h2>
        <p>
          Humanoids is also a practical portfolio{" "}
          <a href="https://github.com/machipisajunior2-star/humanoids">
            project
          </a>
          , developed by{" "}
          <a href="https://github.com/machipisajunior2-star">Hamid Faris</a>, a
          web software developer student. It demonstrates how software
          development can support technical communication, information
          architecture, responsive interface design, content organization,
          visual presentation, and public-facing documentation.
          <br />
          The project reflects an interest in building useful digital
          products—not only writing code, but also researching a subject,
          explaining it clearly, and creating an experience that helps people
          learn.
        </p>
        <Link to="/contact" className="contact_link_button" css={css({
            backgroundColor: colorState.text === "#000000" ? "#CFCFCA" : "#404040",
        })}>Contact Me
                    <span>
                      <HiArrowRight />
                    </span></Link>
        <h2>Who this site is for</h2>
        <p>
          Humanoids is for beginners taking their first steps into robotics,
          developers exploring a new field, students looking for project ideas,
          professionals following the industry, and anyone curious about how
          machines may work alongside people.
          <br />
          The project is continually evolving as the field develops. Its purpose
          is simple: make humanoid robotics more understandable, more
          approachable, and easier to explore.
        </p>
        <h2>Why humanoid robots matter</h2>
        <p>
          Humanoid robots are being studied for applications including
          industrial automation, healthcare support, rehabilitation, research,
          education, entertainment, and work in human-designed environments.
          Wikipedia +1 Their potential comes from combining human-like movement
          with sensors, actuators, artificial intelligence, and control
          software.
          <br />
          At the same time, humanoid robotics remains difficult. Reliable
          walking, safe interaction, dexterous hands, energy efficiency,
          autonomy, and affordable hardware all require significant engineering.
          Humanoids is designed to present both the promise and the limitations
          of the technology rather than treating every demonstration as a
          finished product.
        </p>
      </section>
    </main>
  );
}
