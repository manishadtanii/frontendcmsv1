// import { motion, AnimatePresence } from "framer-motion";
// import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
// import { FaLinkedin, FaFacebook, FaChevronDown } from "react-icons/fa";
// import Arrow from "../../components/Arrow";
// import Select from "react-select";
// import Form from "./FormSubmit";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function FormSubmit() {
  
//   const [loading, setLoading] = useState(false);
//   const [fileError, setFileError] = useState("");
//   const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB - keep consistent with backend
//   const navigate = useNavigate();
//   const options = [
//     { value: "Court Reporter", label: "Court Reporter" },
//     { value: "Videographer", label: "Videographer" },
//     {
//       value: "Interactive Realtime In Person",
//       label: "Interactive Realtime In Person",
//     },
//     { value: "Streaming Realtime", label: "Streaming Realtime" },
//     { value: "Daily Draft", label: "Daily Draft" },
//     { value: "Expedited Delivery", label: "Expedited Delivery" },
//     { value: "Extra Laptop for Witness", label: "Extra Laptop for Witness" },
//   ];
//   const handleSelectionChange = (selected) => {
//     console.log("Selected:", selected);
//   };
//   // ✅ handle form submit with fetch
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent normal page reload
//     setLoading(true);

//     const formData = new FormData(e.target);

//     try {
//       const response = await fetch(
//         // "https://formsubmit.co/ajax/jitender@digicots.com",
//         "https://formsubmit.co/ajax/info@thevarallogroup.com",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       console.log("Response:", data);

//       if (data.success === "true") {
//         navigate("/thank-you");
//         // alert("Form submitted successfully!");
//         e.target.reset(); // clear form
//       } else {
//         alert("Something went wrong!");
//       }
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       alert("Error submitting form.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.6 },
//     }),
//   };
//   return (
//     <div className="w-full">
//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 1 }}
//         className=" bg-white rounded-2xl shadow-sm  md:p-8"
//       >
//         <h3 className="text-3xl font-semibold font-manrope text-center mb-2">
//           Schedule a deposition
//         </h3>
//         <p className="text-p lg:text-xl font-manrope text-center mb-6">
//           Once you submit your request, we’ll send a confirmation email within
//           24 hours. If you haven’t received it by then, please contact our
//           office to confirm we’ve received your scheduling request.
//         </p>

//         {/* Form */}
//         <motion.form
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid md:grid-cols-2 gap-6"
//           enctype="multipart/form-data"
//         >
//           {/* Prevent spam bots */}
//           <input type="hidden" name="_captcha" value="false" />
//           {/* Redirect after submission (optional) */}
//           <input
//             type="hidden"
//             name="_next"
//             value="https://thevarallogroup.com/thank-you"
//           />
//           {/* Firm Name */}
//           <motion.div custom={0} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl ">
//               First Name*
//             </label>
//             <input
//               type="text"
//               name="First_Name"
//               required
//               placeholder="Enter first name"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Attorney Name */}
//           <motion.div custom={1} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Attorney Name
//             </label>
//             <input
//               type="text"
//               name="Attorney_Name"
//               required
//               placeholder="Enter attorney name"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Contact Number */}
//           <motion.div custom={2} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Contact Number*
//             </label>
//             <input
//               type="text"
//               name="Contact_Number"
//               required
//               placeholder="Enter contact number"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Contact Name */}
//           <motion.div custom={3} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Contact Name
//             </label>
//             <input
//               type="text"
//               name="Contact_Name"
//               required
//               placeholder="Enter contact name"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Contact Email */}
//           <motion.div
//             custom={4}
//             variants={fadeInUp}
//             className="md:col-span-2 mb-3"
//           >
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Contact Email Address*
//             </label>
//             <input
//               type="email"
//               name="Contact_Email"
//               required
//               placeholder="Enter email address"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Section Title */}
//           <motion.h4
//             custom={5}
//             variants={fadeInUp}
//             className="md:col-span-2 font-bold text-p  font-manrope mt-4"
//           >
//             Proceeding Information
//           </motion.h4>

//           {/* Preferred Date */}
//           <motion.div custom={6} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Preferred Date
//             </label>
//             <input
//               type="date"
//               name="Preferred_Date"
//               required
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Preferred Time */}
//           <motion.div custom={7} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Preferred Time
//             </label>
//             <input
//               type="time"
//               name="Preferred_Time"
//               required
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* State */}
//           <motion.div custom={8} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               State
//             </label>
//             <input
//               type="text"
//               name="State"
//               placeholder="Enter state"
//               required
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//             {/* <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Select State
//             </label>
//             <div className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl">
//               <select name="state" required className="w-full bg-[#F2F2F2]">
//                 <option>Select State</option>
//               </select>
//             </div> */}
//           </motion.div>

