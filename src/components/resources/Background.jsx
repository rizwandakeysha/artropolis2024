import React from "react";
import colorfullDesktop from "../../src2/resources/colorfulbg2.png";
import colorfullMobile from "../../src2/resources/phone.png";
import { useMediaQuery } from "react-responsive";

const Background = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className="
        absolute inset-0 w-full h-full
        bg-top bg-repeat-y bg-contain md:bg-cover
      "
      style={{
        backgroundImage: `url(${isMobile ? colorfullMobile : colorfullDesktop})`,
      }}
    />
  );
};

export default Background;
