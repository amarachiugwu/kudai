import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Body from "../common/Body";
import Login from "../../pages/Login";
import SideBar from "../common/SideBar";
import { useLocation } from 'react-router-dom';
import Signup from "../../pages/Signup";


function Layout() {
  const authenticated = false;
  const location = useLocation();

  return (
    <>
      {authenticated ? (
        <>
          <Header />
          <SideBar />
          <Body />
          <Footer />
        </>
      ) : (
        location.pathname === '/register' ? <Signup /> : <Login />
      )}
    </>
  );
}

export default Layout;
