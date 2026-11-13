/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import { fetchNews } from "../redux/news/newsActions";
import "../styling/news.css"

function News() {
  const error = useSelector((state) => state.news.error);
  const loading = useSelector((state) => state.news.loading)
  const newsData = useSelector((state) => state.news?.news?.news ?? null);
  console.log(error)
  const themeColorState = useSelector(
    (state) => state.themeColor.colorPalette.text,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  function createNews(data, i) {
    const monthsArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDateObj = new Date(data.published);
    const day = currentDateObj.getDate();
    const month = monthsArr[currentDateObj.getMonth()];
    const year = currentDateObj.getFullYear();

    return (
      <div className="news_link_container" key={`news_article_${i}`}>
        <a
          href={data.url}
          css={css({
            ":hover .news_details_container h1::before": {
              content: `"\\2B24"`,
              color: "#4096C8",
            },
          })}
        >
          <div className="news_details_container">
            <div className="image_container">
              {data.image ? (
                <img
                  className="news_image"
                  src={data.image}
                  alt={data.author}
                />
              ) : (
                ""
              )}
            </div>
            <header>
              <h1
                css={css({
                  color: themeColorState.text,
                  "::before": {
                    paddingRight: "10px",
                    content: '"\\1F785"',
                    fontSize: "1em",
                  },
                })}
              >
                {data.title}
              </h1>
            </header>
            <p>{data.description}</p>
            <div className="date">
              <small>{`${day} ${month} ${year}`}</small>
            </div>
          </div>
        </a>
      </div>
    );
  }
  return (
    <main className="news_wrapper">
      <header>
        <h1 id="news_title" className="article_title">
          Humanoid News
        </h1>
      </header>
      <section className="news_container">
        {newsData ? (
          newsData.map((data, i) => createNews(data, i))
        ) : loading ? (
          <ThreeCircles
            height="80"
            width="80"
            color="#4096C8"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass="loader-wrapper-class"
            visible={true}
          />
        ) : (
          <h2>No news today. Please try again later.</h2>
        )}
      </section>
    </main>
  );
}

export default News;
