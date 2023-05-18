import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { PostImage } from "module/post";
import React from "react";
import styled from "styled-components";

const DashboardHeaderStyle = styled.div`
  width: 100%;
  min-height: 70px;
  padding: 15px 25px;
  border-bottom: 1px solid #4ca1af;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  .dashboard-avatar {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyle className="dashboard-header">
      <Button
        to="/manage/add-post"
        width="150px"
        height="48px"
        size="14px"
        padding="12px 30px"
      >
        New Post
      </Button>
      <PostImage
        to={`/manage/profile`}
        src={
          userInfo.avatar ||
          "https://us.123rf.com/450wm/tanyadanuta/tanyadanuta1910/tanyadanuta191000003/148019275-hand-drawn-modern-man-avatar-profile-icon-or-portrait-icon-user-flat-avatar-icon-sign-profile.jpg?ver=6"
        }
        className="dashboard-avatar"
        overlayNone
      />
    </DashboardHeaderStyle>
  );
};

export default DashboardHeader;
