import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import { fetchNews } from "../redux/news/newsActions";
import NewsComponent from "../components/NewsComponent";
import "../styling/news.css";

function News() {
  const loading = useSelector((state) => state.news.loading);
  const newsData = useSelector((state) => state.news?.news?.news ?? null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews("Humanoid Robotics", 20));
  }, [dispatch]);

  return (
    <main className="news_wrapper">
      <header>
        <h1 id="news_title" className="article_title">
          Humanoid News
        </h1>
      </header>
      <section className="news_container">
        {newsData ? (
          newsData.map((data, i) => <NewsComponent data={data} i={i} />)
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
