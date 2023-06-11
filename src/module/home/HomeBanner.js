import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyle = styled.div`
  .banner {
    margin-top: 20px;
    padding: 10px;
    color: white;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    &-left,
    &-right {
      height: 520px;
      flex-basis: 50%;
    }
    &-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-image {
      width: 100%;
      height: 100%;
    }
    &-content {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 30px;
    }
    &-title {
      letter-spacing: 2px;
      font-size: 25px;
    }
    &-desc {
      font-weight: 200;
      margin-bottom: 10px;
      line-height: 1.75;
      margin-bottom: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
  }
  @media only screen and (min-width: 375px) {
    .banner {
      padding: 40px;
      gap: 1rem;
      &-title {
        letter-spacing: 2px;
        font-size: 40px;
      }
      &-content {
        gap: 1rem;
      }
    }
    .button {
      margin-bottom: 10px;
    }
  }
  @media only screen and (min-width: 768px) {
    .banner {
      flex-direction: row;
      height: 400px;
      &-left,
      &-right {
        height: 300px;
      }
    }
  }
  @media only screen and (min-width: 1280px) {
    .banner {
      flex-direction: row;
      height: 600px;
      &-desc {
        display: inline-block;
      }
      &-content {
        text-align: left;
        gap: 1rem;
      }
      &-left,
      &-right {
        height: 520px;
      }
    }
    .button {
      margin: 0;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyle>
      <div className="banner">
        <div className="banner-left">
          <div className="banner-content">
            <h1 className="banner-title">Cat Blogging</h1>
            <p className="banner-desc">
              The Entertainment and Sports Programming Network is an American
              international basic cable sports channel owned by The Walt Disney
              Company and Hearst Communications through the joint venture ESPN
              Inc. The company was founded in 1979 by Bill Rasmussen and Ed
              Eagan along with his son Scott Rasmussen.
            </p>
          </div>
          <div className="button">
            <Button
              width="170px"
              height="50px"
              padding="12px 30px"
              size="14px"
              bgColor="#f14666"
              bgHover
              to="/sign-up"
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="banner-right">
          <img
            srcSet="./banner-svg.svg"
            alt="banner"
            className="banner-image"
          />
        </div>
      </div>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
