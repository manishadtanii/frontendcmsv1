import React, { useState, useEffect } from "react";
import AboutSection from "../sections/home/AboutSection";
import FeaturedHighlights from "../sections/home/FeaturedHighlights";
import Testimonials from "../sections/home/Testimonials";
import SmartSlider from "../sections/home/SmartSlider";
import WhyChoose from "../sections/home/WhyChoose";
import HomeHero from "../sections/home/HomeHero";
import { API_BASE_URL } from "../services/apiService";

function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pages/home`);
        const jsonData = await response.json();
        console.log("Fetched home data:", jsonData);
        if (jsonData.data && jsonData.data.sections) {
          setSections(jsonData.data.sections);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Helper function to get content by sectionKey
  const getSectionData = (key) => sections.find(s => s.sectionKey === key)?.content;

  return (
    <div className="home-page overflow-x-hidden">
      {/* 1. Hero Section */}
      <HomeHero data={getSectionData("hero")} />

      {/* 2. About/Expertise Section */}
      <div id="our-expertise">
        <AboutSection data={getSectionData("experience")} />
      </div>

      {/* 3. Smart Support Slider */}
      <div id="services">
        <SmartSlider data={getSectionData("services")} />
      </div>

      {/* 4. Metrics / Why Choose Section */}
      <div id="metrics">
        <WhyChoose data={getSectionData("trust")} />
      </div>

      {/* 5. Capabilities / Featured Highlights */}
      <div id="featured">
        <FeaturedHighlights data={getSectionData("capabilities")} />
      </div>

      {/* 6. Testimonials */}
      <div id="testimonials">
        <Testimonials data={getSectionData("testimonials")} />
      </div>
    </div>
  );
}

export default Home;