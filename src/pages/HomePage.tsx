import React from "react";
import Carousel from "../components/carousel/Carousel";
import PopularSlide from "../components/popularSlides/PopularSlide";

const HomePage = () => {
  return (
    <div>
      <PopularSlide />
      <Carousel />
    </div>
  );
};

export default HomePage;
