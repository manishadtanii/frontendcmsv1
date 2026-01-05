import React from "react";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const centerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function ServiceHero({ data }) {
  
  if (!data) return null;
  console.log(data);
  // console.log("ServiceHero data:", data);
  const {Imagetop, Imagebottom,  centerContent} = data;
  const {heading, description,  cta, } = centerContent;
  console.log("ServiceHero data:", centerContent);
  return (
    <div className="service-hero">
      <div className="container-fluid">
        <motion.div
          className="sm:grid sm:grid-cols-2 lg:grid-cols-[25%,50%,25%] gap-8 "
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Center content */}
          <motion.div
            className="hero-content  flex flex-col items-center gap-6 lg:order-2 self-center col-span-2 lg:col-span-1"
            variants={centerVariants}
          >
            <h1 className="text-h2 font-parkinsans text-center text-white font-normal capitalize">
             {heading? heading : "A Support Company that Understands Your Business"}


            </h1>
            <img src="./s-hero.gif" className="m-auto" alt="" />
            <p className="text-xl text-center text-white font-manrope">
              {description? description : "At The Varallo Group, we bring together six specialized sub-brands under one clear vision. We are your single source for smarter, effective, and scalable success."}
            </p>
            <Button
              arrowClass={"sdf"}
              text={cta ? cta['label'] : "Schedule a call now"}
              color={"text-white"}
            />
          </motion.div>

          {/* Left GIF */}
          <motion.div
            className="hero-left lg:order-1 lg:self-start"
            variants={leftVariants}
          >
            <img src={Imagetop['url']} className="w-full mt-10 sm:mt-auto" alt="" />
          </motion.div>
          {/* Right GIF */}
          <motion.div
            className="hero-left lg:order-3 lg:self-end"
            variants={rightVariants}
          >
            <img src={Imagebottom['url']} className="w-full mt-10 sm:mt-auto" alt="" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ServiceHero;
