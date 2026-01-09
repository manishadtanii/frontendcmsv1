import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineUpload, HiOutlineSave, HiOutlinePencilAlt, HiOutlineLockClosed, HiOutlineEye } from "react-icons/hi";

const WhatWeProvide = ({ sectionData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const mainFileRef = useRef(null);
  
  // State initialized with individual keys for absolute clarity
  const [content, setContent] = useState({
    heading: sectionData?.heading || "What We Provide",
    subtext: sectionData?.subtext || "We manage your back office so you can focus on delivering top-tier client service. From scheduling to payroll, we streamline the chaos behind the scenes.",
    // Card 1
    wwp1: sectionData?.wwp1 || "Client onboarding assistance",
    wwp2: sectionData?.wwp2 || "Scheduling and Calendar Support",
    wwp3: sectionData?.wwp3 || "Operations reporting & performance",
    wwp4: sectionData?.wwp4 || "Vendor coordination",
    wwp5: sectionData?.wwp5 || "Branding & marketing help",
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
    setContent(prev => ({ ...prev, [key]: url, [`${key}File`]: file }));
  };

  return (
    <div className="flex flex-col gap-8 font-manrope">
        <Toaster />
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-wider">Section Editor</h2>
          
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => setIsEditing(!isEditing)} className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all border ${isEditing ? 'bg-gray-800 border-gray-700 text-white' : 'bg-cyan-500 text-black border-cyan-400'}`}>
            {isEditing ? <HiOutlineLockClosed /> : <HiOutlinePencilAlt />}
            {isEditing ? "LOCK" : "EDIT"}
          </button>
          {isEditing && (
            <button onClick={() => { onSave(content); setIsEditing(false); }} className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-full font-bold transition-all shadow-lg">
              <HiOutlineSave /> SAVE
            </button>
          )}
        </div>
      </div>

      {/* --- MAIN SECTION --- */}
      <div className="grid grid-cols-1  gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Main Heading</label>
            <input disabled={!isEditing} name="wwp1" value={content.heading} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Paragraph Text</label>
            <textarea disabled={!isEditing} name="subtext" value={content.subtext} placeholder="" onChange={handleChange} rows="2" className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Slider Text</label>
          <div className="grid grid-cols-2
           md:grid-cols-3 lg:grid-cols-5 gap-2">
            <input disabled={!isEditing} name="wwp1" value={content.wwp1} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            <input disabled={!isEditing} name="wwp2" value={content.wwp2} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            <input disabled={!isEditing} name="wwp3" value={content.wwp3} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            <input disabled={!isEditing} name="wwp4" value={content.wwp4} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            <input disabled={!isEditing} name="wwp5" value={content.wwp5} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
          
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">CTA Text</label>
            <input disabled={!isEditing} placeholder="" name="ctaText" value={content.ctaText} onChange={handleChange} className={`bg-transparent border rounded-xl px-4 py-2 outline-none ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
          </div> */}
        </div>

        {/* <div className="relative ">
          <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Main Image</label>
          <div onClick={() => isEditing && mainFileRef.current.click()} className={`relative border-2 border-dashed rounded-2xl h-full min-h-[200px] max-h-[320px] flex items-center justify-center bg-black/20 overflow-hidden ${isEditing ? 'border-cyan-500 cursor-pointer group' : 'border-gray-800'}`}>
            <input type="file" ref={mainFileRef} onChange={(e) => handleImageUpdate('mainImage', e)} className="hidden" />
            <img src={showReference ? "./hero.png" : content.mainImage} className="max-h-full object-contain p-2" alt="Hero" />
            {isEditing && <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><HiOutlineUpload className="text-cyan-400 text-2xl" /></div>}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WhatWeProvide;