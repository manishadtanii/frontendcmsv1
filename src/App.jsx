import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutWrapper from "./components/LayoutWrapper";
import Service from "./pages/Service";
import ServiceDetails from "./pages/ServiceDetails";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import ThankYouPage from "./components/ThankYouPage";
import AdminLogin from "./cms/admin/AdminLogin";
import ForgotPassword from "./cms/admin/ForgotPassword";
import ResetSuccess from "./cms/admin/ResetSuccess";
import Dashboard from "./cms/admin/Dashboard";
import ProtectedRoute from "./cms/components/ProtectedRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of each animation (ms)
      delay: 1000, // 👈 Global delay before each animation starts
      once: true,
      mirror: false,
    });
  }, []);
  // Re-initialize whenever `data` changes
  useEffect(() => {
    AOS.refresh();
  });
  return (
    <Router>
      <ScrollToTop />
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Service />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route
            path="/thank-you"
            element={
              <ThankYouPage
                title={"Thank you for filling the form!"}
                message="We’ll send a confirmation email within 24 hours once you submit your request. If you haven’t received it by then, please contact our office to confirm we’ve received your scheduling request."
                btnText={"Go back to Home Page"}
                btnLink={"/"}
              />
            }
          />
          <Route
            path="/*"
            element={
              <ThankYouPage
                title={"Error 404: Page not found"}
                message="The page you are looking for might have been removed, had its name changed or is temporarily unavailable"
                btnText={"Go back to Home Page"}
                btnLink={"/"}
              />
            }
          />
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/change-password"
            element={
                <ForgotPassword />
              // <ProtectedRoute>
              //   <ForgotPassword />
              // </ProtectedRoute>
            }
          />
          <Route path="/admin/reset-success" element={<ResetSuccess />} />
          // App.jsx
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
