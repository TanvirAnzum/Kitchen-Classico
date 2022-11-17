import React from "react";
import { Helmet } from "react-helmet-async";
import Carousel from "../components/homepage/Carousel";
import ServicesDisplay from "../components/homepage/ServicesDisplay";
import Tags from "../components/homepage/Tags";
import WhyChooseUs from "../components/homepage/WhyChooseUs";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Kitchen Classico Home</title>
      </Helmet>
      <Carousel />
      <Tags />
      <ServicesDisplay isHomepage={true} limit={3} />
      <WhyChooseUs />
    </>
  );
};

export default HomePage;
