import React, { useEffect, useState } from "react";
import ScheduleHero from "@assets/images/main/schedule-hero.png";
import { Grid } from "@mui/material";
import { Layout } from "@components/layout/Layout";
import { useTranslation } from "@helpers/translate";
import { ALERT } from "@constants";
import { useDispatch } from "react-redux";
import bgTradeImage from "@assets/images/main/bg-trade-image.png";
import FeatureCardShedule from "@assets/images/main/feature-card-shedule.jpg";
import Like from "@assets/images/icons/like.svg";
import Rectangle from "@assets/images/icons/grey-rectangle.svg";
import Logo from "@assets/images/icons/logo.svg";
import UniversityCap from "@assets/images/icons/university-cap.svg";
import YellowArrowLeft from "@assets/images/icons/yellow-arrow-left.svg";
import User from "@assets/images/icons/user.svg";
import Shield from "@assets/images/icons/shield.svg";
import Coins from "@assets/images/icons/coins.svg";
import UpShedule from "@assets/images/icons/up-shedule.svg";
import ArrowRight from "@assets/images/icons/yellow-arrow-right.svg";
import WhiteLogo from "@assets/images/main/white-logo.png";
import FeedbackSlider from "./components/FeedbackSlider";
import HeroBg from "@assets/images/bg/main-bg.png";

import "./index.sass";
import { Helmet } from "react-helmet";
import { toggleSignUpModal } from "@actions/authModalsActions";

