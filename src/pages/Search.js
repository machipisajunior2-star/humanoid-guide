/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import HumanoidComponent from "../components/HumanoidComponent";
import data from "../data/data.json";
import { filterByEitherProperty } from "../utils";
import "../styling/search.css";

function Search() {
  const ref = useRef(null);
  const location = useLocation();
  let navigate = useNavigate();
  const colorState = useSelector((state) => state.themeColor.colorPalette);
  const categoryColorState = useSelector((state) => state.categoryColor);
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchData, setSearchData] = useState(
    filterByEitherProperty(data, "name", "useType", query),
  );

  useEffect(() => {
    ref.current.addEventListener("search", (e) => clearResults(e));
    function clearResults(e) {
      if (e.target.value === "") setSearchData([]);
    }
  }, []);

  return (
    <main className="category_page_wrapper">
      <section className="category_page_container" id="search_page_container">
        <div className="search-input-con" id="search_on_page">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${e.target[0].value}`);
            }}
          >
            <label
              css={css({
                backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
                "&:focus-within": {
                  border: `2px solid ${categoryColorState.color ? categoryColorState.color : "#FF4C00"}`,
                },
              })}
            >
              <BsSearch
                size={window.innerWidth < 600 ? "0.9em" : "1.5375em"}
                color={`${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`}
              />
              <input
                id="search-field"
                type="search"
                placeholder="Search"
                value={query}
                ref={ref}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchData(
                    filterByEitherProperty(
                      data,
                      "name",
                      "useType",
                      e.target.value,
                    ),
                  );
                }}
                autoFocus
                style={{
                  color: `${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`,
                }}
                required
              />
            </label>
          </form>
        </div>
        <div className="data_container">
          {searchData.length > 0 ? (
            searchData.map((humanoid, i) => (
              <HumanoidComponent data={humanoid} i={i} />
            ))
          ) : (
            <div className="suggestions_conatiner">
              <p>
                Enter a search query and press enter or hit the search button.
                Or, try one of these:
              </p>
              <Link
                to="/search?q=consumer"
                onClick={() => {
                  setSearchData(
                    filterByEitherProperty(data, "name", "useType", "consumer"),
                  );
                  setQuery("consumer");
                }}
                style={{
                  color: colorState.text === "#000000" ? "#262626" : "#d9d9d9",
                }}
              >
                <BsSearch
                  size={window.innerWidth < 600 ? "0.8em" : "0.9em"}
                  color={`${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`}
                />
                Consumer Humanoids
              </Link>
              <Link
                to="/search?q=professional"
                onClick={() => {
                  setSearchData(
                    filterByEitherProperty(
                      data,
                      "name",
                      "useType",
                      "professional",
                    ),
                  );
                  setQuery("professional");
                }}
                style={{
                  color: colorState.text === "#000000" ? "#262626" : "#d9d9d9",
                }}
              >
                <BsSearch
                  size={window.innerWidth < 600 ? "0.8em" : "0.9em"}
                  color={`${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`}
                />
                Professional Humanoids
              </Link>
              <Link
                to="/search?q=education"
                onClick={() => {
                  setSearchData(
                    filterByEitherProperty(
                      data,
                      "name",
                      "useType",
                      "education",
                    ),
                  );
                  setQuery("education");
                }}
                style={{
                  color: colorState.text === "#000000" ? "#262626" : "#d9d9d9",
                }}
              >
                <BsSearch
                  size={window.innerWidth < 600 ? "0.8em" : "0.9em"}
                  color={`${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`}
                />
                Education Humanoids
              </Link>
              <Link
                to="/search?q=research"
                onClick={() => {
                  setSearchData(
                    filterByEitherProperty(data, "name", "useType", "research"),
                  );
                  setQuery("research");
                }}
                style={{
                  color: colorState.text === "#000000" ? "#262626" : "#d9d9d9",
                }}
              >
                <BsSearch
                  size={window.innerWidth < 600 ? "0.8em" : "0.9em"}
                  color={`${colorState.text === "#000000" ? "#262626" : "#d9d9d9"}`}
                />
                Research Humanoids
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