//           {/* City */}
//           <motion.div custom={9} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               City
//             </label>
//             <input
//               type="text"
//               name="City"
//               placeholder="Enter city"
//               required
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//            {/*  <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Select City*
//             </label>
//             <div className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl">
//               <select name="city" required className="w-full bg-[#F2F2F2]">
//                 <option>Select City</option>
//               </select>
//             </div> */}
//           </motion.div>

//           {/* Witness */}
//           <motion.div custom={10} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Witness(es)*
//             </label>
//             <input
//               type="text"
//               name="Witnesses"
//               required
//               placeholder="Enter witness(es)"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Estimated Duration */}
//           <motion.div custom={11} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Estimated Duration
//             </label>
//             <input
//               type="text"
//               name="estimated_duration"
//               required
//               placeholder="Enter duration"
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//           </motion.div>

//           {/* Services Needed */}
//           <motion.div custom={12} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Services Needed*
//             </label>
//             {/* <input
//                   type="text"
//                   name="services_needed"
//                   placeholder="Enter services needed"
//                   className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//                 /> */}
//             {/* <MultiSelectDropdown
//                   options={options}
//                   title="Select Services"
//                   onChange={handleSelectionChange}
//                 /> */}
//             {/* <MultiSelect options={options} /> */}
//             <Select
//               defaultValue={[]}
//               isMulti
//               name="Services_Needed"
//               required
//               options={options}
//               className="basic-multi-select border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//               classNamePrefix="select"
//             />
//           </motion.div>

//           {/* File Upload */}
//           <motion.div custom={13} variants={fadeInUp} className="mb-3">
//             <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
//               Upload File
//             </label>
//             <input
//               type="file"
//               name="File"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file && file.size > MAX_UPLOAD_BYTES) {
//                   setFileError('File is too large. Maximum allowed size is 5 MB.');
//                   e.target.value = '';
//                 } else {
//                   setFileError('');
//                 }
//               }}
//               className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
//             />
//             {fileError && <div className="text-red-400 text-sm mt-2">{fileError}</div>}
//           </motion.div>

//           {/* Submit Button */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className=""
//           >
//             <button className={`main-btn flex font-manrope text-white`}>
//               <div className="text bg-secondary text-base lg:text-lg leading-10 py-1 px-6 lg:leading-[40px] rounded-[50px]">
//                 Send Request
//               </div>
//               <Arrow customClass="bg-secondary -rotate-45 " />
//             </button>
//             {/* <Button
//                   text="Start a Conversation"
//                   color={"text-white"}
//                   arrowClass="d"
//                 /> */}
//           </motion.div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// }

// export default FormSubmit;



import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaFacebook, FaChevronDown } from "react-icons/fa";
import Arrow from "../../components/Arrow";
import Select from "react-select";
import Form from "./FormSubmit";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../services/apiConfig"; // backend host override

