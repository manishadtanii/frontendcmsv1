import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlineUpload,
  HiOutlineSave,
  HiOutlinePencilAlt,
  HiOutlineLockClosed,
  HiOutlineEye,
} from "react-icons/hi";

const WhatWeOffer = ({ sectionData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const mainFileRef = useRef(null);

  // State initialized with individual keys for absolute clarity
  const [content, setContent] = useState({
    // Card 1
    heading: sectionData?.heading || "What We Offer",
    c1_title:
      sectionData?.c1_title ||
      "End-to-End Scheduling & Communication Management",
    c1_desc:
      sectionData?.c1_desc ||
      "We handle scheduling, resource calendar coordination, email monitoring, and phone answering, ensuring your agency runs smoothly and stays responsive. We are more than an answering service. We have the skills needed to answer questions the first time they are asked.",
    c1_img: sectionData?.c1_img || "./wwo-icon/m1.png",

    c2_title:
      sectionData?.c2_title || "Meticulous Transcript & Exhibit Processing",
    c2_desc:
      sectionData?.c2_desc ||
      "From accurate transcript formatting to exhibit marking, printing, binding, and final delivery, we manage it all with precision and speed.",
    c2_img: sectionData?.c2_img || "./wwo-icon/m1.png",

    c3_title: sectionData?.c3_title || "Streamlined Invoicing & Collections",
    c3_desc:
      sectionData?.c3_desc ||
      "Get paid on time with professional invoice generation, client billing follow-ups, and efficient collections support.",
    c3_img: sectionData?.c3_img || "./wwo-icon/m1.png",

    c4_title: sectionData?.c4_title || "Accurate Payroll & Bookkeeping",
    c4_desc:
      sectionData?.c4_desc ||
      "We process reporter payments and manage day-to-day bookkeeping, helping you maintain financial clarity and control.",
    c4_img: sectionData?.c4_img || "./wwo-icon/m1.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpdate = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 1MB");
      return;
    }
    const url = URL.createObjectURL(file);
    setContent((prev) => ({ ...prev, [key]: url, [`${key}File`]: file }));
  };

  return (
    <div className="flex flex-col gap-8 font-manrope">
      <Toaster />
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-wider">
            Section Editor
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all border ${
              isEditing
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-cyan-500 text-black border-cyan-400"
            }`}
          >
            {isEditing ? <HiOutlineLockClosed /> : <HiOutlinePencilAlt />}
            {isEditing ? "LOCK" : "EDIT"}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                onSave(content);
                setIsEditing(false);
              }}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-full font-bold transition-all shadow-lg"
            >
              <HiOutlineSave /> SAVE
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
          Main Heading
        </label>
        <input
          disabled={!isEditing}
          name="wwp1"
          value={content.heading}
          placeholder=""
          onChange={handleChange}
          className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${
            isEditing ? "border-cyan-400" : "border-gray-800 text-gray-400"
          }`}
        />
      </div>
      {/* --- HARDCODED CARDS (2x2) --- */}
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* CARD 1 */}
          <div
            className={`bg-[#0b1318] border rounded-2xl p-5 flex flex-col gap-5 ${
              isEditing ? "border-cyan-400/30" : "border-gray-800"
            }`}
          >
            <div className="relative w-100 h-28 flex-shrink-0 bg-black rounded-xl overflow-hidden group">
              <img
                src={showReference ? "./ab-1.png" : content.c1_img}
                className="w-full h-full object-cover"
                alt=""
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageUpdate("c1_img", e)}
                  />
                  <HiOutlineUpload className="text-cyan-400" />
                </label>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <input
                disabled={!isEditing}
                name="c1_title"
                value={content.c1_title}
                onChange={handleChange}
                placeholder="Title"
                className="bg-transparent border-b border-gray-800 text-sm font-bold outline-none text-white focus:border-cyan-400"
              />
              <textarea
                disabled={!isEditing}
                name="c1_desc"
                value={content.c1_desc}
                onChange={handleChange}
                placeholder="Desc"
                rows="2"
                className="bg-transparent border border-gray-800 rounded-lg p-2 text-[11px] outline-none text-gray-400"
              />
              {/* <input disabled={!isEditing} name="c1_cta_text" value={content.c1_cta_text} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" />
              <input disabled={!isEditing} name="c1_cta_link" value={content.c1_cta_link} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" /> */}
            </div>
          </div>

          {/* CARD 2 */}
          <div
            className={`bg-[#0b1318] border rounded-2xl p-5 flex flex-col gap-5 ${
              isEditing ? "border-cyan-400/30" : "border-gray-800"
            }`}
          >
            <div className="relative w-100 h-28 flex-shrink-0 bg-black rounded-xl overflow-hidden group">
              <img
                src={showReference ? "./ab-2.png" : content.c2_img}
                className="w-full h-full object-cover"
                alt=""
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageUpdate("c2_img", e)}
                  />
                  <HiOutlineUpload className="text-cyan-400" />
                </label>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <input
                disabled={!isEditing}
                name="c2_title"
                value={content.c2_title}
                onChange={handleChange}
                placeholder="Title"
                className="bg-transparent border-b border-gray-800 text-sm font-bold outline-none text-white focus:border-cyan-400"
              />
              <textarea
                disabled={!isEditing}
                name="c2_desc"
                value={content.c2_desc}
                onChange={handleChange}
                placeholder="Desc"
                rows="2"
                className="bg-transparent border border-gray-800 rounded-lg p-2 text-[11px] outline-none text-gray-400"
              />
              {/* <input disabled={!isEditing} name="c1_cta_text" value={content.c1_cta_text} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" />
              <input disabled={!isEditing} name="c1_cta_link" value={content.c1_cta_link} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" /> */}
            </div>
          </div>

          {/* CARD 3 */}
          <div
            className={`bg-[#0b1318] border rounded-2xl p-5 flex flex-col gap-5 ${
              isEditing ? "border-cyan-400/30" : "border-gray-800"
            }`}
          >
            <div className="relative w-100 h-28 flex-shrink-0 bg-black rounded-xl overflow-hidden group">
              <img
                src={showReference ? "./ab-3.png" : content.c3_img}
                className="w-full h-full object-cover"
                alt=""
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageUpdate("c3_img", e)}
                  />
                  <HiOutlineUpload className="text-cyan-400" />
                </label>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <input
                disabled={!isEditing}
                name="c3_title"
                value={content.c3_title}
                onChange={handleChange}
                placeholder="Title"
                className="bg-transparent border-b border-gray-800 text-sm font-bold outline-none text-white focus:border-cyan-400"
              />
              <textarea
                disabled={!isEditing}
                name="c3_desc"
                value={content.c3_desc}
                onChange={handleChange}
                placeholder="Desc"
                rows="2"
                className="bg-transparent border border-gray-800 rounded-lg p-2 text-[11px] outline-none text-gray-400"
              />
              {/* <input disabled={!isEditing} name="c3_cta_text" value={content.c3_cta_text} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" />
              <input disabled={!isEditing} name="c3_cta_link" value={content.c3_cta_link} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" /> */}
            </div>
          </div>

          {/* CARD 4 */}
          <div
            className={`bg-[#0b1318] border rounded-2xl p-5 flex flex-col gap-5 ${
              isEditing ? "border-cyan-400/30" : "border-gray-800"
            }`}
          >
            <div className="relative w-100 h-28 flex-shrink-0 bg-black rounded-xl overflow-hidden group">
              <img
                src={showReference ? "./ab-3.png" : content.c4_img}
                className="w-full h-full object-cover"
                alt=""
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageUpdate("c4_img", e)}
                  />
                  <HiOutlineUpload className="text-cyan-400" />
                </label>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <input
                disabled={!isEditing}
                name="c4_title"
                value={content.c4_title}
                onChange={handleChange}
                placeholder="Title"
                className="bg-transparent border-b border-gray-800 text-sm font-bold outline-none text-white focus:border-cyan-400"
              />
              <textarea
                disabled={!isEditing}
                name="c4_desc"
                value={content.c4_desc}
                onChange={handleChange}
                placeholder="Desc"
                rows="2"
                className="bg-transparent border border-gray-800 rounded-lg p-2 text-[11px] outline-none text-gray-400"
              />
              {/* <input disabled={!isEditing} name="c3_cta_text" value={content.c3_cta_text} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" />
              <input disabled={!isEditing} name="c3_cta_link" value={content.c3_cta_link} onChange={handleChange} placeholder="Link" className="bg-transparent border border-gray-800 rounded-lg px-2 py-1 text-[10px] outline-none text-gray-400" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
