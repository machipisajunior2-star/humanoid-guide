/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product/productActions";
import humanoids from "../data/data.json";
import Videos from "../components/Videos";
import EmblaCarousel from "../components/embla/EmblaCarousel";
import EmblaScroller from "../components/embla/EmblaScroller"
import { colorPicker, removeDuplicatesByProperty } from "../utils";
import "../styling/embla.css";
import "../styling/product.css";

export default function Product() {
  let navigate = useNavigate();
  let { productSlag } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.product);
  const themeColorState = useSelector((state) => state.themeColor.colorPalette);
  const humanoidData = humanoids.filter(
    (humanoid) => humanoid.slag === productSlag,
  );
  console.log(data);

  const OPTIONS = { axis: "y" };
  const SLIDES = humanoidData[0].image;
  const SCROLLER_SLIDES = data.bestFor;
  const currentDateObj = new Date(data.announcedAt);
  const year = currentDateObj.getFullYear();
  useEffect(() => {
    dispatch(fetchProduct(productSlag));
  }, [dispatch, productSlag]);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  console.log(
    data.specs?.filter(
      (spec) => spec.label?.toLowerCase() === "actuator types",
    ),
  );

  return !data || Object.keys(data).length === 0 ? (
    <h2>Loading...</h2>
  ) : data.error ? (
    <h2>{data.error}</h2>
  ) : (
    <main className="product_wrapper">
      <section className="product_details_section">
        <header>
          <h1
            className="product_name"
            style={{ color: colorPicker(data.userType.toLowerCase()) }}
          >
            {humanoidData[0].name}
          </h1>
        </header>
        <div className="product_details_container">
          <EmblaCarousel
            slides={SLIDES}
            options={OPTIONS}
            color={colorPicker(data.userType.toLowerCase())}
          />
          <div className="product_details">
            <p>{data.description}</p>
            <div className="deatils_container">
              <small>CREATOR</small>
              <a
                className="manufacturer_link"
                href={data.manufacturer.websiteUrl}
                alt={data.manufacturer.name}
              >
                {data.manufacturer.name}
                <span>&#8599;</span>
              </a>
            </div>
            <div className="deatils_container">
              <small>YEAR</small>
              <p>{year}</p>
            </div>
            <div className="deatils_container">
              <small>Country</small>
              <p>
                {regionNames.of(data.designCountryCode)}{" "}
                {data.designCountryCode}
              </p>
            </div>
            <div className="deatils_container">
              <small>Category</small>
              <button
                onClick={() =>
                  navigate(`/category/${data.userType.toLowerCase()}`)
                }
                className="category-button"
                css={css({
                  border: `1px solid ${themeColorState.text}`,
                  ":hover": {
                    background: colorPicker(data.userType.toLowerCase()),
                    border: "transparent",
                  },
                })}
              >
                <span
                  className="category-button-name"
                  style={{ color: themeColorState.text }}
                >
                  {data.userType}
                </span>
              </button>
            </div>
            <div className="deatils_container">
              <small>LOCOMOTION TYPE</small>
              <p>{data.locomotionType}</p>
            </div>
          </div>
        </div>
      </section>
      <Videos
        video_id={humanoidData[0].videos}
        color={colorPicker(data.userType.toLowerCase())}
        theme={themeColorState}
      />
      <section className="best_for_section_container">
        <header>
          <h3 style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            BEST USED FOR:
          </h3>
        </header>
        <div className="best-for_details_container">
          <div className="best_for_scroller_container">
            <EmblaScroller
              slides={SCROLLER_SLIDES}
              options={OPTIONS}
              color={colorPicker(data.userType.toLowerCase())}
            />
          </div>
          <div className="best_for_images">
            <img
              src={humanoidData[0].image?.[2]}
              alt={`best_for_image_${2}`}
              className="video_thumbnail"
            />
          </div>
        </div>
      </section>
      <section className="faq_section_container">
        <div className="faq_details_container">
          <header>
            <h3 style={{ color: colorPicker(data.userType.toLowerCase()) }}>
              FAQ & LIMITATIONS
            </h3>
          </header>
          {data.faqs?.map((faq, i) => (
            <div key={`faq_${i}`} className="faq_container">
              <span className="question">{faq.question}</span>
              <p className="answer">{faq.answer}</p>
            </div>
          ))}
          <div className="limitations_container">
            <header>
              <h4>LIMITATIONS:</h4>
            </header>
            <ul>
              {data.limitations?.map((limit, i) => (
                <li key={`limit_${i}`} className="limit">
                  {limit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="faq_images_container">
          <img
            src={humanoidData[0].image?.[1]}
            alt={`best_for_image_${1}`}
            className="video_thumbnail"
          />
          <img
            src={humanoidData[0].image?.[3]}
            alt={`best_for_image_${3}`}
            className="video_thumbnail"
          />
        </div>
      </section>
      <section className="specs_section_container">
        <header>
          <h3 style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            SPECS
          </h3>
        </header>
        <div className="pillar_container">
        <div className="specs_first_pillar">
          <span>AUTONOMY</span>
          <p>{data?.autonomyClaim || "_"}</p>
          <span>STATUS</span>
          <p>{data?.manufacturer.status || "_"}</p>
          <span>DEPLOYMENTS</span>
          <p>{data?.counts?.deployments || "_"}</p>
          <span>GENERATION</span>
          <p>{data?.generation || "_"}</p>
          <span>LIFE CYCLE STAGE</span>
          <p>{data?.lifecycleStage || "_"}</p>
          <span>YEAR</span>
          <p>{year || "_"}</p>
          <span>WEBSITE</span>
          <a
            className="manufacturer_link"
            href={data.websiteUrl}
            alt={data.manufacturer.name}
          >
            Link
            <span>&#8599;</span>
          </a>
        </div>
        <div className="specs_second_pillar">
          <span>HAND JOINT COUNT</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data?.handJointCount || "_"}
          </p>
          <span>WEIGHT</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data.specs?.filter(
              (spec) => spec.label?.toLowerCase() === "weight",
            )[0]?.statements[0].num || "_"}{" "}
            {data.specs
              ?.filter((spec) => spec.label?.toLowerCase() === "weight")[0]
              .unit?.toLowerCase()}
          </p>
          <span>HEIGHT</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data?.heightCm || "_"} cm
          </p>
          <span>RUNTIME</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data.specs?.filter(
              (spec) => spec.label?.toLowerCase() === "runtime",
            )[0]?.statements[0].num || "_"}{" "}
            {data.specs
              ?.filter((spec) => spec.label?.toLowerCase() === "runtime")[0]
              .unit?.toLowerCase()}
          </p>
          <span>WALKING SPEED</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data.specs?.filter(
              (spec) => spec.label?.toLowerCase() === "walking speed",
            )[0]?.statements[0].num || "_"}{" "}
            {data.specs
              ?.filter(
                (spec) => spec.label?.toLowerCase() === "walking speed",
              )[0]
              ?.unit?.toLowerCase()}
          </p>
          <span>MAX WALKING SPEED</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data?.maxSpeedMps || "_"} mps
          </p>
          <span>PEAK PAYLOAD</span>
          <p style={{ color: colorPicker(data.userType.toLowerCase()) }}>
            {data.specs?.filter(
              (spec) => spec.label?.toLowerCase() === "peak payload",
            )[0]?.statements[0].num || "_"}{" "}
            {data.specs
              ?.filter(
                (spec) => spec.label?.toLowerCase() === "peak payload",
              )[0]
              ?.unit?.toLowerCase()}
          </p>
        </div>
        <div className="specs_third_pillar">
          <span>SENSORS</span>
          <p>
            {data.components
              ?.filter((comp) => comp.kind.toLowerCase() === "sensor")
              ?.map((com) => `${com.componentName}, `) || "_"}
          </p>
          <span>HAND SENSORS</span>
          <p>
            {data.specs?.filter(
                (spec) => spec.label?.toLowerCase() === "hand sensors",
              ).length ? removeDuplicatesByProperty(
              data.specs?.filter(
                (spec) => spec.label?.toLowerCase() === "hand sensors",
              )[0]?.statements,
              "rawText",
            )?.map((statement) => `${statement.rawText}, `) : "_"}
          </p>
          <span>ACTUATOR TYPES</span>
          <p>
            {data.specs?.filter(
                (spec) => spec.label?.toLowerCase() === "actuator types",
              ).length ? removeDuplicatesByProperty(
              data.specs?.filter(
                (spec) => spec.label?.toLowerCase() === "actuator types",
              )[0]?.statements,
              "rawText",
            ).map((act) => `${act.rawText}, `) : "_"}
          </p>
          <span>MATERIALS</span>
          <p>
            {data.specs?.filter(
              (spec) => spec.label?.toLowerCase() === "materials",
            )[0]?.statements[0].rawText || "_"}{" "}
          </p>
        </div>
        <div className="specs_fourth_pillar">
          <span>COMPUTE</span>
          <p>
            {data.components
              ?.filter((comp) => comp.kind.toLowerCase() === "compute")
              ?.map((com) => `${com.componentName}, `) ||
              data.specs?.filter(
                (spec) => spec.label?.toLowerCase() === "compute",
              )[0]?.statements[0].rawText ||
              "_"}{" "}
          </p>
          <span>SOFTWARE</span>
          <p>
            {data.specs
              ?.filter((spec) => spec.group?.toLowerCase() === "software")
              ?.map((e) =>
                removeDuplicatesByProperty(e.statements, "rawText").map(
                  (i) => `${e.label}: ${i.rawText}, `,
                ),
              ) || "_"}{" "}
          </p>
          <span>POWER</span>
            {data.specs
              ?.filter((spec) => spec.group?.toLowerCase() === "power")
              ?.map((e, i) => <p key={`power_spec${i}`}><small>{`${e.label}:`}</small> {`${e.statements[0].rawText}`}</p>) || "_"}
          <span>COST</span>
          <p>
            ${data?.priceFromUsd || "_"}
          </p>
        </div>
        </div>
      </section>
      <section className="related_content">
        
      </section>
    </main>
  );
}
