// import React, { useState, useEffect, useRef } from "react";
// import  toast, { Toaster } from "react-hot-toast";
// import { HiOutlineUpload } from "react-icons/hi";

// const DynamicEditor = ({ section, onSave }) => {
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const fileInputRef = useRef(null);
//   const activePathRef = useRef("");
//   const [fileError, setFileError] = useState("");
//   const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB - keep consistent with backend

//   useEffect(() => {
//     if (section) {
//       setFormData(section);
//       setIsEditing(false);
//     }
//   }, [section]);

//   const updateField = (path, value) => {
//     setFormData((prev) => {
//       const newData = JSON.parse(JSON.stringify(prev));
//       const keys = path.split(".");
//       let current = newData;
//       for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
//       current[keys[keys.length - 1]] = value;
//       return newData;
//     });
//   };

//  /* old file handler 
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Frontend validation: enforce same limit as backend
//       if (file.size > MAX_UPLOAD_BYTES) {
//         setFileError("File is too large. Maximum allowed size is 5 MB.");
//         e.target.value = "";
//         return;
//       }

//       setFileError("");
//       const previewUrl = URL.createObjectURL(file);
//       updateField(activePathRef.current, previewUrl);
//       setFormData((prev) => ({ ...prev, imageFile: file }));
//     }
//   }; */
// const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   // 1. Size Validation (Correct as you have it)
//   const maxSize = 1 * 1024 * 1024; 
//   if (file.size > maxSize) {
    
//     toast.error("File is too large! Please select an image smaller than 1MB.");
//     e.target.value = null; 
//     return;
//   }

//   // 2. Create the temporary preview
//   const previewUrl = URL.createObjectURL(file);

//   // 3. THE FIX: Pass both the string (for UI) and the file (for Backend)
//   // Your updateField should update the local 'section' state in DynamicEditor
//   // AND ensure that 'imageFile' is added to the object passed to onSave()
//   updateField(activePathRef.current, previewUrl, file); 
  
//   // Clear the input so the same file can be re-selected if needed
//   e.target.value = null; 
// };
//   const renderFields = (data, path = "") => {
//     return Object.entries(data).map(([key, value]) => {
//       const fieldPath = path ? `${path}.${key}` : key;
//       if (["id", "imagefile", "dbid", "_id", "__v"].includes(key.toLowerCase()))
//         return null;

//       const lowerKey = key.toLowerCase();
//       // Media detection (Cloudinary, local paths, or Blobs)
//       const isMediaUrl =
//         typeof value === "string" &&
//         (value.includes("cloudinary") ||
//           value.startsWith("blob:") ||
//           /\.(png|jpg|jpeg|svg|webp)$/.test(value));

//       // 1. TEXT HANDLER
//       if (typeof value === "string" && !isMediaUrl) {
//         const isLong = value.length > 60;
//         return (
//           <div key={fieldPath} className="mb-4 flex flex-col">
//             <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 ml-1">
//               {key}
//             </label>
//             {isLong ? (
//               <textarea
//                 disabled={!isEditing}
//                 value={value || ""}
//                 onChange={(e) => updateField(fieldPath, e.target.value)}
//                 className={`bg-transparent border rounded-xl p-3 text-sm min-h-[100px] outline-none transition-all ${
//                   isEditing
//                     ? "border-cyan-400 text-white"
//                     : "border-gray-800 text-gray-500"
//                 }`}
//               />
//             ) : (
//               <input
//                 disabled={!isEditing}
//                 type="text"
//                 value={value || ""}
//                 onChange={(e) => updateField(fieldPath, e.target.value)}
//                 className={`bg-transparent border rounded-full px-4 py-2 text-sm outline-none transition-all ${
//                   isEditing
//                     ? "border-cyan-400 text-white"
//                     : "border-gray-800 text-gray-500"
//                 }`}
//               />
//             )}
//           </div>
//         );
//       }

