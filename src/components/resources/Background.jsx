import React from "react";
import colorfull from "../../src2/resources/colorfulbg2.png";

const Background = () => {
    return (
      <div
        className="
          absolute inset-0 w-full h-full
          bg-top bg-repeat-y bg-contain md:bg-cover
        "
        style={{
          backgroundImage: `url(${colorfull})`,
        }}
      />
    );
  };

export default Background;
