
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Separate customer application layout and pages
import CustomerLayout from "./pages/CustomerLayout.jsx";
import {
  CustomerHome,
  CustomerSearch,
  CustomerBookings,
  CustomerProfile,
} from "./pages/CustomerPages.jsx";

// Separate professional portal layout and pages
import ProviderLayout from "./pages/ProviderLayout.jsx";
import ProviderDashboard from "./pages/ProviderDashboard.jsx";
import {
  BookingRequests,
  MyJobs,
  Earnings,
  ProviderProfile,
  ProviderSettings,
} from "./pages/ProviderPages.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public landing page and authentication */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer application */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route
            index
            element={<Navigate to="home" replace />}
          />
          <Route path="home" element={<CustomerHome />} />
          <Route path="search" element={<CustomerSearch />} />
          <Route path="bookings" element={<CustomerBookings />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* Professional application */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />
          <Route
            path="dashboard"
            element={<ProviderDashboard />}
          />
          <Route
            path="requests"
            element={<BookingRequests />}
          />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="settings" element={<ProviderSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);