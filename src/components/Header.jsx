import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Load theme from localStorage */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  /* Apply theme */
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav className={menuOpen ? "open" : ""}>
      {/* Hamburger */}
      <button
        id="menuToggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>

      {/* Mobile drawer */}
      <div className="mobile-menu">
        <ul id="menuList">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/publications">Publications</Link></li>
          <li><Link to="/speaking">Speaking</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/cv">CV</Link></li>
        </ul>
      </div>

      {/* Theme switch */}
      <div className="theme-switch">
        <input
          id="themeToggle"
          className="theme-switch__input"
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark((v) => !v)}
        />
        <label className="theme-switch__label" htmlFor="themeToggle">
          <span className="theme-switch__slider"></span>
        </label>
      </div>
    </nav>
  );
}

export default Header;
