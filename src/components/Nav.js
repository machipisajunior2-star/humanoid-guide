import React from "react";
import { useLocation, Link } from "react-router-dom"
import "../styling/nav.css"


export default function Nav() {
    const location = useLocation();
    if (location.pathname === '/404') {
        return null
    }
    const homeClass = (path) =>
      `${location.pathname === path ? "home_heading" : ""}`;
    const categoryClass = (path, category) =>
      `${location.pathname === path ? `${category}_current_page` : `${category}_nav`}`;
    return (
      <section className="app-navigation-con">
        <div className="heading">
          <Link to="/">
            <h1 className={homeClass("/")}>HUMANOIDS</h1>
          </Link>
        </div>
        <div className="navigation-con">
          <ul>
            <li className={categoryClass("/category/consumer", "consumer")}>
              <Link to="/category/consumer">Consumer</Link>
            </li>
            <li className={categoryClass("/category/research", "research")}>
              <Link to="/category/research">Research</Link>
            </li>
            <li className={categoryClass("/category/education", "education")}>
              <Link to="/category/education">Education</Link>
            </li>
            <li className={categoryClass("/category/professional", "professional")}>
              <Link to="/category/professional">Professional</Link>
            </li>
          </ul>
        </div>
      </section>
    );
}