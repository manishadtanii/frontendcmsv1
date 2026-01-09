import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WhatWeProvide = ({ data }) => {
  if (!data) return null;
  console.log("WhatWeProvide data:", data);
  const { title, para, tagsLeft, tagsRight } = data;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Slick settings (continuous scroll)
  const marqueeSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1, // very fast continuous scroll (ms delay between auto scrolls)
    speed: 5000, // duration of one full scroll
    cssEase: "linear",
    pauseOnHover: false,
    variableWidth: true,
    slidesToScroll: 1,
    slidesToShow: 1, // since variableWidth true, better to set to 1
  };

  const reverseMarqueeSettings = {
    ...marqueeSettings,
    rtl: true,
  };

  return (
    <div className="bg-grad py-[50px] md:py-[100px] overflow-hidden text-white relative">
      <div className="image-top absolute top-0 left-0 w-60 h-60">
        <img src="/icon-half.png" alt="Featured 1" />
      </div>

      <div className="image-bottom absolute right-0 -rotate-180 bottom-0 w-60 h-60">
        <img src="/icon-half.png" alt="Featured 3" />
      </div>
      <div className="text-center mb-10 px-5">
        <motion.h2
          className="text-h2 font-parkinsans"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          {title ? title : "What We Provide"}
        </motion.h2>

        <motion.p
          className="mt-4 text-base font-manrope md:text-xl max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={1}
        >
          {para}
        </motion.p>
      </div>

      {/* First line (scroll left to right) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        custom={2}
      >
        <Slider {...marqueeSettings}>
          {[...tagsLeft, ...tagsRight].map((service, index) => (
            <div key={index} className="px-2">
              <motion.div
                className="flex items-center gap-2 bg-white bg-opacity-10 px-10 py-5 rounded-2xl text-white whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {/* <img src={service.icon} className="w-5" alt="" /> */}
                <span className="capitalize">{service.text}</span>
              </motion.div>
            </div>
          ))}
        </Slider>
      </motion.div>

      {/* Second line (reverse direction) */}
      <motion.div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        custom={3}
      >
        <Slider {...reverseMarqueeSettings}>
          {[...tagsRight, ...tagsLeft].map((service, index) => (
            <div key={index} className="px-2">
              <motion.div
                className="flex items-center gap-2 bg-white bg-opacity-10 px-10 py-5 rounded-2xl text-white whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {/* <img src={service.icon} className="w-5" alt="" /> */}
                <span className="capitalize">{service.text}</span>
              </motion.div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
};

export default WhatWeProvide;
