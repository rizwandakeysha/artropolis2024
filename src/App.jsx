import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserGallery from "./components/User/UserGallery";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import AddAdmin from "./components/Admin/AddAdmin";
import VisitorForm from "./components/VisitorForm";
import AdminKarya from "./components/Admin/AdminKarya";
import AdminPembuat from "./components/Admin/AdminPembuat";
import VisitorList from "./components/Admin/VisitorList";
import GlimpseOfArtropolis from "./components/User/GlimpseofArtropolis";
import Champions from "./components/User/Champions";
import Seniman from "./components/User/Seniman";
import KategoriPage from "./components/User/KategoriPage";
import DetailKarya from "./components/User/DetailKarya";
import NotFound from "./components/NotFound";
import Layout1 from "./components/resources/Layout";

import Fotografi from "./components/User/kategori/Fotografi";

function App() {
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  const visitorName = getCookie("visitorName");

  return (
    <Router>
      <Layout1>
        <Routes>
          {/* Jika belum isi nama, redirect ke form */}
          <Route
            path="/"
            element={
              visitorName ? (
                <UserGallery />
              ) : (
                <Navigate to="/visitorForm" replace />
              )
            }
          />

          <Route path="/visitorForm" element={<VisitorForm />} />

          {/* Halaman admin */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-admin"
            element={
              <PrivateRoute>
                <AddAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/karya"
            element={
              <PrivateRoute>
                <AdminKarya />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pembuat"
            element={
              <PrivateRoute>
                <AdminPembuat />
              </PrivateRoute>
            }
          />
          <Route path="/admin/visitor" element={<VisitorList />} />

          {/* Halaman user */}
          <Route
            path="/glimpse-of-artropolis"
            element={<GlimpseOfArtropolis />}
          />
          <Route path="/champions" element={<Champions />} />
          <Route path="/seniman" element={<Seniman />} />
          <Route path="/:kategori" element={<KategoriPage />} />
          <Route path="/:kategori/:judul_karya" element={<DetailKarya />} />

          {/* Halaman Kategori */}
          <Route path="/fotografi" element={<Fotografi />} />

          {/* Halaman 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Layout1>
    </Router>
  );
}

export default App;
