import { useAuth } from "contexts/auth-context";
import NotFoundPage from "pages/NotFoundPage";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardLayoutStyle = styled.div`
  background-color: ${(props) => props.theme.gray};
  overflow-x: auto;
  min-height: 100vh;
  .dashboard {
    &-content {
      display: block;
    }
  }
  @media (min-width: 375px) {
    .dashboard {
      &-content {
        display: block;
      }
    }
  }
  @media (min-width: 768px) {
    .dashboard {
      &-content {
        display: block;
      }
    }
  }
  @media (min-width: 1280px) {
    .dashboard {
      &-content {
        display: flex;
      }
    }
  }
`;

const DashboardLayout = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <NotFoundPage />;
  return (
    <DashboardLayoutStyle className="dashboard">
      <DashboardHeader />
      <div className="dashboard-content">
        <Sidebar />
        <div className="w-full p-5 overflow-x-auto md:py-7 md:px-3 xl:p-5">
          <Outlet />
        </div>
      </div>
    </DashboardLayoutStyle>
  );
};

export default DashboardLayout;