//       // 2. GALLERY HANDLER (Multi-image support)
//       if (
//         Array.isArray(value) &&
//         value.length > 0 &&
//         typeof value[0] === "string" &&
//         isMediaUrl
//       ) {
//         return (
//           <div
//             key={fieldPath}
//             className="mb-6 p-4 bg-black/40 rounded-2xl border border-gray-800"
//           >
//             <label className="text-[10px] text-gray-500 font-bold uppercase mb-4 block tracking-widest">
//               {key} Gallery
//             </label>
//             <div className="grid grid-cols-3 gap-4">
//               {value.map((url, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     if (isEditing) {
//                       activePathRef.current = `${fieldPath}.${index}`;
//                       fileInputRef.current.click();
//                     }
//                   }}
//                   className={`relative h-24 rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-black ${
//                     isEditing
//                       ? "border-cyan-500 cursor-pointer shadow-lg shadow-cyan-500/10"
//                       : "border-gray-800"
//                   }`}
//                 >
//                   <img
//                     src={url}
//                     alt="Gallery"
//                     className="max-w-full max-h-full object-contain p-2"
//                   />
//                   {isEditing && (
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                       <HiOutlineUpload className="text-cyan-400" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       }

//       // 3. MEDIA UPLOADER (Icons/Images)
//       // Added exclusion for 'learnMore' and 'button' keys to prevent them from rendering as images
//       // 2. GALLERY / ARRAY HANDLER
// if (Array.isArray(value)) {
//   // Check if it's a gallery (array of image URLs)
//   const isGallery = value.length > 0 && typeof value[0] === "string" && 
//     (value[0].includes("cloudinary") || /\.(png|jpg|jpeg|svg|webp)$/i.test(value[0]));

//   if (isGallery) {
//     return (
//       <div key={fieldPath} className="mb-6 p-4 bg-black/40 rounded-2xl border border-gray-800">
//         <label className="text-[10px] text-gray-500 font-bold uppercase mb-4 block tracking-widest">
//           {key} Gallery
//         </label>
//         <div className="grid grid-cols-3 gap-4">
//           {value.map((url, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 if (isEditing) {
//                   activePathRef.current = `${fieldPath}.${index}`;
//                   fileInputRef.current.click();
//                 }
//               }}
//               className={`relative h-24 rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-black ${
//                 isEditing ? "border-cyan-500 cursor-pointer shadow-lg shadow-cyan-500/10" : "border-gray-800"
//               }`}
//             >
//               <img src={url} alt="Gallery" className="max-w-full max-h-full object-contain p-2" />
//               {isEditing && (
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                   <HiOutlineUpload className="text-cyan-400" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // If it's a normal array (not images), render children
//   return (
//     <div key={fieldPath} className="mb-6 border-l border-gray-800 pl-4">
//       <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block">{key}</label>
//       {value.map((item, i) => renderFields(item, `${fieldPath}.${i}`))}
//     </div>
//   );
// }

// // 3. SINGLE MEDIA UPLOADER (Updated to handle direct URLs better)
// if (isMediaUrl && !lowerKey.includes("learnmore") && !lowerKey.includes("button")) {
//     const mediaUrl = value?.url ? (typeof value.url === "string" ? value.url : value.url.url) : value;
//     const isIcon = lowerKey.includes("icon");

//     return (
//       <div key={fieldPath} className="mb-6 p-4 bg-black/40 rounded-2xl border border-gray-800">
//         <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">
//           {key}
//         </label>
//         <div
//           onClick={() => {
//             if (isEditing) {
//               activePathRef.current = value.url ? `${fieldPath}.url` : fieldPath;
//               fileInputRef.current.click();
//             }
//           }}
//           className={`relative rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-black ${
//             isIcon ? "h-24 w-24" : "h-48 w-full"
//           } ${isEditing ? "border-cyan-500 cursor-pointer" : "border-gray-800"}`}
//         >
//           <img src={mediaUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
//           {isEditing && (
//             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//               <HiOutlineUpload className="text-cyan-400 text-xl" />
//             </div>
//           )}
//         </div>
//       </div>
//     );
// }

