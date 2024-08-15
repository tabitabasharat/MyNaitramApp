"use client";

import React, { useEffect, useState } from "react";

const GalleryPage = () => {
  const [style, setStyle] = useState({
    opacity: 0,
    transform: "translateY(20px)",
    transition: "none", // No transition initially
  });

  useEffect(() => {
    // Update the style to apply transition after mounting
    const timer = setTimeout(() => {
      setStyle({
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 1s ease-out, transform 1s ease-out", // Enable transition
      });
    }, 100);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const handleNavigation = (event:any) => {
    if (event === "NAITRAM LAUNCH PARTY") {
      window.location.href = "/gallery/naitramlaunch";
    } else if (event === "NAITRAM ROOFTOP EVENT") {
      window.location.href = "/gallery/rooftop";
    } else if (event === "THE TAKEOVER EVENT") {
      window.location.href = "/gallery/takeover";
    }
  };

  return (
    <section
      className="bg-black pt-[200px] pb-[90px] mb-[-70px] mt-0 transition-all duration-300 bg-no-repeat bg-top-center"
      style={{ backgroundImage: 'url("/Images/gallery/bgimage.png")' }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={style}
          className="flex flex-col items-center gap-5 text-center"
        >
          <h2 className="text-white font-nexa text-[40px] sm:text-[50px] lg:text-[60px] font-bold">
            NAITRAM GALLERY
          </h2>
          <p className="max-w-[90%] sm:max-w-[75%] lg:max-w-[55.53%]">
            We are not just changing the game; we’re redefining it. Born from a
            visionary idea to a revolutionary experience, we stand at the
            vanguard of the events and entertainment industry’s transformation.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 mb-10">
          {[
            "NAITRAM LAUNCH PARTY",
            "NAITRAM ROOFTOP EVENT",
            "THE TAKEOVER EVENT",
          ].map((event) => (
            <div
              key={event}
              className="group relative flex flex-col min-h-[360px] justify-center items-center gap-4 w-full sm:w-[300px] lg:w-[400px] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-no-repeat bg-center bg-contain transition-transform duration-300 group-hover:scale-110 opacity-70"
                style={{ backgroundImage: 'url("/Images/gallery/bgcard.png")' }}
              ></div>
              <h2 className="relative text-[18px] sm:text-[20px] lg:text-[24px] font-bold">
                {event}
              </h2>
              <button
                onClick={() => handleNavigation(event)}
                className="relative bg-transparent border-2 border-white text-[14px] sm:text-[16px] lg:text-[17px] h-[40px] sm:h-[48px] lg:h-[52px] w-[120px] sm:w-[140px] lg:w-[150px] font-bold"
              >
                VIEW EVENT
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
