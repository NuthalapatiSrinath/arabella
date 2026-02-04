import React from "react";
import styles from "./HomePage.module.css";

// Import sections
import HeroSection from "./sections/HeroSection";
import VideoAmenitiesSection from "./sections/VideoAmenitiesSection";
import RoomShowcase from "./sections/RoomShowcase"; // The video pills
import OwnJourneySection from "./sections/OwnJourneySection"; // ✅ NEW SECTION
import StatsParallax from "./sections/StatsParallax";
import Testimonials from "./sections/Testimonials";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <HeroSection />

      {/* Video Pills */}
      <VideoAmenitiesSection />

      {/* Room Slider */}
      <RoomShowcase />

      {/* ✅ NEW: Own Your Journey (Purple Section) */}
      <OwnJourneySection />

      <StatsParallax />
      <Testimonials />
    </div>
  );
};

export default HomePage;
