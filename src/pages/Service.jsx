import React, { useState, useEffect } from 'react'
import ServiceHero from '../sections/service/ServiceHero'
import ServicesGrid from '../sections/service/ServicesGrid'
import Testimonials from '../sections/home/Testimonials'
import { API_BASE_URL } from "../services/apiService";

function Service() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  // Standard unboxing logic used across your CMS
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
        // Retrieve data for the main Services page
        const res = await fetch(`${API_BASE_URL}/pages/services`);
        const json = await res.json();
        if (json.data?.sections) {
          const dataMap = {};
          json.data.sections.forEach(s => {
            dataMap[s.sectionKey] = unboxData(s.content);
          });
          setSections(dataMap);
        }
      } catch (err) {
        console.error("Service page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div id='service-page' className=''>
        {/* Pass unboxed data props to each child component */}
        <ServiceHero data={sections["services-hero"]} />
        <ServicesGrid data={sections["services-grid"]} />
        {/* <Testimonials data={sections.testimonials} /> */}
    </div>
  )
}

export default Service;