//       // 4. OBJECT RECURSION (Buttons/Nested Cards)
//       if (value && typeof value === "object" && !Array.isArray(value)) {
//         return (
//           <div
//             key={fieldPath}
//             className="mb-4 border-l border-gray-800/30 pl-4"
//           >
//             <label className="text-[10px] text-cyan-400 font-black uppercase mb-2 block tracking-widest">
//               {key}
//             </label>
//             {renderFields(value, fieldPath)}
//           </div>
//         );
//       }

//       if (Array.isArray(value))
//         return (
//           <div key={fieldPath} className="mb-6 border-l border-gray-800 pl-4">
//             {value.map((item, i) => renderFields(item, `${fieldPath}.${i}`))}
//           </div>
//         );

//       return null;
//     });
//   };

//   return (
//     <div className="flex flex-col h-full font-manrope">
//       <Toaster position="top-right" />

//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//       {/* File size error message */}
//       {fileError && (
//         <div className="text-sm text-red-400 mb-3">{fileError}</div>
//       )}
//       <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
//         <h2 className="text-xl font-bold uppercase tracking-tight">
//           Section: <span className="text-cyan-400">{section.id}</span>
//         </h2>
//         <div className="flex gap-4">
//           {!isEditing ? (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-full font-bold uppercase text-xs transition-all"
//             >
//               Edit Section
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={() => {
//                   setFormData(section);
//                   setIsEditing(false);
//                 }}
//                 className="text-gray-400 hover:text-white uppercase text-xs font-bold transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => onSave(formData)}
//                 className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-2 rounded-full font-bold shadow-lg shadow-cyan-500/20 uppercase text-xs transition-all"
//               >
//                 Save Changes
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//       <div className="overflow-y-auto pr-2 custom-scrollbar">
//         {renderFields(formData)}
//       </div>
//     </div>
//   );
// };

// export default DynamicEditor;





import React, { useState, useEffect, useRef } from "react";
import { HiOutlineUpload } from "react-icons/hi";

const DynamicEditor = ({ section, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const activePathRef = useRef("");
  const [fileError, setFileError] = useState("");
  const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB - keep consistent with backend
  const [imagePreviews, setImagePreviews] = useState({});


  useEffect(() => { if (section) { setFormData(section); setIsEditing(false); } }, [section]);

  const updateField = (path, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Frontend validation: enforce same limit as backend
      if (file.size > MAX_UPLOAD_BYTES) {
        setFileError('File is too large. Maximum allowed size is 5 MB.');
        e.target.value = '';
        return;
      }

      setFileError('');
      const previewUrl = URL.createObjectURL(file);

      // store preview ONLY for UI
      setImagePreviews(prev => ({
        ...prev,
        [activePathRef.current]: previewUrl
      }));

      // store file ONLY for upload
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));

    }
  };

  const renderFields = (data, path = "") => {
    return Object.entries(data).map(([key, value]) => {
      const fieldPath = path ? `${path}.${key}` : key;
      if (["id", "imagefile", "dbid", "_id", "__v"].includes(key.toLowerCase())) return null;

      const lowerKey = key.toLowerCase();
      // Media detection (Cloudinary, local paths, or Blobs)
      const isMediaUrl = typeof value === "string" && (
        value.includes("cloudinary") ||
        value.startsWith("blob:") ||
        /\.(png|jpg|jpeg|svg|webp)$/.test(value)
      );

      // 1. TEXT HANDLER
      if (typeof value === "string" && !isMediaUrl) {
        const isLong = value.length > 60;
        return (
          <div key={fieldPath} className="mb-4 flex flex-col">
            <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 ml-1">{key}</label>
            {isLong ? (
              <textarea disabled={!isEditing} value={value || ""} onChange={(e) => updateField(fieldPath, e.target.value)}
                className={`bg-transparent border rounded-xl p-3 text-sm min-h-[100px] outline-none transition-all ${isEditing ? "border-cyan-400 text-white" : "border-gray-800 text-gray-500"}`} />
            ) : (
              <input disabled={!isEditing} type="text" value={value || ""} onChange={(e) => updateField(fieldPath, e.target.value)}
                className={`bg-transparent border rounded-full px-4 py-2 text-sm outline-none transition-all ${isEditing ? "border-cyan-400 text-white" : "border-gray-800 text-gray-500"}`} />
            )}
          </div>
        );
      }

      // 2. GALLERY HANDLER (Multi-image support)
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string" && isMediaUrl) {
        return (
          <div key={fieldPath} className="mb-6 p-4 bg-black/40 rounded-2xl border border-gray-800">
            <label className="text-[10px] text-gray-500 font-bold uppercase mb-4 block tracking-widest">{key} Gallery</label>
            <div className="grid grid-cols-3 gap-4">
              {value.map((url, index) => (
                <div key={index} onClick={() => { if (isEditing) { activePathRef.current = `${fieldPath}.${index}`; fileInputRef.current.click(); } }}
                  className={`relative h-24 rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-black ${isEditing ? "border-cyan-500 cursor-pointer shadow-lg shadow-cyan-500/10" : "border-gray-800"}`}>
                  <img src={url} alt="Gallery" className="max-w-full max-h-full object-contain p-2" />
                  {isEditing && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><HiOutlineUpload className="text-cyan-400" /></div>}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 3. MEDIA UPLOADER (Icons/Images)
      // Added exclusion for 'learnMore' and 'button' keys to prevent them from rendering as images
      if (((value && typeof value === 'object' && value.url) || isMediaUrl) &&
        !lowerKey.includes("learnmore") &&
        !lowerKey.includes("button")) {

        const mediaUrl =
          imagePreviews[fieldPath] ||
          imagePreviews[`${fieldPath}.url`] ||
          (value?.url ?? value);

        const isIcon = lowerKey.includes("icon");

        return (
          <div key={fieldPath} className="mb-6 p-4 bg-black/40 rounded-2xl border border-gray-800">
            <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">{key}</label>
            <div onClick={() => { if (isEditing) { activePathRef.current = value.url ? `${fieldPath}.url` : fieldPath; fileInputRef.current.click(); } }}
              className={`relative rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-black ${isIcon ? 'h-24 w-24' : 'h-48 w-full'} ${isEditing ? "border-cyan-500 cursor-pointer" : "border-gray-800"}`}>
              <img src={mediaUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              {isEditing && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><HiOutlineUpload className="text-cyan-400 text-xl" /></div>}
            </div>
          </div>
        );
      }

      // 4. OBJECT RECURSION (Buttons/Nested Cards)
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return (
          <div key={fieldPath} className="mb-4 border-l border-gray-800/30 pl-4">
            <label className="text-[10px] text-cyan-400 font-black uppercase mb-2 block tracking-widest">{key}</label>
            {renderFields(value, fieldPath)}
          </div>
        );
      }

      if (Array.isArray(value)) return <div key={fieldPath} className="mb-6 border-l border-gray-800 pl-4">{value.map((item, i) => renderFields(item, `${fieldPath}.${i}`))}</div>;

      return null;
    });
  };

  return (
    <div className="flex flex-col h-full font-manrope">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      {/* File size error message */}
      {fileError && <div className="text-sm text-red-400 mb-3">{fileError}</div>}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight">Section: <span className="text-cyan-400">{section.id}</span></h2>
        <div className="flex gap-4">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-full font-bold uppercase text-xs transition-all">Edit Section</button>
          ) : (
            <>
              <button onClick={() => { setFormData(section); setIsEditing(false); }} className="text-gray-400 hover:text-white uppercase text-xs font-bold transition-all">Cancel</button>
              <button onClick={() => onSave(formData)} className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-2 rounded-full font-bold shadow-lg shadow-cyan-500/20 uppercase text-xs transition-all">Save Changes</button>
            </>
          )}
        </div>
      </div>
      <div className="overflow-y-auto pr-2 custom-scrollbar">{renderFields(formData)}</div>
    </div>
  );
};

export default DynamicEditor;