import { useEffect, useState } from "react";
import { Header, Hero, Main, Contact, Footer } from "./imports";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel";
import AdminPage from "./components/admin/AdminPage";
import AdminLoginButton from "./components/admin/AdminLoginButton";
import ProjectFormDemo from "./components/admin/ProjectFormDemo";
import FeaturedProjectsCarousel from "./components/featured/FeaturedProjectsCarousel";
import ProjectDetail from "./components/project-details/ProjectDetail";
import TestNavigation from "./components/TestNavigation";
import { useTheme } from "./contexts/ThemeContext";

const AppContent = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="up" className="container">
              <Header />
              <section id="hero">
                <Hero />
              </section>
              <div className="divider" />
              <section id="featured-projects">
                <FeaturedProjectsCarousel />
              </section>
              <div className="divider" />
              <section id="projects">
                <Main />
              </section>
              <div className="divider" />
              <section id="contact">
                <Contact />
              </section>
              <div className="divider" />
              <Footer />
              <a
                style={{ opacity: showScrollBtn ? 1 : 0, transition: "1s" }}
                href="#up"
              >
                <button className="icon-arrow-up scroll2Top"></button>
              </a>
              <AdminLoginButton />
            </div>
          }
        />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/test" element={<TestNavigation />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/projects" element={<AdminPage />} />
        <Route path="/demo" element={<ProjectFormDemo />} />
      </Routes>
    </Router>
  );
};

function App() {
  return <AppContent />;
}

export default App;