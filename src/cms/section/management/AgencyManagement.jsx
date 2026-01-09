import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlineUpload,
  HiOutlineSave,
  HiOutlinePencilAlt,
  HiOutlineLockClosed,
  HiOutlineEye,
} from "react-icons/hi";

const AgencyManagement = ({ sectionData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const mainFileRef = useRef(null);

  // State initialized with individual keys for absolute clarity
  const [content, setContent] = useState({
      tag: sectionData?.tag || "TVG Management",
    heading: sectionData?.heading || "Agency Management Services for Court Reporting Firms",
    desc: sectionData?.desc || "Running a court reporting firm involves more than just capturing the record. It demands consistent administrative precision, strong client communication, and an eye on the bigger business picture. That’s where we come in. TVG Management acts as your operational backbone, helping you manage the day-to-day so you can focus on what matters most: your clients and your growth. Whether you're scaling up, facing staffing challenges, or need support during high-demand periods, our experienced team steps in. We bring reliability, consistency, and confidence to your agency.",
    ctaText: sectionData?.ctaText || "Schedule a call now",
    mainImage1: sectionData?.mainImage1 || "./hero.png",
    mainImage2: sectionData?.mainImage2 || "./hero.png",
    mainImage3: sectionData?.mainImage3 || "./hero.png",
    mainImage4: sectionData?.mainImage4 || "./hero.png",
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

      {/* --- MAIN SECTION --- */}
      <div className="grid grid-cols-1  gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Tag
            </label>
            <input
              disabled={!isEditing}
              name="tag"
              value={content.tag}
              placeholder=""
              onChange={handleChange}
              className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${
                isEditing ? "border-cyan-400" : "border-gray-800 text-gray-400"
              }`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Main Heading</label>
            <input disabled={!isEditing} name="heading" value={content.heading} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Paragraph Text
            </label>
            <textarea
              disabled={!isEditing}
              name="desc"
              value={content.desc}
              placeholder=""
              onChange={handleChange}
              rows="5"
              className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${
                isEditing ? "border-cyan-400" : "border-gray-800 text-gray-400"
              }`}
            />
          </div>
          <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
                CTA Text
              </label>
              <input
                disabled={!isEditing}
                placeholder=""
                name="ctaText"
                value={content.ctaText}
                onChange={handleChange}
                className={`bg-transparent border rounded-xl px-4 py-2 outline-none ${
                  isEditing
                    ? "border-cyan-400"
                    : "border-gray-800 text-gray-400"
                }`}
              />
            </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
                CTA Text 2
              </label>
              <input
                disabled={!isEditing}
                placeholder=""
                name="ctaText2"
                value={content.ctaText2}
                onChange={handleChange}
                className={`bg-transparent border rounded-xl px-4 py-2 outline-none ${
                  isEditing
                    ? "border-cyan-400"
                    : "border-gray-800 text-gray-400"
                }`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
                CTA Link 1
              </label>
              <input
                disabled={!isEditing}
                placeholder=""
                name="ctaLink2"
                value={content.ctaLink2}
                onChange={handleChange}
                className={`bg-transparent border rounded-xl px-4 py-2 outline-none ${
                  isEditing
                    ? "border-cyan-400"
                    : "border-gray-800 text-gray-400"
                }`}
              />
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative ">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Image 1
            </label>
            <div
              onClick={() => isEditing && mainFileRef.current.click()}
              className={`relative border-2 border-dashed rounded-2xl h-full min-h-[200px] max-h-[320px] flex items-center justify-center bg-black/20 overflow-hidden ${
                isEditing
                  ? "border-cyan-500 cursor-pointer group"
                  : "border-gray-800"
              }`}
            >
              <input
                type="file"
                ref={mainFileRef}
                onChange={(e) => handleImageUpdate("mainImage1", e)}
                className="hidden"
              />
              <img
                src={showReference ? "./hero.png" : content.mainImage1}
                className="max-h-full object-contain p-2"
                alt="Hero"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiOutlineUpload className="text-cyan-400 text-2xl" />
                </div>
              )}
            </div>
          </div>
          <div className="relative ">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Image 2
            </label>
            <div
              onClick={() => isEditing && mainFileRef.current.click()}
              className={`relative border-2 border-dashed rounded-2xl h-full min-h-[200px] max-h-[320px] flex items-center justify-center bg-black/20 overflow-hidden ${
                isEditing
                  ? "border-cyan-500 cursor-pointer group"
                  : "border-gray-800"
              }`}
            >
              <input
                type="file"
                ref={mainFileRef}
                onChange={(e) => handleImageUpdate("mainImage2", e)}
                className="hidden"
              />
              <img
                src={showReference ? "./hero.png" : content.mainImage2}
                className="max-h-full object-contain p-2"
                alt="Hero"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiOutlineUpload className="text-cyan-400 text-2xl" />
                </div>
              )}
            </div>
          </div>
          <div className="relative ">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Image 4
            </label>
            <div
              onClick={() => isEditing && mainFileRef.current.click()}
              className={`relative border-2 border-dashed rounded-2xl h-full min-h-[200px] max-h-[320px] flex items-center justify-center bg-black/20 overflow-hidden ${
                isEditing
                  ? "border-cyan-500 cursor-pointer group"
                  : "border-gray-800"
              }`}
            >
              <input
                type="file"
                ref={mainFileRef}
                onChange={(e) => handleImageUpdate("mainImage4", e)}
                className="hidden"
              />
              <img
                src={showReference ? "./hero.png" : content.mainImage4}
                className="max-h-full object-contain p-2"
                alt="Hero"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiOutlineUpload className="text-cyan-400 text-2xl" />
                </div>
              )}
            </div>
          </div>
          <div className="relative ">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">
              Image 3
            </label>
            <div
              onClick={() => isEditing && mainFileRef.current.click()}
              className={`relative border-2 border-dashed rounded-2xl h-full min-h-[200px] max-h-[320px] flex items-center justify-center bg-black/20 overflow-hidden ${
                isEditing
                  ? "border-cyan-500 cursor-pointer group"
                  : "border-gray-800"
              }`}
            >
              <input
                type="file"
                ref={mainFileRef}
                onChange={(e) => handleImageUpdate("mainImage3", e)}
                className="hidden"
              />
              <img
                src={showReference ? "./hero.png" : content.mainImage3}
                className="max-h-full object-contain p-2"
                alt="Hero"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiOutlineUpload className="text-cyan-400 text-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyManagement;
