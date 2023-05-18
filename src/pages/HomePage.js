import { HomeBanner, HomeContact, HomeFeature, HomeNewest } from "module/home";
import React from "react";
import styled from "styled-components";

const HomePageStyle = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyle>
      <HomeBanner />
      <HomeFeature />
      <HomeNewest />
      <HomeContact />
    </HomePageStyle>
  );
};

export default HomePage;
