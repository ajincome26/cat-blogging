import { ButtonDiv } from "components/button";
import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo-256.png";

const NotFoundPageStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .desc {
    font-size: 20px;
    font-weight: 500;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyle>
      <img srcSet={logo} alt="logo" />
      <h1 className="desc">Oops ! Page Not Found</h1>
      <ButtonDiv>Back to home</ButtonDiv>
    </NotFoundPageStyle>
  );
};

export default NotFoundPage;
