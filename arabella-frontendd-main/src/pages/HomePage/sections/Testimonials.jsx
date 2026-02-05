import React from "react";
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
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Client Stories</h2>

        <div className={styles.scrollContainer}>
          {stories.map((story, idx) => (
            <ClientStoriesCard
              key={idx}
              name={story.name}
              image={story.image}
              text={story.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
