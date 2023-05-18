import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthenPageStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    color: ${(props) => props.theme.secondary};
    font-weight: 600;
    text-align: center;
    margin: 10px 0 20px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .swap-account {
    color: ${(props) => props.theme.primary};
    text-align: center;
    margin-top: 20px;
    font-weight: 500;
    font-size: 15px;
  }
  .swap-link {
    color: ${(props) => props.theme.secondary};
    font-weight: 600;
    margin-left: 8px;
  }
`;

const AuthenPage = ({ children }) => {
  return (
    <AuthenPageStyle>
      <div className="container">
        <Link to="/">
          <img srcSet="/logo-128.png" alt="cat-blogging" className="logo" />
        </Link>
        <h1 className="heading">Cat Blogging</h1>
      </div>
      {children}
    </AuthenPageStyle>
  );
};

export default AuthenPage;
