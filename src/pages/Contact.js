/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser';
import "../styling/contact.css"

export default function Contact() {
  const colorState = useSelector((state) => state.themeColor.colorPalette);
  const ref = useRef(null)
  const buttonRef = useRef(null)
  
  useEffect(() => {
    ref.current?.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        buttonRef.current.innerHTML = "Sending...";

        ref.current.querySelectorAll("span")?.forEach((span) => {
            span.remove()
        })
        const serviceID = "service_2d60jxd";
        const templateID = "template_2grdtys";
        const public_key = "AKw6Y-XTag8YhNMWL";
        const inputs = ref.current?.querySelectorAll("input, textarea");

        emailjs.sendForm(serviceID, templateID, this, {
  publicKey: public_key}).then(
        () => {
            buttonRef.current.innerHTML = "Send Email";
            const newEl = document.createElement("span");
            newEl.className = "successful_form_submit"
            newEl.textContent = "Success! ✓ \n Thank You for Reaching Out";
            ref.current.appendChild(newEl)
            inputs.forEach((field) => {
              field.value = "";
            });
        },
        (err) => {
            buttonRef.current.innerHTML = "Send Email";
            const newEl = document.createElement("span");
            newEl.className = "failed_form_submit";
            newEl.textContent = err.text;
            ref.current.appendChild(newEl);
        },
        );
    });
  }, [buttonRef])

  return (
    <main className="info_section_wrapper">
      <div className="info_section_navigation">
        <header>
          <h3>Contact Me</h3>
        </header>
        <ul>
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
                color: colorState.text === "#000000" ? "#595970" : "#BFBFBF",
                "::before": {
                  paddingRight: "10px",
                  content: '"\\1F785"',
                  fontSize: "1em",
                },
                ":hover": {
                  color: colorState.text === "#000000" ? "black" : "white",
                },
              })}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
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
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <section className="info_container">
        <header>
          <h1>Contact</h1>
        </header>
        <strong>
          Get in touch to share feedback, suggest a robot or article, discuss
          collaboration, or connect about software development and humanoid
          robotics.
        </strong>
        <h2>Start a conversation</h2>
        <p>
          Humanoids is an independent guide to humanoid robots, created to make
          this fast-moving field easier to explore. The project brings together
          robot profiles, technical details, images, articles, beginner-friendly
          learning resources, and industry news in one accessible place.
          <br /> <br />
          Whether you are discovering humanoids for the first time, researching
          a specific platform, building your own robot, or working in robotics
          and software, your message is welcome.
          <br /> <br /> Use the contact form to send:
        </p>
        <ul>
          <li>
            <strong>Feedback</strong> - Report an error, suggest an improvement,
            or share your experience using the site.
          </li>
          <li>
            <strong>Robot suggestions</strong> - Recommend a humanoid robot,
            company, research platform, or important development to consider for
            inclusion.
          </li>
          <li>
            <strong>Article ideas</strong> - Suggest topics about robot
            hardware, sensors, actuators, control systems, artificial
            intelligence, programming, or getting started with a build.
          </li>
          <li>
            <strong>Collaboration enquiries</strong> - Discuss educational
            content, open-source projects, research, visual design, data
            collection, or other relevant opportunities.
          </li>
          <li>
            <strong>Professional enquiries</strong> - Learn more about the
            software development, research, information design, and technical
            communication behind the project.
          </li>
        </ul>
        <form
          ref={ref}
          style={{
            color: colorState.text,
          }}
        >
          <h2>Contact form</h2>
          <label>Name</label>
          <input
            css={css({
              backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
              "&:focus-within": {
                border: `2px solid #FF4C00`,
              },
            })}
            key="conatct_name_input"
            name="name"
            id="name_input"
            type="text"
            placeholder="Your Name"
            autoFocus
            style={{
              color: `${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`,
            }}
            required
          />
          <label>Email address</label>
          <input
            css={css({
              backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
              "&:focus-within": {
                border: `2px solid #FF4C00`,
              },
            })}
            id="email_input"
            name="email"
            type="email"
            placeholder="An address where you can receive a reply"
            style={{
              color: `${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`,
            }}
            required
          />
          <label>Subject</label>
          <input
            css={css({
              backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
              "&:focus-within": {
                border: `2px solid #FF4C00`,
              },
            })}
            name="subject"
            id="subject_input"
            type="text"
            placeholder="What would you like to discuss?"
            style={{
              color: `${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`,
            }}
            required
          />
          <label>Message</label>
          <textarea
            css={css({
              backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
              "&:focus-within": {
                border: `2px solid #FF4C00`,
              },
            })}
            id="message_input"
            name="message"
            type="text"
            placeholder="Include enough detail to make your question or suggestion easy to understand."
            style={{
              color: `${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`,
            }}
            required
          />
          <label>Optional link</label>
          <input
            css={css({
              backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
              "&:focus-within": {
                border: `2px solid #FF4C00`,
              },
            })}
            id="optional_input"
            name="optional"
            type="text"
            placeholder="Add a project, article, portfolio, repository, or profile if it helps provide context."
          />
          <input defaultValue={new Date()} name="time" hidden={true} />
          <button ref={buttonRef}>Send message</button>
        </form>
        <h2>Before you write</h2>
        <p>
          For robot profiles and technical information, please include the
          robot’s name, manufacturer, and a reliable source where possible.
          Humanoid robotics covers a wide range of systems, from bipedal
          research platforms to industrial and service robots; clear references
          help keep the guide accurate. Humanoid robots commonly combine
          human-like body structures with sensors, actuators, control systems,
          and artificial intelligence for movement, perception, and interaction.
        </p>
        <br />
        <a href="https://humanoidroboticstechnology.com/articles/humanoid-complete-guide-humanoid-robots/">
          Complete Humanoid Guide
        </a>
        <br />
        <br />
        <p>
          If you are building a robot, describing your current stage—planning,
          mechanical design, electronics, programming, balance control, or
          testing—will make your message more useful. Beginner projects often
          benefit from starting with static stability and simple movements
          before attempting dynamic walking, which is one of the most difficult
          parts of humanoid robotics.
        </p>
        <br />
        <a href="https://thinkrobotics.com/blogs/tutorials/building-a-humanoid-robot-step-by-step-engineering-guide-for-beginners">
          Building A Humanoid Robot Step by Step Engineering Guide For Beginners
        </a>
        <br />
        <br />
        <h2>Email alternative</h2>
        <p>
          Prefer email? Contact{" "}
          <a href="mailto:machipisajunior2@gmail.com">Email Me</a> and use a
          clear subject such as:
        </p>
        <ul>
          <li>Robot suggestion: [robot name]</li>
          <li>Correction: [page or topic]</li>
          <li>Article idea: [subject]</li>
          <li>Collaboration enquiry</li>
          <li>Software development opportunity</li>
        </ul>
        <p>
          Please do not send passwords, private credentials, confidential
          company information, or sensitive personal data through this form.
        </p>
        <h2>A personal learning project</h2>
        <p>
          Humanoids is built as both a public resource and a demonstration of
          software-development skills. The project focuses on presenting complex
          robotics information in a clear, searchable, and visually engaging
          way, while helping curious readers understand where to begin with
          humanoid robotics.
          <br />
          <br />
          Thank you for helping improve the guide and grow the wider
          conversation around humanoid robots.
        </p>
      </section>
    </main>
  );
}
