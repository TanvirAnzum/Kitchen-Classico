import Aos from "aos";
import "aos/dist/aos.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { setAuth } from "../utils/setAuth";

const Layout = () => {
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setAuth(user);
    });
  }, [auth]);

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 0, easing: "ease-in-out", once: true });
  }, []);
  return (
    <PhotoProvider>
      <div className="w-full min-h-[100vh] bg-base-100" data-theme="emerald">
        <Navigation />
        <ToastContainer />
        <Outlet />
        <Footer />
      </div>
    </PhotoProvider>
  );
};

export default Layout;
