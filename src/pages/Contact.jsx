import React, { useState, useEffect } from 'react'
import ContactHero from '../sections/contact/ContactHero'
import ContactUs from '../sections/contact/ContactUs'
import useSmoothScroll from '../components/useSmoothScroll';
import { API_BASE_URL } from "../services/apiService";

function Contact() {
  useSmoothScroll(1000);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  // Reusable unboxing logic to clean technical metadata
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
    const fetchContactData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/pages/contact`); //
        const json = await res.json();
        if (json.data?.sections) {
          const dataMap = {};
          json.data.sections.forEach(s => {
            dataMap[s.sectionKey] = unboxData(s.content);
          });
          setSections(dataMap);
        }
      } catch (err) {
        console.error("Contact page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div>
      {/* Pass specific section data as props */}
      <ContactHero data={sections.contactHero} />
      <ContactUs data={sections.contactUsForm} />
    </div>
  )
}

export default Contact;