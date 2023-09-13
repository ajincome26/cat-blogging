import PostAddNew from "module/post/PostAddNew";
import Main from "components/layout/Main";
import { Routes, Route } from "react-router-dom";
import { path } from "utils/constants";
import { AuthProvider } from "contexts/auth-context";
import {
  AuthorPage,
  BlogPage,
  CategoryPage,
  ContactPage,
  DashboardPage,
  FeaturePage,
  HomePage,
  NewestPage,
  NotFoundPage,
  PostDetailsPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from "pages";
import {
  CategoryAddNew,
  CategoryManage,
  CategoryUpdate,
} from "module/category";
import { UserAddNew, UserManage } from "module/user";
import UserUpdate from "module/user/UserUpdate";
import { PostManage, PostUpdate } from "module/post";
import { lazy, Suspense } from "react";

const DashboardLayout = lazy(() => import("module/dashboard/DashboardLayout"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path={path.SIGN_UP} element={<SignUpPage />}></Route>
            <Route path={path.SIGN_IN} element={<SignInPage />}></Route>
            <Route element={<Main />}>
              <Route path={path.HOME} element={<HomePage />}></Route>
              <Route path={path.BLOG} element={<BlogPage />}></Route>
              <Route path={path.CONTACT} element={<ContactPage />}></Route>
              <Route path={path.SLUG} element={<PostDetailsPage />}></Route>
              <Route path={path.FEATURE_POST} element={<FeaturePage />}></Route>
              <Route path={path.NEWEST_POST} element={<NewestPage />}></Route>
              <Route
                path={path.POST_OF_CATEGORY}
                element={<CategoryPage />}
              ></Route>
              <Route
                path={path.POST_OF_AUTHOR}
                element={<AuthorPage />}
              ></Route>
            </Route>
            <Route path={path.NOT_FOUND} element={<NotFoundPage />}></Route>
            <Route element={<DashboardLayout />}>
              <Route path={path.DASHBOARD} element={<DashboardPage />}></Route>
              <Route path={path.POST_ADD_NEW} element={<PostAddNew />}></Route>
              <Route path={path.MANAGE_POST} element={<PostManage />}></Route>
              <Route path={path.UPDATE_POST} element={<PostUpdate />}></Route>
              <Route
                path={path.MANAGE_CATEGORY}
                element={<CategoryManage />}
              ></Route>
              <Route
                path={path.CATEGORY_ADD_NEW}
                element={<CategoryAddNew />}
              ></Route>
              <Route
                path={path.UPDATE_CATEGORY}
                element={<CategoryUpdate />}
              ></Route>
              <Route path={path.MANAGE_USER} element={<UserManage />}></Route>
              <Route path={path.USER_ADD_NEW} element={<UserAddNew />}></Route>
              <Route path={path.UPDATE_USER} element={<UserUpdate />}></Route>
              <Route path={path.PROFILE} element={<ProfilePage />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
