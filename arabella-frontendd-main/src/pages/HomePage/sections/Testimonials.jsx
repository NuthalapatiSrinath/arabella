import React, { useState, useRef, useEffect } from "react";
import ClientStoriesCard from "../../../components/ClientStoriesCard/ClientStoriesCard";
import styles from "./Testimonials.module.css";

const stories = [
  {
    name: "SARAH & JAMES (MICRONESIA)",
    image: "https://i.pravatar.cc/300?img=49", // NEW ID
    text: "An absolute hidden gem! The room was spotless and the bed was incredibly comfortable. It felt like a luxury escape without the price tag. We can't wait to come back.",
  },
  {
    name: "MICHAEL T. (INDIAN)",
    image: "https://i.pravatar.cc/300?img=68", // NEW ID
    text: "I travel for business often, and Arabella is now my go-to. The high-speed Wi-Fi and quiet atmosphere made working from my room a breeze. Truly impeccable service.",
  },
  {
    name: "EMILY R. (FRANCE)",
    image: "https://i.pravatar.cc/300?img=44", // NEW ID
    text: "From the moment we arrived, the staff went above and beyond. The location is perfect—close to everything yet so peaceful. A perfect 10/10 experience!",
  },
  {
    name: "DAVID & LISA (TONGA)",
    image: "https://i.pravatar.cc/300?img=53", // NEW ID
    text: "We loved the attention to detail. The pool area is stunning and the room service was prompt. A delightful stay that exceeded our expectations in every way.",
  },
  {
    name: "ALEXANDRA K. (GERMANY)",
    image: "https://i.pravatar.cc/300?img=28", // NEW ID
    text: "Very clean, modern, and friendly. I appreciated the late check-in option and the warm welcome. It felt very safe and secure for a solo traveler.",
  },
  {
    name: "JONATHAN B. (NZ)",
    image: "https://i.pravatar.cc/300?img=8", // NEW ID
    text: "Top-notch hospitality! The room was spacious and the amenities were fantastic. Great value for money near the Gold Coast. Highly recommended!",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      const progress = scrollLeft / totalWidth;
      const index = Math.min(
        stories.length - 1,
        Math.max(0, Math.round(progress * (stories.length - 1)))
      );
      setActiveIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      const targetScroll = (index / (stories.length - 1)) * totalWidth;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Client Stories</h2>

        <div
          className={styles.scrollContainer}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {stories.map((story, idx) => (
            <ClientStoriesCard
              key={idx}
              name={story.name}
              image={story.image}
              text={story.text}
            />
          ))}
        </div>

        <div className={styles.dotsContainer}>
          {stories.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ""}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
