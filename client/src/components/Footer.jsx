import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-base-300 min-h-[20vh] flex flex-col items-center justify-center gap-4">
      <div className="flex item-center gap-5">
        <i className="fa-brands fa-facebook text-xl cursor-pointer"></i>
        <i className="fa-brands fa-github text-xl cursor-pointer"></i>
        <i className="fa-brands fa-twitter text-xl cursor-pointer"></i>
        <i className="fa-brands fa-linkedin text-xl cursor-pointer"></i>
      </div>
      <ul className="flex item-center gap-5 font-semibold flex-wrap text-xl">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/services">Services</Link>
      </ul>
      <p className="text-xl font-serif">Kitchen Classico &#169; 2022</p>
    </div>
  );
};

export default Footer;
