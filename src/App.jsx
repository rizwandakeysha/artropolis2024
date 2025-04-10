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
import NotFound from "./components/NotFound"; // Halaman 404
import Layout1 from "./components/resources/Layout"; // Layout yang berisi background

function App() {
  // Fungsi untuk mengecek apakah cookies 'visitorName' sudah ada
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  // Mengecek apakah visitor sudah pernah mengisi form
  const visitorName = getCookie("visitorName");

  return (
    <Router>
      <Layout1>
        <Routes>
          {/* Halaman Utama */}
          {!visitorName ? (
            <Route path="/ddd" element={<VisitorForm />} />
          ) : (
            <Route path="/" element={<UserGallery />} />
          )}

          <Route path="/visitorForm" element={<VisitorForm />} />

          {/* Halaman khusus admin */}
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

          {/* Halaman Tambahan */}
          <Route
            path="/glimpse-of-artropolis"
            element={<GlimpseOfArtropolis />}
          />
          <Route path="/champions" element={<Champions />} />
          <Route path="/seniman" element={<Seniman />} />

          {/* Rute dinamis dengan satu parameter kategori */}
          <Route path="/:kategori" element={<KategoriPage />} />

          {/* Halaman Detail Karya */}
          <Route path="/:kategori/:judul_karya" element={<DetailKarya />} />

          {/* Route wildcard untuk menangani path lainnya */}
          <Route path="*" element={<NotFound />} />

          {/* Halaman 404 */}
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Layout1>
    </Router>
  );
}

export default App;
