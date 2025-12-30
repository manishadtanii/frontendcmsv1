import React, { useState, useEffect } from 'react'
import AboutHero from '../sections/about/AboutHero'
import Mission from '../sections/about/Mission'
import Vision from '../sections/about/Vision'
import Story from '../sections/about/Story'
import OurFounder from '../sections/about/OurFounder'
import Team from '../sections/about/Team'
import Testimonials from '../sections/home/Testimonials'
import { API_BASE_URL } from "../services/apiService";

function About() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  // Reusable unboxing logic to clean CMS metadata
  const unboxData = (data) => {
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === "object") return unboxData(parsed);
      } catch (e) { return data; }
    }
    if (Array.isArray(data)) {
      if (data.length === 1 && typeof data[0] === "string") return data[0];
      return data.map(unboxData);
    }
    if (data !== null && typeof data === "object") {
      if (data.url && typeof data.url === 'object') return unboxData(data.url);
      const cleaned = {};
      for (let [key, value] of Object.entries(data)) {
        if (["_id", "__v", "dbid", "content"].includes(key)) continue;
        cleaned[key] = unboxData(value);
      }
      return cleaned;
    }
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/pages/about`); //
        const json = await res.json();
        if (json.data?.sections) {
          // Map sections into a key-value object (e.g., { hero: {...}, mission: {...} })
          const dataMap = {};
          json.data.sections.forEach(s => {
            dataMap[s.sectionKey] = unboxData(s.content);
          });
          setSections(dataMap);
        }
      } catch (err) {
        console.error("About page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className='overflow-x-hidden'>
      {/* Pass the specific section data as a 'data' prop to each component */}
      <AboutHero data={sections.hero} />
      
      <div id="mission">
        <Mission data={sections.mission} />
      </div>
      
      <div id="vision">
        <Vision data={sections.vision} />
      </div>
      
      <div id="our-story">
        <Story data={sections.journey} />
      </div>
      
      <div id="founder">
        <OurFounder data={sections.founder} />
      </div>
      
      <div id="team">
        <Team data={sections.leadership_team} />
      </div>
      
      <div id="testimonials">
        <Testimonials data={sections.testimonials} />
      </div>
    </div>
  )
}

export default About;