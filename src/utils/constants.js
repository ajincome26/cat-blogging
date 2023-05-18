export const path = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  BLOG: "/blog",
  CONTACT: "/contact",
  NOT_FOUND: "*",
  SLUG: "posts/:title/:id",
  DASHBOARD: "/dashboard",
  POST_ADD_NEW: "manage/add-post",
  MANAGE_POST: "manage/posts",
  UPDATE_POST: "manage/update-post",
  CATEGORY_ADD_NEW: "manage/add-category",
  MANAGE_CATEGORY: "manage/categories",
  UPDATE_CATEGORY: "manage/update-category",
  POST_OF_CATEGORY: "category/:slug",
  MANAGE_USER: "manage/user",
  USER_ADD_NEW: "manage/add-user",
  PROFILE: "manage/profile",
  UPDATE_USER: "manage/update-user",
  POST_OF_AUTHOR: "author/:slug",

  FEATURE_POST: "/feature-posts",
  NEWEST_POST: "/newest-posts",
  // DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  // SYSTEM: "/he-thong/*",
  // MANAGE_POST: "quan-ly-bai-dang",
};

export const theme = {
  primary: "#2c3e50",
  secondary: "#4ca1af",
  third: "#f14666",
  fourth: "#f3edff",
  gray: "#e0e7f0",
  grayDark: "#395e71",
  grayField: "#ccd0d7",
  greenBold: "#14532d",
  greenNomal: "#4ade80",
};

export const listStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECT: 3,
};
export const listStatusCate = {
  APPROVED: 1,
  UNAPPROVED: 2,
};
export const userStatus = {
  ACTIVE: 1,
  PENDING: 2,
  BAN: 3,
};
export const userRole = {
  ADMIN: 1,
  MOD: 2,
  USER: 3,
};

export const formatDateV1 = (createdAt = 1683985101) => {
  const creation = new Date(createdAt.seconds * 1000);
  const date = creation.toDateString();
  const dateArr = date.split(" ");
  if (dateArr[2]?.slice(0, -1) === "0") {
    dateArr[2] = dateArr[2].slice(1);
  }
  return `${dateArr[1]} ${dateArr[2]}`;
};

export const formatDateV2 = (seconds = 1683985101) => {
  const creation = new Date(seconds * 1000);
  const date = creation.toLocaleDateString("vi-VI");
  const dataArr = date.split("/");
  const result = `${dataArr[0]} ${creation.toLocaleDateString("en-US", {
    month: "short",
  })} ${dataArr[2]}`;
  return result;
};
