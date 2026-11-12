import React, { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsSearch,
} from "react-icons/bs";
import Radium from "radium";
import data from "../data/data.json";
import "../styling/search.css"
import { filterByEitherProperty, colorPicker } from "../utils"

function Search() {
  const ref = useRef(null)
      const location = useLocation();
      let navigate = useNavigate();
  const colorState = useSelector((state) => state.themeColor.colorPalette);
    const categoryColorState = useSelector((state) => state.categoryColor);
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [searchData, setSearchData] = useState(filterByEitherProperty(data, "name", "useType", query));
    const [isHumanoidActive, setIsHumanoidActive] = useState("");


   function createArticle(data, i) {
        return (
          <article
            className="humanoid_teaser"
            onMouseEnter={() => {
              setIsHumanoidActive(data.name);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsHumanoidActive("");
            }}
            onClick={(e) => {
              if (
                e.target.className !== "category-button-name" &&
                e.target.className !== "category-button"
              )
                navigate(`/product/${data.slag}`);
            }}
            key={`humanoid_teaser_${i}`}
          >
            <div
              className="teaser_content"
              key={`humanoid_content_all${i}`}
              style={{
                ":active": {
                  outline: `2px solid ${colorPicker(data.useType.toLowerCase())}`,
                  borderRadius: "25px",
                },
              }}
            >
              <div className="teaser_image_container">
                <img src={data.image[0]} alt={data.name}></img>
              </div>
              <div className="teaser_details_container">
                <div className="humanoid_name_container">
                  <b
                    key={`all_humanoid_container${i}`}
                    style={{
                      color:
                        isHumanoidActive === data.name
                          ? colorPicker(data.useType.toLowerCase())
                          : "",
                      fontSize: "2em",
                    }}
                  >
                    {isHumanoidActive === data.name ? "\u2022" : "\u25CB"}
                  </b>
                  <h2>{data.name}</h2>
                </div>
                <button
                  onClick={() =>
                    navigate(`/category/${data.useType.toLowerCase()}`)
                  }
                  key={`humanoid-button-all${i}`}
                  className="category-button"
                  style={{
                    border: `1px solid ${colorState.text}`,
                    ":hover": {
                      background: colorPicker(data.useType.toLowerCase()),
                      border: "transparent",
                    },
                  }}
                >
                  <span
                    className="category-button-name"
                    style={{
                      color: colorState.text,
                    }}
                  >
                    {data.useType}
                  </span>
                </button>
              </div>
            </div>
          </article>
        );
   }

  const style = {
    backgroundColor: `${colorState.text === "#000000" ? "#CFCFCA" : "#404040"}`,
    ":focus": {
      border: `2px solid ${categoryColorState.color ? categoryColorState.color : "#FF4C00"}`,
    },
  };
  useEffect(() => {
    ref.current.addEventListener("search", (e) => clearResults(e));
    function clearResults(e) {
      if (e.target.value === "") setSearchData([])
    }
  }, [])

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
              <label style={style}>
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
              searchData.map((humanoid, i) => createArticle(humanoid, i))
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
                      filterByEitherProperty(
                        data,
                        "name",
                        "useType",
                        "consumer",
                      ),
                    );
                    setQuery("consumer");
                  }}
                  style={{
                    color:
                      colorState.text === "#000000" ? "#262626" : "#d9d9d9",
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
                    color:
                      colorState.text === "#000000" ? "#262626" : "#d9d9d9",
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
                    color:
                      colorState.text === "#000000" ? "#262626" : "#d9d9d9",
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
                      filterByEitherProperty(
                        data,
                        "name",
                        "useType",
                        "research",
                      ),
                    );
                    setQuery("research");
                  }}
                  style={{
                    color:
                      colorState.text === "#000000" ? "#262626" : "#d9d9d9",
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

export default Radium(Search)