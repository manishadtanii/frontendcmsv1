import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DynamicEditor from "../components/DynamicEditor";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../services/apiService";
import {
  HiOutlineChevronDown,
  HiOutlineLogout,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUserCircle,
  HiOutlineUser,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // PERSISTENCE: Initialize state from localStorage to keep sidebar selection
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activeCmsPage") || "home";
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem("activeCmsSection") || "";
  });

  const [cmsData, setCmsData] = useState({});
  const [loading, setLoading] = useState(true);

  // Contacts & Users management UI
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(false);

  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  // Contact edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const BASE_URL = `${API_BASE_URL}/pages`;

  const PAGE_PATHS = [
    "home",
    "about",
    "services",
    "contact",
    "services/tvg-management",
    "services/tvg-stream",
    "services/tvg-books",
    "services/tvg-connect",
    "services/tvg-verify",
    "services/tvg-reporting",
  ];

  // Logic to prevent character splitting and [object Object] errors
  const unboxData = (data) => {
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === "object") return unboxData(parsed);
      } catch (e) {
        return data;
      }
    }
    if (Array.isArray(data)) {
      const isMedia =
        data.length > 0 &&
        typeof data[0] === "string" &&
        (data[0].includes("cloudinary") ||
          /\.(png|jpg|jpeg|svg|webp)$/.test(data[0]));
      if (isMedia) return data;
      if (data.length === 1 && typeof data[0] === "string") return data[0];
      return data.map(unboxData);
    }
    if (data !== null && typeof data === "object") {
      const cleaned = {};
      for (let [key, value] of Object.entries(data)) {
        if (
          ["_id", "__v", "dbid", "content", "createdAt", "updatedAt"].includes(
            key
          )
        )
          continue;
        cleaned[key] = unboxData(value);
      }
      return cleaned;
    }
    return data;
  };

  const fetchPageData = async (pageSlug) => {
    try {
      const response = await fetch(`${BASE_URL}/${pageSlug}`);
      const json = await response.json();
      if (json.data?.sections) {
        const formatted = json.data.sections.map((s) => ({
          id: s.sectionKey,
          ...unboxData(s.content),
        }));
        setCmsData((prev) => ({ ...prev, [pageSlug]: formatted }));
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("activeCmsPage", activePage);
    localStorage.setItem("activeCmsSection", activeId);
  }, [activePage, activeId]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all(PAGE_PATHS.map((path) => fetchPageData(path)));
      setLoading(false);
    };
    init();
  }, []);

  const fetchContactsList = async () => {
    setContactsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contacts?limit=200`);
      const json = await res.json();
      if (json.data && json.data.contacts) setContacts(json.data.contacts);
    } catch (err) {
      console.error("Fetch contacts error", err);
      toast.error("Failed to fetch contacts");
    } finally {
      setContactsLoading(false);
    }
  };

  const handleToggleContacts = async () => {
    const next = !showContacts;
    setShowContacts(next);
    setShowUsers(false);
    // Unselect the active sidebar section when opening contacts
    // setActiveId("");
    if (next && contacts.length === 0) await fetchContactsList();
  };

  const fetchUsersList = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`);
      const json = await res.json();
      if (json.data) setUsers(json.data);
    } catch (err) {
      console.error("Fetch users error", err);
      toast.error("Failed to fetch users");
    }
  };

  const handleToggleUsers = async () => {
    const next = !showUsers;
    setShowUsers(next);
    setShowContacts(false);
    // Unselect the active sidebar section when opening users
    // setActiveId("");
    if (next && users.length === 0) await fetchUsersList();
  };

  const handleDeleteContact = async (id) => {
    if (!confirm("Delete this contact?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        toast.success("Contact deleted");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const json = await res.json();
        setContacts((prev) => prev.map((c) => (c._id === id ? json.data : c)));
        toast.success("Contact updated");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Open edit modal pre-filled with contact data
  const openEditContact = (contact) => {
    setEditContact({ ...contact });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditContact(null);
  };

  const handleSaveContact = async () => {
    if (!editContact || !editContact._id) return;
    const id = editContact._id;
    // ensure servicesNeeded is an array
    let services = editContact.servicesNeeded;
    if (typeof services === "string") {
      services = services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const payload = {
      firstName: editContact.firstName,
      contactName: editContact.contactName,
      contactEmail: editContact.contactEmail,
      contactNumber: editContact.contactNumber,
      servicesNeeded: services,
      notes: editContact.notes,
      status: editContact.status,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        setContacts((prev) => prev.map((c) => (c._id === id ? json.data : c)));
        toast.success("Contact saved");
        closeEditModal();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Save failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  useEffect(() => {
    if (cmsData[activePage]?.length > 0) {
      const exists = cmsData[activePage].some((s) => s.id === activeId);
      if (!exists) setActiveId(cmsData[activePage][0].id);
    }

    // Hide Contacts / Users panels when navigating to a page/section
    if (showContacts) setShowContacts(false);
    if (showUsers) setShowUsers(false);
  }, [activePage, cmsData]);

   const handleUpdateSection = async (updatedData) => {
    const formData = new FormData();
    const { id, imageFile, ...content } = updatedData;

    // Append individual fields for Multer
    Object.keys(content).forEach(key => {
      let value = content[key];

      // ❌ block blob strings
      if (typeof value === "string" && value.startsWith("blob:")) return;

      // ❌ clean blob inside objects
      if (typeof value === "object" && value !== null) {
        const safe = JSON.stringify(value, (k, v) =>
          typeof v === "string" && v.startsWith("blob:") ? undefined : v
        );
        formData.append(key, safe);
      } else {
        formData.append(key, value);
      }
    });


    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    const loadId = toast.loading("Saving changes...");

    try {
      const res = await fetch(`${BASE_URL}/sections/${activePage}/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        const responseData = await res.json();

        console.log("Update response data:", responseData);

        // IMMEDIATE UI UPDATE
        setCmsData(prev => {
          const pageData = [...(prev[activePage] || [])];
          const idx = pageData.findIndex(s => s.id === id);
          if (idx > -1) {
            pageData[idx] = { id, ...unboxData(responseData.data.content) };
          }
          return { ...prev, [activePage]: pageData };
        });

        toast.success("Section updated successfully!", { id: loadId });
      } else {
        const err = await res.json().catch(() => ({ message: "Server Error" }));
        toast.error(`Save failed: ${err.message}`, { id: loadId });
      }
    } catch (err) {
      toast.error("Network Error", { id: loadId });
    }
  };

  const activeSection = (cmsData[activePage] || []).find(
    (s) => s.id === activeId
  );
  console.log("Rendering Dashboard:", activeSection);

  return (
    <div className="flex min-h-screen bg-[#05080a] text-white p-6 gap-6 font-manrope">
      <Toaster position="top-right" />
      <Sidebar
        cmsData={cmsData}
        activePage={activePage}
        activeSectionId={activeId}
        onPageChange={setActivePage}
        onSectionChange={setActiveId}
      />
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <header className="flex items-center justify-between bg-[#0a0f14]/80 border border-gray-800 rounded-[30px] px-8 py-4 relative">
          <h1 className="text-xl font-bold capitalize">
            Editing:{" "}
            <span className="text-cyan-400">
              {activePage.split("/").pop().replace(/-/g, " ")}
            </span>
          </h1>

          <div className="relative">
            {/* Profile Icon Trigger */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 border border-gray-800 hover:border-cyan-400 transition-all text-cyan-400"
            >
              <HiOutlineUserCircle className="text-2xl" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>

                <div className="absolute right-0 mt-3 w-48 bg-[#0b1318] border border-gray-800 rounded-2xl shadow-2xl z-20 overflow-hidden py-1">
                  <button
                    onClick={() => {
                      navigate("/admin/change-password");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <HiOutlineLockClosed className="text-lg text-cyan-500" />
                    <span>Forgot Password</span>
                  </button>

                    <button
                    onClick={handleToggleUsers}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <HiOutlineUser className="text-lg text-cyan-500" />
                    <span>User</span>
                  </button>

                  <button
                    onClick={handleToggleContacts}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <HiOutlineMail className="text-lg text-cyan-500" />
                    <span>Contact</span>
                  </button>
                

                  <div className="border-t border-gray-800 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <HiOutlineLogout className="text-lg" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>
        {/* <div className="flex items-center justify-between">
          {!showContacts && !showUsers && (
            <h1 className="text-2xl font-bold capitalize px-4">
              Editing:{" "}
              <span className="text-cyan-400">
                {activePage.split("/").pop().replace(/-/g, " ")}
              </span>
            </h1>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleToggleContacts}
              className={`px-4 py-2 rounded-full ${
                showContacts ? "bg-cyan-500 text-black" : "bg-gray-800"
              }`}
            >
              Contacts
            </button>
            <button
              onClick={handleToggleUsers}
              className={`px-4 py-2 rounded-full ${
                showUsers ? "bg-cyan-500 text-black" : "bg-gray-800"
              }`}
            >
              Users
            </button>
          </div>
        </div> */}
        <div className="flex-1 bg-[#0a0f14]/80 border border-gray-800 rounded-[40px] p-10 overflow-y-auto custom-scrollbar">
          {loading && Object.keys(cmsData).length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">
              Syncing APIs...
            </div>
          ) : activeSection ? (
            <DynamicEditor
              key={`${activePage}-${activeId}`}
              section={activeSection}
              onSave={handleUpdateSection}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl">
              <p>Select a section to begin.</p>
            </div>
          )}

          {/* Edit Contact Modal */}
          {showEditModal && editContact && (
            <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-white/10"
                onClick={closeEditModal}
              ></div>
              <div className="bg-[#0b1318] rounded-2xl p-6 z-10 w-full max-w-2xl">
                <h3 className="text-xl font-bold mb-4">Edit Contact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={editContact.firstName || ""}
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded"
                    placeholder="First Name"
                  />
                  <input
                    value={editContact.contactName || ""}
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        contactName: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded"
                    placeholder="Contact Name"
                  />
                  <input
                    value={editContact.contactEmail || ""}
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        contactEmail: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded col-span-2"
                    placeholder="Email"
                  />
                  <input
                    value={editContact.contactNumber || ""}
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        contactNumber: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded"
                    placeholder="Phone"
                  />
                  <input
                    value={
                      Array.isArray(editContact.servicesNeeded)
                        ? editContact.servicesNeeded.join(", ")
                        : editContact.servicesNeeded || ""
                    }
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        servicesNeeded: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded col-span-2"
                    placeholder="Services (comma separated)"
                  />
                  <select
                    value={editContact.status || "new"}
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded"
                  >
                    <option value="new">new</option>
                    <option value="pending">pending</option>
                    <option value="closed">closed</option>
                  </select>
                  <textarea
                    value={editContact.notes || ""}
                    onChange={(e) =>
                      setEditContact((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className="p-2 bg-transparent border rounded col-span-2"
                    placeholder="Notes"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={closeEditModal}
                    className="px-4 py-2 rounded bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveContact}
                    className="px-4 py-2 rounded bg-cyan-500 text-black font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showContacts && (
          <div className="fixed top-0 left-0 overflow-auto flex h-full w-full justify-center items-center bg-[#0a0f14]/80 z-40 p-6 ">
            <div
              className="absolute top-6 right-6 text-gray-500 hover:text-white cursor-pointer  bg-black w-10 h-10 rounded-[50%] flex justify-center items-center"
              onClick={handleToggleContacts}
            >
              <i className="fas fa-times"></i>
            </div>
            <div className="bg-[#0a0f14] border border-gray-800 rounded-[40px] p-10 overflow-y-auto custom-scrollbar">
              {contactsLoading ? (
                <div className="text-gray-500">Loading contacts...</div>
              ) : (
                <table className="w-full table-auto text-left border-collapse">
                  <thead>
                    <tr className="text-sm text-gray-400">
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Phone</th>
                      <th className="p-2">Services</th>
                      <th className="p-2">Preferred</th>
                      <th className="p-2">Created</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c._id} className="border-t border-gray-800">
                        <td className="p-2">
                          {c.firstName || c.contactName || "-"}
                        </td>
                        <td className="p-2">{c.contactEmail || "-"}</td>
                        <td className="p-2">{c.contactNumber || "-"}</td>
                        <td className="p-2">
                          {c.servicesNeeded && c.servicesNeeded.length
                            ? c.servicesNeeded.join(", ")
                            : "-"}
                        </td>
                        <td className="p-2">
                          {c.preferredDate
                            ? new Date(c.preferredDate).toLocaleDateString
                              ? new Date(c.preferredDate).toLocaleDateString()
                              : c.preferredDate
                            : "-"}
                        </td>
                        <td className="p-2">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleString()
                            : "-"}
                        </td>
                        <td className="p-2">
                          <select
                            defaultValue={c.status}
                            onChange={(e) =>
                              handleUpdateContactStatus(c._id, e.target.value)
                            }
                            className="bg-black text-white text-sm rounded px-2 py-1"
                          >
                            <option value="new">new</option>
                            <option value="pending">pending</option>
                            <option value="closed">closed</option>
                          </select>
                        </td>
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => openEditContact(c)}
                            className="px-3 py-1 rounded bg-yellow-400 text-black font-medium hover:shadow-md"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteContact(c._id)}
                            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
        {showUsers && (
          <div className="fixed top-0 left-0 overflow-auto flex h-full w-full justify-center items-center bg-[#0a0f14]/80 z-40 p-6">
            <div
              className="absolute top-6 right-6 text-gray-500 hover:text-white cursor-pointer  bg-black w-10 h-10 rounded-[50%] flex justify-center items-center"
              onClick={handleToggleUsers}
            >
              <i className="fas fa-times"></i>
            </div>
            <div className="bg-[#0a0f14] border border-gray-800 rounded-[40px] p-10 overflow-y-auto custom-scrollbar">
              <h3 className="text-cyan-400 mb-4">Users</h3>
              <table className="w-full table-auto text-left border-collapse">
                <thead>
                  <tr className="text-sm text-gray-400">
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Verified</th>
                    <th className="p-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t border-gray-800">
                      <td className="p-2">{u.email}</td>
                      <td className="p-2">{u.role}</td>
                      <td className="p-2">{u.verified ? "Yes" : "No"}</td>
                      <td className="p-2">
                        {new Date(u.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
