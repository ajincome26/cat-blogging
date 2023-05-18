import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyle = styled.div`
  .banner {
    margin-top: 20px;
    height: 600px;
    padding: 40px;
    color: white;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    display: flex;
    gap: 4rem;
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
      gap: 2rem;
      margin-bottom: 30px;
    }
    &-title {
      letter-spacing: 2px;
      font-size: 40px;
    }
    &-desc {
      font-weight: 200;
      margin-bottom: 10px;
      line-height: 1.75;
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              eos dolor asperiores quam, magni beatae quae temporibus animi
              quasi eligendi deserunt ratione quidem doloremque voluptate dicta
              ipsa nam excepturi suscipit?
            </p>
          </div>
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
