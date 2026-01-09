import React, { useState, useRef } from "react";
import toast, {Toaster} from "react-hot-toast";
import { HiOutlineUpload, HiOutlineSave, HiOutlinePencilAlt, HiOutlineLockClosed, HiOutlineEye } from "react-icons/hi";

const ContactUs = ({ sectionData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const mainFileRef = useRef(null);
  
  // State initialized with individual keys for absolute clarity
  const [content, setContent] = useState({
    heading: sectionData?.heading || "Contact Us",
    desc: sectionData?.desc || "Reach out today, we’ll map the way forward with clear strategies and reliable assistance.",
    headingSchedule: sectionData?.headingSchedule || "Schedule a deposition",
    descSchedule: sectionData?.descSchedule || "Once you submit your request, we’ll send a confirmation email within 24 hours. If you haven’t received it by then, please contact our office to confirm we’ve received your scheduling request.",
    headingSidebar: sectionData?.headingSidebar || "You tell us. We Listen.",
    descSidebar: sectionData?.descSidebar || "Rely on our team to help your business succeed.",

    addressText: sectionData?.addressText || "34 Grafton Street, Suite 2 Millbury, MA 01527",
    addressLink: sectionData?.addressLink || "https://maps.google.com/",
    callText: sectionData?.callText || "508.753.9282",
    emailSchedulingText: sectionData?.emailSchedulingText || "Scheduling",
    emailScheduling: sectionData?.emailScheduling || "schedule@thevarallogroup.com",
    emailProductionText: sectionData?.emailProductionText || "Production",
    emailProduction: sectionData?.emailProduction || "production@thevarallogroup.com",
    emailInvoicingText: sectionData?.emailInvoicingText || "Invoicing",
    emailInvoicing: sectionData?.emailInvoicing || "invoices@thevarallogroup.com",
    emailVideoText: sectionData?.emailVideoText || "Video",
    emailVideo: sectionData?.emailVideo || "video@thevarallogroup.com",
    emailMarketingText: sectionData?.emailMarketingText || "Marketing",
    emailMarketing: sectionData?.emailMarketing || "cedar@thevarallogroup.com",
    emailGeneralText: sectionData?.emailGeneralText || "General Inquiries",
    emailGeneral: sectionData?.emailGeneral || "info@thevarallogroup.com",
    faceBookLink: sectionData?.faceBookLink || "https://www.facebook.com/",
    linkedinLink: sectionData?.linkedinLink || "https://www.linkedin.com/",
    mapLink: sectionData?.mapLink || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5912.049902837201!2d-71.746638!3d42.192534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e40f9a42b7bfe5%3A0x3178cc10b1995a2!2s34%20Grafton%20St%2C%20Millbury%2C%20MA%2001527!5e0!3m2!1sen!2sus!4v1767883263142!5m2!1sen!2sus",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Main Heading</label>
            <input disabled={!isEditing} name="heading" value={content.heading} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
           <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Description</label>
            <textarea disabled={!isEditing} name="desc" value={content.desc} placeholder="" onChange={handleChange} rows="3" className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Schedule Heading</label>
            <input disabled={!isEditing} name="headingSchedule" value={content.headingSchedule} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
           <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Schedule Description</label>
            <textarea disabled={!isEditing} name="descSchedule" value={content.descSchedule} placeholder="" onChange={handleChange} rows="3" className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Sidebar Heading</label>
            <input disabled={!isEditing} name="headingSidebar" value={content.headingSidebar} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
           <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Sidebar Description</label>
            <textarea disabled={!isEditing} name="descSidebar" value={content.descSidebar} placeholder="" onChange={handleChange} rows="3" className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">headingSchedule</label>
            <input disabled={!isEditing} name="desc" value={content.desc} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
          </div>
         <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Number</label>
            <input disabled={!isEditing} name="desc" value={content.callText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Address Text</label>
             <textarea disabled={!isEditing} name="addressText" value={content.addressText} placeholder="" onChange={handleChange} rows="3" className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
              <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Address Link</label>
             <textarea disabled={!isEditing} name="addressLink" value={content.addressLink} placeholder="" onChange={handleChange} rows="3" className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Scheduling Text</label>
            <input disabled={!isEditing} name="emailSchedulingText" value={content.emailSchedulingText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Scheduling Mail</label>
            <input disabled={!isEditing} name="emailScheduling" value={content.emailScheduling} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Production Text</label>
            <input disabled={!isEditing} name="emailSchedulingText" value={content.emailProductionText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Production Mail</label>
            <input disabled={!isEditing} name="emailScheduling" value={content.emailProduction} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Invoicing Text</label>
            <input disabled={!isEditing} name="emailSchedulingText" value={content.emailInvoicingText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Invoicing Mail</label>
            <input disabled={!isEditing} name="emailScheduling" value={content.emailInvoicing} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Video Text</label>
            <input disabled={!isEditing} name="emailSchedulingText" value={content.emailVideoText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Video Mail</label>
            <input disabled={!isEditing} name="emailScheduling" value={content.emailVideo} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Marketing Text</label>
            <input disabled={!isEditing} name="emailSchedulingText" value={content.emailMarketingText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Marketing Mail</label>
            <input disabled={!isEditing} name="emailScheduling" value={content.emailMarketing} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">General Inquiries Text</label>
            <input disabled={!isEditing} name="emailSchedulingText" value={content.emailGeneralText} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">General Inquiries Mail</label>
            <input disabled={!isEditing} name="emailScheduling" value={content.emailGeneral} placeholder="" onChange={handleChange} className={`w-full bg-transparent border rounded-xl px-4 py-2 outline-none transition-all ${isEditing ? 'border-cyan-400' : 'border-gray-800 text-gray-400'}`} />
            </div>
           
          </div>
        </div>

        <div className="relative">
          <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Main Image</label>
          <div onClick={() => isEditing && mainFileRef.current.click()} className={`relative border-2 border-dashed rounded-2xl h-full min-h-[200px] flex items-center justify-center bg-black/20 overflow-hidden ${isEditing ? 'border-cyan-500 cursor-pointer group' : 'border-gray-800'}`}>
            <input type="file" ref={mainFileRef} onChange={(e) => handleImageUpdate('mainImage', e)} className="hidden" />
            <img src={showReference ? "./hero.png" : content.mainImage} className="max-h-full object-contain p-2" alt="Hero" />
            {isEditing && <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><HiOutlineUpload className="text-cyan-400 text-2xl" /></div>}
          </div>
        </div>
      </div>

      {/* --- HARDCODED CARDS (2x2) --- */}
    </div>
  );
};

export default ContactUs;