export const Main = () => {
  const { __ } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const isBanned = sessionStorage.getItem("isBanned");

    if (isBanned) {
      dispatch({ type: ALERT.ALERT_ERROR, payload: __("common.banned") });
      sessionStorage.removeItem("isBanned");
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("dark-bg");
    return () => {
      document.body.classList?.remove("dark-bg");
    };
  }, []);

  const handleSignUpToggle = (isOpen) => {
    dispatch(toggleSignUpModal(isOpen));
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {__("seo.main_title")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <section className="hero">
        <div className="wrapper">
          <div className="hero__wrapper">
            <h1 className="hero__title">{__("main.hero.title")}</h1>
            <p className="hero__subtitle">{__("main.hero.subtitle")}</p>
            <div
              onClick={() => handleSignUpToggle(true)}
              className="hero__btn btn btn--middle btn--orange"
            >
              {__("main.hero.button")}
            </div>
          </div>
        </div>
        <div className="hero__schedule">
          <img src={HeroBg} />
        </div>
      </section>
      <section className="condition">
        <img
          src={bgTradeImage}
          alt="trade"
          className="condition__bg"
          aria-hidden="true"
        />
        <div className="wrapper">
          <header className="condition__header">
            <h2 className="condition__title section-title">
              {__("main.conditions.title")}
            </h2>
          </header>
          <Grid container spacing={2}>
            <Grid item sx={{ width: { xs: "100%", lg: "27.8%" } }}>
              <article className="condition-card">
                <h3 className="condition-card__title">$5</h3>
                <p className="condition-card__text">
                  {__("main.conditions.i-1")}
                </p>
              </article>
            </Grid>
            <Grid item sx={{ width: { xs: "100%", lg: "23.3%" } }}>
              <article className="condition-card">
                <h3 className="condition-card__title">$1</h3>
                <p className="condition-card__text">
                  {__("main.conditions.i-2")}
                </p>
              </article>
            </Grid>
            <Grid item sx={{ width: { xs: "100%", lg: "48.8%" } }}>
              <article className="condition-card condition-card--bg">
                <h3 className="condition-card__title">$10 000</h3>
                <p className="condition-card__text">
                  {__("main.conditions.i-3")}
                </p>
              </article>
            </Grid>
            <Grid item sx={{ width: { xs: "100%", lg: "19.5%" } }}>
              <article className="condition-card">
                <h3 className="condition-card__title">50+</h3>
                <p className="condition-card__text">
                  {__("main.conditions.i-4")}
                </p>
              </article>
            </Grid>
            <Grid item sx={{ width: { xs: "100%", lg: "54.1%" } }}>
              <article className="condition-card condition-card--bg">
                <h3 className="condition-card__title">0%</h3>
                <p className="condition-card__text">
                  {__("main.conditions.i-5")}
                </p>
              </article>
            </Grid>
            <Grid item sx={{ width: { xs: "100%", lg: "26.4%" } }}>
              <article className="condition-card">
                <h3 className="condition-card__title">100+</h3>
                <p className="condition-card__text">
                  {__("main.conditions.i-6")}
                </p>
              </article>
            </Grid>
          </Grid>
          <div className="feature-card-container">
            <div className="feature-card">
              <div className="feature-card__bg-blur" />
              <div className="feature-card__description">
                <div className="feature-card__imgGroup">
                  <img src={Rectangle} alt="" />
                  <img src={Logo} alt="" />
                  <img src={YellowArrowLeft} alt="" />
                </div>
                <h3 className="feature-card__title">
                  {__("main.feature-card.i-1")}
                </h3>
                <p className="feature-card__text">
                  {__("main.feature-card.i-1.text.i-1")}
                </p>
                <p className="feature-card__text">
                  {__("main.feature-card.i-1.text.i-2")}
                </p>
                <p className="feature-card__text">
                  {__("main.feature-card.i-1.text.i-3")}
                </p>
              </div>
              <div className="feature-card__shedule-container">
                <img src={FeatureCardShedule} alt="shedule" />
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__bg-blur" />
              <div className="feature-card__description">
                <div className="feature-card__imgGroup">
                  <img src={Rectangle} alt="" />
                  <img src={Logo} alt="" />
                  <img src={Like} alt="" />
                </div>
                <h3 className="feature-card__title">
                  {__("main.feature-card.i-2")}
                </h3>
                <p className="feature-card__text">
                  {__("main.feature-card.i-2.text.i-1")}
                </p>
                <p className="feature-card__text">
                  Some text about features in web app
                </p>
                <p className="feature-card__text">
                  Some text about features in web app
                </p>
              </div>
              <div className="feature-card__shedule-container">
                <img src={FeatureCardShedule} alt="shedule" />
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-card__bg-blur" />
              <div className="feature-card__description">
                <div className="feature-card__imgGroup">
                  <img src={Rectangle} alt="" />
                  <img src={Logo} alt="" />
                  <img src={UniversityCap} alt="" />
                </div>
                <h3 className="feature-card__title">
                  {__("main.feature-card.i-3")}
                </h3>
                <p className="feature-card__text">
                  {__("main.feature-card.i-3.text.i-1")}
                </p>
                <p className="feature-card__text">
                  {__("main.feature-card.i-3.text.i-2")}
                </p>
                <p className="feature-card__text">
                  Some text about features in web app
                </p>
              </div>
              <div className="feature-card__shedule-container">
                <img src={FeatureCardShedule} alt="shedule" />
              </div>
            </div>
          </div>
          <div className="start-action-container">
            <h4 className="start-action-container__title">
              {__("main.action.text")}
            </h4>
            <div
              onClick={() => handleSignUpToggle(true)}
              className="btn btn--middle btn--orange"
            >
              {__("main.conditions.button")}
            </div>
          </div>
        </div>
      </section>
      <section className="reviews-registration-section">
        <img
          src={WhiteLogo}
          className="reviews-registration-section__bg-logo"
          alt=""
        />
        <div className="wrapper">
          <div className="text-container">
            <p className="reviews-registration-section__title">
              {__("main.reviews-registration-section.title.i-1")}
            </p>
            <p className="reviews-registration-section__text">
              {" "}
              {__("main.reviews-registration-section.subtitle.i-1")}
            </p>
          </div>
        </div>
        <FeedbackSlider />
        <div className="wrapper">
          <div className="text-container">
            <p className="reviews-registration-section__title">
              {__("main.reviews-registration-section.title.i-1")}
            </p>
            <p className="reviews-registration-section__text">
              {" "}
              {__("main.reviews-registration-section.subtitle.i-2")}
            </p>
          </div>
          <div className="step-card-container">
            <div className="step-card">
              <img src={Shield} alt="" />
              <h4 className="step-card__title">
                {__("main.reviews-registration-section.step-card-i-1.title")}
              </h4>
              <p className="step-card__text">
                {__("main.reviews-registration-section.step-card-i-1.text")}
              </p>
            </div>
            <img src={ArrowRight} className="step-card-container__arrow" />
            <div className="step-card">
              <img src={Coins} alt="" />
              <h4 className="step-card__title">
                {__("main.reviews-registration-section.step-card-i-2.title")}
              </h4>
              <p className="step-card__text">
                {__("main.reviews-registration-section.step-card-i-2.text")}
              </p>
            </div>
            <img src={ArrowRight} className="step-card-container__arrow" />
            <div className="step-card">
              <img src={UpShedule} alt="" />
              <h4 className="step-card__title">
                {__("main.reviews-registration-section.step-card-i-2.title")}
              </h4>
              <p className="step-card__text">
                {__("main.reviews-registration-section.step-card-i-2.text")}
              </p>
            </div>
          </div>
          <div
            onClick={() => handleSignUpToggle(true)}
            className="btn btn--middle btn--orange btn-centered"
          >
            {__("main.reviews-registration-section.button")}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Main;
