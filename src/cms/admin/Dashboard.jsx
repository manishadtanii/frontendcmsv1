import React, { useState, useEffect } from "react";
import SectionEditor from "../components/SectionEditor"; // The component created in the previous step
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlineDatabase,
  HiChevronDown,
  HiChevronRight,
  HiOutlineHome,        // Homepage
  HiOutlineUserGroup,   // About Us
  HiOutlineViewGrid,    // Our Services
  HiOutlineMail,        // Contact Us
  HiOutlineBriefcase,   // Management
  HiOutlinePlay,        // Stream
  HiOutlineBookOpen,    // Books
  HiOutlineShare,       // Connect
  HiOutlineShieldCheck, // Verify
  HiOutlineChartBar,    // Reporting
  HiOutlineUserCircle,
} from "react-icons/hi";
// 1. Import your custom section components
import Hero from "../section/home/Hero";
import Experience from "../section/home/Experience";
import Services from "../section/home/Services";
import Trust from "../section/home/Trust";
import Capabilities from "../section/home/Capabilities";
import Testimonials from "../section/home/Testimonials";
import AboutHero from "../section/about/Hero";
import Vision from "../section/about/Vision";
import Mission from "../section/about/Mission";
import Journey from "../section/about/Journey";
import Founder from "../section/about/Founder";
import Team from "../section/about/Team";
import TestimonialsAbout from "../section/about/Testimonials";
import ASupportCompany from "../section/service/ASupportCompany";
import AllServices from "../section/service/AllServices";
import StartYourJourney from "../section/contact/StartYourJourney";
import ContactUs from "../section/contact/ContactUs";
import AgencyManagement from "../section/management/AgencyManagement";
import ServiceOverview from "../section/management/ServiceOverview";
import WhatWeOffer from "../section/management/WhatWeOffer";
import WhatWeProvide from "../section/management/WhatWeProvide";


const Dashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [activeId, setActiveId] = useState("Hero");
  const [openMenu, setOpenMenu] = useState("home");
  const [cmsData, setCmsData] = useState({});

  // Toggle dropdowns in sidebar
  const toggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // 2. Logic to pick the right component based on the sidebar selection
  const renderActiveEditor = () => {
    // This looks at the activeId set by your sidebar buttons
    switch (activeId) {
      case "Hero":
        return (
          <Hero sectionData={activeSectionData} onSave={handleUpdateSection} />
        );
      case "Experience":
        return (
          <Experience
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Services":
        return (
          <Services
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Trust":
        return (
          <Trust sectionData={activeSectionData} onSave={handleUpdateSection} />
        );
      case "Capabilities":
        return (
          <Capabilities
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Testimonials":
        return (
          <Testimonials
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "About-Hero":
        return (
          <AboutHero
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Vision":
        return (
          <Vision
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Mission":
        return (
          <Mission
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Journey":
        return (
          <Journey
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Founder":
        return (
          <Founder
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Team":
        return (
          <Team
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Testimonials-About":
        return (
          <TestimonialsAbout
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "A Support Company":
        return (
          <ASupportCompany
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "All Service":
        return (
          <AllServices
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Start Your Journey":
        return (
          <StartYourJourney
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Contact Us":
        return (
          <ContactUs
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Agency Management":
        return (
          <AgencyManagement
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "Service Overview":
        return (
          <ServiceOverview
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "What We Offer":
        return (
          <WhatWeOffer
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      case "What We Provide":
        return (
          <WhatWeProvide
            sectionData={activeSectionData}
            onSave={handleUpdateSection}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl">
            <p>Select a valid section to begin editing.</p>
          </div>
        );
    }
  };

  // Logic to handle saving (linked to your API logic)
  const handleUpdateSection = async (updatedData) => {
    console.log("Saving to:", activePage, activeId, updatedData);
    // Add your fetch/patch logic here as per your API service
    toast.success(`Saved ${activeId} successfully!`);
  };

  // Helper to find specific section data from your state
  const activeSectionData =
    (cmsData[activePage] || []).find((s) => s.id === activeId) || {};

  return (
    <div className="flex min-h-screen bg-[#05080a] text-white p-6 gap-6 font-manrope">
      {/* --- SIDEBAR (Hardcoded as we discussed) --- */}
      <aside className="w-80 flex flex-col gap-4 sticky top-6">
        {/* --- SIDEBAR --- */}
        <div className="w-80 flex flex-col gap-4 sticky top-6">
          <div className="bg-[#0a0f14]/80 border border-gray-800 rounded-[30px] p-6 h-[calc(100vh-48px)] overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-3 px-2 mb-8 border-b border-gray-800 pb-6">
              <img src="/icon2.png" alt="Logo" className="w-8 h-8" />
              <h2 className="text-lg font-bold text-white">
                The Varallo Group
              </h2>
            </div>

            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 px-2">
              Main Pages
            </p>

            {/* Homepage Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("home")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "home"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineHome className="text-xl" />
                  <span className="text-sm font-bold uppercase">Home</span>
                </div>
                {openMenu === "home" ? <HiChevronDown /> : <HiChevronRight />}
              </button>
              {openMenu === "home" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Hero",
                    "Experience",
                    "Services",
                    "Trust",
                    "Capabilities",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("home");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec && activePage === "home"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Aboutpage Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("about")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "about"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineUserGroup className="text-xl" />
                  <span className="text-sm font-bold uppercase">About</span>
                </div>
                {openMenu === "about" ? <HiChevronDown /> : <HiChevronRight />}
              </button>
              {openMenu === "about" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "About-Hero",
                    "Vision",
                    "Mission",
                    "Journey",
                    "Founder",
                    "Team",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("about");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec && activePage === "about"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Servicepage Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("service")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "service"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineViewGrid className="text-xl" />
                  <span className="text-sm font-bold uppercase">Service</span>
                </div>
                {openMenu === "service" ? <HiChevronDown /> : <HiChevronRight />}
              </button>
              {openMenu === "service" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "A Support Company",
                    "All Service",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("service");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec && activePage === "service"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>

              {/* Contact page Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("contact")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "contact"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineMail className="text-xl" />
                  <span className="text-sm font-bold uppercase">Contact</span>
                </div>
                {openMenu === "contact" ? <HiChevronDown /> : <HiChevronRight />}
              </button>
              {openMenu === "contact" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Start Your Journey",
                    "Contact Us",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("contact");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec && activePage === "contact"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>

 <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1 mt-5 px-2">
              Service Details
            </p>

            {/* Management Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("management")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "services/tvg-management"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineBriefcase className="text-xl" />
                  <span className="text-sm font-bold uppercase">
                    Management
                  </span>
                </div>
                {openMenu === "management" ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )}
              </button>
              {openMenu === "management" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Agency Management",
                    "Service Overview",
                    "What We Offer",
                    "What We Provide",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("services/tvg-management");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec &&
                        activePage === "services/tvg-management"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Stream Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("stream")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "services/tvg-stream"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlinePlay className="text-xl" />
                  <span className="text-sm font-bold uppercase">
                    Stream
                  </span>
                </div>
                {openMenu === "stream" ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )}
              </button>
              {openMenu === "stream" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Agency Stream",
                    "Service Overview",
                    "What We Offer",
                    "What We Provide",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("services/tvg-stream");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec &&
                        activePage === "services/tvg-stream"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Books Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("books")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "services/tvg-books"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineBookOpen className="text-xl" />
                  <span className="text-sm font-bold uppercase">
                    Books
                  </span>
                </div>
                {openMenu === "books" ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )}
              </button>
              {openMenu === "books" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Agency Books",
                    "Service Overview",
                    "What We Offer",
                    "What We Provide",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("services/tvg-books");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec &&
                        activePage === "services/tvg-books"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Connect Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("connect")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "services/tvg-connect"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineShare className="text-xl" />
                  <span className="text-sm font-bold uppercase">
                    Connect
                  </span>
                </div>
                {openMenu === "connect" ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )}
              </button>
              {openMenu === "connect" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Agency Connect",
                    "Service Overview",
                    "What We Offer",
                    "What We Provide",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("services/tvg-connect");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec &&
                        activePage === "services/tvg-connect"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Verify Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("verify")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "services/tvg-verify"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineShieldCheck className="text-xl" />
                  <span className="text-sm font-bold uppercase">
                    Verify
                  </span>
                </div>
                {openMenu === "verify" ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )}
              </button>
              {openMenu === "verify" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Agency Verify",
                    "Service Overview",
                    "What We Offer",
                    "What We Provide",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("services/tvg-verify");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec &&
                        activePage === "services/tvg-verify"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Reporting Toggle */}
            <div className="mb-2">
              <button
                onClick={() => toggle("reporting")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                  activePage === "services/tvg-reporting"
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "text-gray-400 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HiOutlineChartBar className="text-xl" />
                  <span className="text-sm font-bold uppercase">
                    Reporting
                  </span>
                </div>
                {openMenu === "reporting" ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )}
              </button>
              {openMenu === "reporting" && (
                <div className="ml-9 mt-2 flex flex-col gap-1 border-l border-gray-800">
                  {[
                    "Agency Reporting",
                    "Service Overview",
                    "What We Offer",
                    "What We Provide",
                    "Testimonials",
                  ].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setActivePage("services/tvg-reporting");
                        setActiveId(sec);
                      }}
                      className={`text-left px-4 py-2 text-xs font-medium transition-all ${
                        activeId === sec &&
                        activePage === "services/tvg-reporting"
                          ? "text-cyan-400 border-l-2 border-cyan-400 -ml-[2px]"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <header className="flex items-center justify-between bg-[#0a0f14]/80 border border-gray-800 rounded-[30px] px-8 py-4">
          <h1 className="text-xl font-bold uppercase">
            Editing: <span className="text-cyan-400">{activeId}</span>
          </h1>
        </header>

        <div className="flex-1 bg-[#0a0f14]/80 border border-gray-800 rounded-[40px] p-10 overflow-y-auto custom-scrollbar">
          {/* 3. The magic happens here: the dashboard swaps the component based on activeId */}
          <div key={`${activePage}-${activeId}`}>{renderActiveEditor()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