function FormSubmit() {
  
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const options = [
    { value: "Court Reporter", label: "Court Reporter" },
    { value: "Videographer", label: "Videographer" },
    {
      value: "Interactive Realtime In Person",
      label: "Interactive Realtime In Person",
    },
    { value: "Streaming Realtime", label: "Streaming Realtime" },
    { value: "Daily Draft", label: "Daily Draft" },
    { value: "Expedited Delivery", label: "Expedited Delivery" },
    { value: "Extra Laptop for Witness", label: "Extra Laptop for Witness" },
  ];
  const handleSelectionChange = (selected) => {
    setSelectedServices(selected || []);
  };
  // ✅ handle form submit with fetch
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent normal page reload
    setLoading(true);

    const formData = new FormData(e.target);

    // Append selected services (react-select doesn't put this in native form data)
    if (selectedServices && selectedServices.length > 0) {
      const values = selectedServices.map((s) => s.value);
      formData.append("Services_Needed", JSON.stringify(values));
    }

    try {
      // POST to our backend contact API
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        navigate("/thank-you");
        e.target.reset(); // clear form
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };
  return (
    <div className="w-full">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className=" bg-white rounded-2xl shadow-sm  md:p-8"
      >
        <h3 className="text-3xl font-semibold font-manrope text-center mb-2">
          Schedule a deposition
        </h3>
        <p className="text-p lg:text-xl font-manrope text-center mb-6">
          Once you submit your request, we’ll send a confirmation email within
          24 hours. If you haven’t received it by then, please contact our
          office to confirm we’ve received your scheduling request.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
          enctype="multipart/form-data"
        >
          {/* Prevent spam bots */}
          <input type="hidden" name="_captcha" value="false" />
          {/* Redirect after submission (optional) */}
          <input
            type="hidden"
            name="_next"
            value="https://thevarallogroup.com/thank-you"
          />
          {/* Firm Name */}
          <motion.div custom={0} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl ">
              First Name*
            </label>
            <input
              type="text"
              name="First_Name"
              required
              placeholder="Enter first name"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Attorney Name */}
          <motion.div custom={1} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Attorney Name
            </label>
            <input
              type="text"
              name="Attorney_Name"
              required
              placeholder="Enter attorney name"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Contact Number */}
          <motion.div custom={2} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Contact Number*
            </label>
            <input
              type="text"
              name="Contact_Number"
              required
              placeholder="Enter contact number"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Contact Name */}
          <motion.div custom={3} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Contact Name
            </label>
            <input
              type="text"
              name="Contact_Name"
              required
              placeholder="Enter contact name"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Contact Email */}
          <motion.div
            custom={4}
            variants={fadeInUp}
            className="md:col-span-2 mb-3"
          >
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Contact Email Address*
            </label>
            <input
              type="email"
              name="Contact_Email"
              required
              placeholder="Enter email address"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Section Title */}
          <motion.h4
            custom={5}
            variants={fadeInUp}
            className="md:col-span-2 font-bold text-p  font-manrope mt-4"
          >
            Proceeding Information
          </motion.h4>

          {/* Preferred Date */}
          <motion.div custom={6} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Preferred Date
            </label>
            <input
              type="date"
              name="Preferred_Date"
              required
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Preferred Time */}
          <motion.div custom={7} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Preferred Time
            </label>
            <input
              type="time"
              name="Preferred_Time"
              required
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* State */}
          <motion.div custom={8} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              State
            </label>
            <input
              type="text"
              name="State"
              placeholder="Enter state"
              required
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
            {/* <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Select State
            </label>
            <div className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl">
              <select name="state" required className="w-full bg-[#F2F2F2]">
                <option>Select State</option>
              </select>
            </div> */}
          </motion.div>

          {/* City */}
          <motion.div custom={9} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              City
            </label>
            <input
              type="text"
              name="City"
              placeholder="Enter city"
              required
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
           {/*  <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Select City*
            </label>
            <div className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl">
              <select name="city" required className="w-full bg-[#F2F2F2]">
                <option>Select City</option>
              </select>
            </div> */}
          </motion.div>

          {/* Witness */}
          <motion.div custom={10} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Witness(es)*
            </label>
            <input
              type="text"
              name="Witnesses"
              required
              placeholder="Enter witness(es)"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Estimated Duration */}
          <motion.div custom={11} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Estimated Duration
            </label>
            <input
              type="text"
              name="estimated_duration"
              required
              placeholder="Enter duration"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Services Needed */}
          <motion.div custom={12} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Services Needed*
            </label>
            {/* <input
                  type="text"
                  name="services_needed"
                  placeholder="Enter services needed"
                  className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
                /> */}
            {/* <MultiSelectDropdown
                  options={options}
                  title="Select Services"
                  onChange={handleSelectionChange}
                /> */}
            {/* <MultiSelect options={options} /> */}
            <Select
              defaultValue={[]}
              isMulti
              value={selectedServices}
              onChange={handleSelectionChange}
              name="Services_Needed"
              required
              options={options}
              className="basic-multi-select border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
              classNamePrefix="select"
            />
          </motion.div>

          {/* File Upload */}
          <motion.div custom={13} variants={fadeInUp} className="mb-3">
            <label className="block font-manrope mb-2 font-bold text-base md:text-xl">
              Upload File
            </label>
            <input
              type="file"
              name="File"
              className="border font-manrope rounded-lg px-4 py-3 w-full bg-[#F2F2F2] text-xl"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className=""
          >
            <button className="main-btn flex font-manrope text-white">
              <div className="text bg-secondary text-base lg:text-lg leading-10 py-1 px-6 lg:leading-[40px] rounded-[50px]">
                Send Request
              </div>
              <Arrow customClass="bg-secondary -rotate-45 " />
            </button>
            {/* <Button
                  text="Start a Conversation"
                  color={"text-white"}
                  arrowClass="d"
                /> */}
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default FormSubmit;