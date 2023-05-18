import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const MainStyle = styled.div`
  padding: 20px 0 0;
  height: auto;
`;
const Main = () => {
  return (
    <MainStyle>
      <Header />
      <Outlet />
    </MainStyle>
  );
};

export default Main;
