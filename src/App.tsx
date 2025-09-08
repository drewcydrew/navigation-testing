import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

// Section navigation helper
function SectionNav({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash;

  return (
    <nav className="section-nav">
      {sections.map((section) => (
        <button
          key={section.id}
          className={hash === `#${section.id}` ? "active-section" : ""}
          onClick={() => navigate({ hash: `#${section.id}` })}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

function Page({
  title,
  sections,
}: {
  title: string;
  sections: { id: string; label: string; content: string }[];
}) {
  // Scroll to section on hash change
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <div>
      <h2>{title}</h2>
      <SectionNav sections={sections.map(({ id, label }) => ({ id, label }))} />
      <div>
        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ margin: "2em 0" }}>
            <h3>{section.label}</h3>
            <p>{section.content}</p>
            {/* Add more placeholder content for realism */}
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio.
              </li>
              <li>Vitae scelerisque enim ligula venenatis dolor.</li>
              <li>Mauris at tellus at urna condimentum mattis.</li>
            </ul>
            <div style={{ height: 60 }} />
          </section>
        ))}
      </div>
    </div>
  );
}

const pages = [
  {
    path: "/",
    label: "Home",
    element: (
      <Page
        title="Home Page"
        sections={[
          {
            id: "welcome",
            label: "Welcome",
            content:
              "Welcome to the Home page! Here you can find the latest updates and news about our project. Explore the features and get started quickly.",
          },
          {
            id: "features",
            label: "Features",
            content:
              "Here are some features of our app: fast navigation, responsive design, and easy-to-use interface. More features coming soon!",
          },
          {
            id: "start",
            label: "Getting Started",
            content:
              "How to get started with the app: sign up, explore the documentation, and join our community for support.",
          },
        ]}
      />
    ),
  },
  {
    path: "/about",
    label: "About",
    element: (
      <Page
        title="About Page"
        sections={[
          {
            id: "mission",
            label: "Our Mission",
            content:
              "Our mission is to demonstrate navigation best practices in React apps. We aim to make navigation intuitive and accessible.",
          },
          {
            id: "team",
            label: "Team",
            content:
              "Meet our amazing team: developers, designers, and testers all working together to build a great experience.",
          },
          {
            id: "history",
            label: "History",
            content:
              "A brief history of our project: started in 2025, quickly grew thanks to community support and feedback.",
          },
        ]}
      />
    ),
  },
  {
    path: "/contact",
    label: "Contact",
    element: (
      <Page
        title="Contact Page"
        sections={[
          {
            id: "email",
            label: "Email",
            content:
              "Contact us at email@example.com. We respond to all inquiries within 2 business days.",
          },
          {
            id: "phone",
            label: "Phone",
            content:
              "Call us at 123-456-7890. Our support line is open 9am-5pm, Monday to Friday.",
          },
          {
            id: "address",
            label: "Address",
            content:
              "Visit us at 123 Main St. Our office is open to visitors by appointment only.",
          },
        ]}
      />
    ),
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <Router>
      <div className="app-layout">
        <aside className={`main-nav sidebar${sidebarOpen ? " open" : ""}`}>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? "⮜" : "⮞"}
          </button>
          <div className="sidebar-links">
            {pages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) => (isActive ? "active-page" : "")}
                end={page.path === "/"}
              >
                {page.label}
              </NavLink>
            ))}
          </div>
        </aside>
        <main className="main-content">
          <Routes>
            {pages.map((page) => (
              <Route key={page.path} path={page.path} element={page.element} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
