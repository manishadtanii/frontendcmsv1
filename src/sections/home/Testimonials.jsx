// components/Testimonials.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "../../components/Arrow";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Michael Scire",
    role: "Florida Court Reporters Association",
    text: "“Such a great experience working with The Varallo Group. I cannot say enough wonderful things about each of you. You are all professional, helpful, efficient, and respectful. You all jumped right in and often offered help when I didn’t realize I needed it. The conference ran seamlessly. Thank you from the bottom of my heart.”",
    image: "https://i.pravatar.cc/60?img=1",
  },
  {
    name: "Ray Catuogno, Jr.",
    role: "Real Time Court Reporting",
    text: "“I don’t get an opportunity to say it often enough, but I really appreciate the effort and hard work that everyone puts into making my business operations run smoothly. My work to establish the business was done long ago, and now it’s everyone else’s work that continues to make the business a success. So thanks for the big things that are a pain to do, and thanks for the little things that don’t get as much notice but are just as important.”",
    image: "https://i.pravatar.cc/60?img=2",
  },
  {
    name: "Pam Owen",
    role: "BOSS Reporters",
    text: "“I am so appreciative of what you have taught me and for all of your efforts. I am very pleased with the progress we’ve made together and grateful for your positivity and eagerness to get ‘all the ducks in a row.’ I am optimistic and very excited about the future, and know I am lucky to have found you.”",
    image: "https://i.pravatar.cc/60?img=3",
  },
  {
    name: "Mary Beth Johnson",
    role: "Community College of Allegheny County",
    text: "“May I begin by thanking you for a lifetime of work on behalf of Steno reporting. Your brilliance in creating A to Z and Basic Training saved our profession. As a result of your initiative, we now teach students from Oregon to Atlanta. You had vision, and I am grateful for your foresight.”",
    image: "https://i.pravatar.cc/60?img=1",
  },
  {
    name: "Michael Lewis",
    role: "Discovery Legal Services",
    text: "“Working with The Varallo Group and Cedar Bushong has been an excellent experience. Their team handled our website development with precision, creating a site that truly reflects our brand and meets our needs. Beyond the initial development, their ongoing support has been invaluable. They are consistently responsive and supportive, addressing any issues promptly and helping us adapt our site as our business evolves. We couldn’t be happier with their dedication and commitment to our success. Highly recommend!”",
    image: "https://i.pravatar.cc/60?img=2",
  },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute -bottom-14  left-1/2 transform translate-x-6 bg-btn hover:bg-blue-600 text-black  rounded-full"
      onClick={onClick}
    >
      <Arrow customClass="" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute -bottom-14 left-1/2 transform -translate-x-12 bg-btn hover:bg-gray-300 text-black  rounded-full"
      onClick={onClick}
    >
      <Arrow customClass="rotate-180" />
    </button>
  );
}

const Testimonials = ({ data }) => {
    // console.log("Testimonial data:", data);
  if (!data) return null;
  console.log("Testimonial data:", data);
  const { heading, cards } = data;
  console.log("Testimonial cards:", cards);
  console.log("Testimonial heading:", heading);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      
      {
        breakpoint: 768, // tablet & below
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials bg-white pb-10 relative text-center" id="testimonials">
      <div className="container-fluid">
        <motion.h2
          className="text-h2 font-medium font-parkinsans  mb-12 max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {heading ? heading : ` Why Our Clients Choose Us <br className="hidden md:block" />
         Again & Again`}
        </motion.h2>

        <motion.div
          className="slider-container relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Slider {...settings}>
            {cards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border border-blue-300 rounded-lg p-6 shadow hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div className="">
                    <div className="flex items-center mb-4">
                    {/* <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mr-3"
                    /> */}
                    <div className="text-left">
                      <p className="text-xl font-manrope">{item.name}</p>
                      <p className="text-base font-light font-manrope">
                        {item.company}
                      </p>
                    </div>
                  </div>
                  <p className=" text-left open-sans font-medium mb-6 font-manrope text-xl leading-6">
                    {item.text}
                  </p>
                  </div>
                  <div>
                    <img
                      src="/format_quote.svg"
                      className="w-12 ms-auto"
                      alt=""
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
