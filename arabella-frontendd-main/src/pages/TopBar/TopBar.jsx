import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// ...existing code...
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Calendar,
  UserCircle,
} from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // ...existing code...

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dropdown State
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ 1. AUTO-LOGOUT CHECK
  // If Redux says we are logged in, but LocalStorage has no token, force logout.
  // ...existing code...

  // Scroll & Outside Click Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  // ...existing code...

  const handleProfileClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  // ...existing code...

  const handleBookNow = () => {
    navigate("/rooms");
    setIsMenuOpen(false);
  };

  const handleMyBookings = () => {
    navigate("/my-bookings");
    setShowDropdown(false);
  };

  return (
    <div className={`${styles.mainNav} ${isScrolled ? styles.stickyShadow : ""}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logoGroup}>
            <span className={styles.logoText}>ARABELLA</span>
            <span className={styles.logoSub}>MOTOR INN</span>
          </Link>

          {/* Nav Links */}
          <nav className={styles.navLinks}>
            <Link to="/" className={isActive("/") ? styles.linkActive : ""}>
              Home
            </Link>
            <Link to="/about" className={isActive("/about") ? styles.linkActive : ""}>
              About Us
            </Link>
            {/* Rooms link removed */}
            <Link to="/gallery" className={isActive("/gallery") ? styles.linkActive : ""}>
              Gallery
            </Link>
            <Link to="/contact" className={isActive("/contact") ? styles.linkActive : ""}>
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <a
              className={styles.bookBtn}
              href="https://book-directonline.com/properties/southtweedmidirect"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK NOW
            </a>
            <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenuContainer} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.mobileLinks}>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/about" onClick={handleLinkClick}>About Us</Link>
          {/* Rooms link removed from mobile menu */}
          <Link to="/gallery" onClick={handleLinkClick}>Gallery</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          <div className={styles.mobileBtnWrapper}>
            <a
              className={styles.contactBtnMobile}
              href="https://book-directonline.com/properties/southtweedmidirect"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
