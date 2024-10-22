import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

import { heroVideo, smallHeroVideo } from "../utils";
import { useRef, useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return window.removeEventListener("resize", handleVideoSrcSet);
  }, []);

  useGSAP(() => {
    gsap.from("#title", {
      opacity: 0,
      delay: 1.5,
      y: -50,
    });

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 1.5,
    });
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {};

    const handleEnded = () => {
      video.currentTime = 2.3;
      video.play();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleScroll = () => {
    const section = document.getElementById("highlights");
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: section,
        offsetY: -120,
        ease: "easeInOut",
      },
    });
  };

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p
          id="title"
          className="font-semibold text-3xl text-gray-100 max-md:mb-10"
        >
          iPhone 16 Pro
        </p>

        <div id="video" className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            ref={videoRef}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <button
          onClick={handleScroll}
          className="btn transition-all duration-300"
        >
          Explore now
        </button>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
