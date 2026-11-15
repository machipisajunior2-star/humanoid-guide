/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useSelector } from "react-redux";

export default function NewsComponent(props) {
  const themeColorState = useSelector(
    (state) => state.themeColor.colorPalette.text,
  );
  const { data, i } = props;
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
              <img className="news_image" src={data.image} alt={data.author} />
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
