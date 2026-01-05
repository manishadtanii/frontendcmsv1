import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* const services = [
  {
    title: "TVG Management",
    content:
      "Comprehensive agency management support focused on optimizing your day-to-day operations.",
    link: "/services/tvg-management",
    img: "./management.jpg",
  },
  {
    title: "TVG Stream",
    content:
      "Cutting-edge trial presentation and event A/V, with detail-focused on-site support.",
    link: "/services/tvg-stream",
    img: "./stream.jpg",
  },
  {
    title: "TVG Books",
    content:
      "Bookkeeping support services for court reporting and other professional industries.",
    link: "/services/tvg-books",
    img: "./books.jpg",
  },

  {
    title: "TVG Connect",
    content:
      "Focused management services built for professional associations and organizations.",
    link: "/services/tvg-connect",
    img: "./connect.jpg",
  },
  {
    title: "TVG Verify",
    content:
      "Let us ensure your hiring is secure with reliable background screening and compliance checks, powered by SmartHire.",
    link: "/services/tvg-verify",
    img: "./verify.jpg",
  },
  {
    title: "TVG Reporting",
    content:
      "Our nationwide network of court reporters and legal videographers is ready to support your firm wherever you need.",
    link: "/services/tvg-reporting",
    img: "./reporting.jpg",
  },
]; */
/* const services = [
  {
    title: "TVG Management",
    content:
      "It starts from a very simple goal in mind and that's to serve your clients really well and grow at the same time. Running a court reporting firm involves more than just capturing the record, it demands consistent administrative precision, strong client communication and an eye on the bigger business picture. That’s where we come in. TVG Management service becomes your backbone, which helps you manage your day to day so you can actually focus on what really matters the most, which is your clients and your growth. ",
    link: "/services/tvg-management",
    img: "./management.jpg",
  },
  {
    title: "TVG Stream",
    content:
      "Remote proceedings have quickly moved from an option to a necessity in today’s evolving legal landscape. But with high stakes and tight schedules, no firm can afford technical hiccups or disjointed setups. TVG Stream ensures your virtual depositions are handled with the same precision and professionalism as in-person proceedings. From hybrid depositions to fully online proceedings, we provide secure platforms, real-time support, and exhibit management, so your client can stay focused on what truly matters: making their case heard.",
    link: "/services/tvg-stream",
    img: "./stream.jpg",
  },
  {
    title: "TVG Books",
    content:
      "Your business runs on more than just great service, it runs on healthy numbers. Without clear financial visibility, even the most successful agencies can struggle with cash flow, tax prep and long-term planning. That’s why smart bookkeeping and accurate accounting aren’t just nice to have, they’re essential. At TVG Book, we get the behind-the-scenes pressures that you face. Whether you're chasing down client payments, trying to stay compliant or just need a better handle on your books, our team is here to simplify your financial life.",
    link: "/services/tvg-books",
    img: "./books.jpg",
  },

  {
    title: "TVG Connect",
    content:
      "Trade groups and professional associations thrive on connection, coordination and clear leadership but managing all the moving parts can be overwhelming. From day-to-day operations to annual conferences, it takes more than passion to keep members engaged and everything running smoothly. That’s where TVG Connect steps in. We specialize in association management for professional, legal and compliance-driven industries, offering customized solutions that keep your organization efficient, professional and people-focused.",
    link: "/services/tvg-connect",
    img: "./connect.jpg",
  },
  {
    title: "TVG Verify",
    content:
      "Great hires start with great data. Whether you're an employer, association or staffing agency, the cost of a bad hire can be high not just financially, but reputationally. That’s why trusted, legally compliant screening is essential. TVG Verify partners with USAFact to deliver reliable, scalable background check solutions that meet today’s fast-paced hiring demands. From identity verification to global criminal checks, we make it easy to hire with confidence without slowing down your process.",
    link: "/services/tvg-verify",
    img: "./verify.jpg",
  },
  // {
  //   title: "TVG Creative",
  //   content:
  //     "Whether you’re launching a new venture or refreshing your digital presence, how you show up matters. In today’s fast-moving world, first impressions aren’t just visual, they're strategic. That’s where TVG Creative steps in. We provide full-spectrum digital marketing, branding and design services customized for the legal and B2B industries. From marketing materials to start-up identity kits, we help you cut through the noise, attract the right audience and communicate your value with clarity and style.",
  //   link: "/services/tvg-creative",
  //   img: "./creative.jpg",
  // },
  {
    title: "TVG Reporting",
    content:
      "In the current legal world, capturing the legal record with precision and professionalism is the cornerstone of any successful court case. At TVG Reporting, we provide firms with dependable court reporters who uphold the highest standards of accuracy, neutrality and timeliness. Whether in-person or remote, our experienced reporters deliver transcripts you can trust, allowing attorneys and legal professionals to focus on advocacy without worrying about the details of documentation.",
    link: "/services/tvg-reporting",
    img: "./reporting.jpg",
  },
  // {
  //   title: "TVG Command",
  //   content:
  //     "As the legal industry evolves, so should your technology. From court reporting to case production, efficiency and accuracy are everything. That’s why more reporting firms are turning to AI-powered platforms that don’t just keep up, they lead. TVG Command helps you modernize your transcription workflow with cutting-edge platform solutions. As a U.S. sales partner for Claudio AI and other legal-first platforms, we connect you with tools designed to scale your reporting business, reduce manual work  without sacrificing accuracy.",
  //   link: "/services/tvg-command",
  //   img: "./command.jpg",
  // },
];
 */
// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ServicesGrid = ({ data }) => {
   if (!data) return null;
  console.log("Service Hero data:", data);
  const {sectionHeading, cards} = data;
  return (
    <div className="container-fluid mx-auto px-4 py-16">
      <h2 className="text-h2 font-parkinsans mb-10">Services</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }} // triggers only when scrolled into view
      >
        {cards.map((item, idx) => (
          <motion.div key={item['id']} variants={cardVariants}>
            <Link
              to={item.link}
              className="relative group rounded-xl overflow-hidden block "
            >
              {/* Image */}
              <div className="absolute top-0 left-0 w-full h-full">
                <img
                  src={item.image['url']}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-[25px]"
                />

                {/* Title & arrow at bottom (always visible) */}
                <div className="absolute bottom-0 left-0 right-0 w-full z-10">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/1"></div>

                  {/* Content */}
                  <div className="relative p-4 text-white text-xl flex items-center justify-between w-full group-hover:opacity-0 transition duration-300">
                    <h3 className="font-normal font-parkinsans text-p sm:text-[40px]">
                      {item.heading}
                    </h3>
                    <img src="l-arrow.png" className="max-w-[100px]" alt="" />
                  </div>
                </div>
              </div>

              {/* Hover content overlay */}
              <div className="relative w-full md:min-h-[700px] lg:min-h-[500px] z-10 inset-0 p-10 rounded-[25px] bg-black/80 backdrop-blur-sm   opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-0 sm:group-hover:opacity-100 transition duration-300 flex flex-col justify-between ">
                {/* <div className="relative z-10 inset-0 p-4 rounded-[25px] bg-black/80 backdrop-blur-sm opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between h-full"> */}
                <div>
                  <h3 className="font-normal font-parkinsans text-p sm:text-[40px] text-white mb-2">
                    {item.heading}
                  </h3>
                  <p className="md:text-xl mb-4 font-manrope text-white">
                    {item.description}
                  </p>
                </div>
                <img
                  src="l-arrow.png"
                  className="max-w-[100px] me-auto"
                  alt=""
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesGrid;
