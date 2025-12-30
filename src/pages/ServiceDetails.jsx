import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceOver from "../sections/service-details/ServiceOver";
import WhatWeProvide from "../sections/service-details/WhatWeProvide";
import ServiceOverview from "../sections/service-details/ServiceOverview";
import ServiceDetailsHero from "../sections/service-details/serviceDetailsHero";
import Testimonials from "../sections/home/Testimonials";
import { API_BASE_URL } from "../services/apiService";

function ServiceDetails() {
  const { serviceId } = useParams(); // e.g., "tvg-management"
  const [content, setContent] = useState(null);
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
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        // Construct the nested API URL exactly as provided
        const res = await fetch(`${API_BASE_URL}/pages/services/${serviceId}`);
        const json = await res.json();

        if (json.data?.sections) {
          const dataMap = {};
          json.data.sections.forEach(s => {
            dataMap[s.sectionKey] = unboxData(s.content);
          });
          setContent(dataMap);
        }
      } catch (err) {
        console.error("Service details fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchServiceData();
  }, [serviceId]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-manrope">Loading Service...</div>;

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-lg font-manrope">
        Service Details Not Found
      </div>
    );
  }

  return (
    <div id="service-details" className="overflow-x-hidden">
      {/* Map unboxed data props to each child component */}
      <ServiceDetailsHero data={content.hero} />
      <ServiceOver data={content.overview} />
      <WhatWeProvide data={content.provide} />
      <ServiceOverview data={content.tvgEffect} />
      <Testimonials />
    </div>
  );
}

export default ServiceDetails;