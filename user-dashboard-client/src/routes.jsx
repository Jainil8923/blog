import { Routes, Route } from "react-router";
import Home from "./pages/home";
import SigninPage from "./pages/auth/signinpage";
import RootLayoutPage from "./pages/layout/rootlayoutpage";
import CardlistPage from "./pages/user/cardlistpage";
import TablelistPage from "./pages/user/tablelistpage";
import ProfilePage from "./pages/user/profilepage";
import SignupPage from "./pages/auth/signuppage";
import Bloglistpage from "./pages/blog/bloglistpage";

export const routes = () => {
  const getTokenAndUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    const userId = JSON.parse(atob(token.split('.')[1])).userId;
    return userId;
  };

  return (
    <Routes>
      <Route path="/" element={<RootLayoutPage />}>
      <Route path="/blogs">
        <Route index element={<Bloglistpage />}></Route>
      </Route>
        <Route index element={<Home />}></Route>
        <Route path="users">
          <Route path="cardlist" element={<CardlistPage />}></Route>
          <Route path="tablelist" element={<TablelistPage />}></Route>
        </Route>
        <Route path="user">
          <Route
            path="profile"
            element={<ProfilePage userId={getTokenAndUserId()} />}
          ></Route>
        </Route>
      </Route>
      <Route path="/auth">
        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
      </Route>
      
    </Routes>
  );
};
