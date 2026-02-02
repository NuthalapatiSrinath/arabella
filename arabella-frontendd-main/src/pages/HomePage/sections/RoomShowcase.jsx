import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Wifi,
  Car,
  Briefcase,
  Stethoscope,
  Coffee,
  Check,
  MapPin,
} from "lucide-react";
import styles from "./RoomShowcase.module.css";
import { roomService } from "../../../services/room.service";
import { roomSliderImages } from "./roomSliderImages";
// ...imports above...
// Place RoomCardWithSlider after all imports
function RoomCardWithSlider({ room, amenityList, sliderImages, cardIdx }) {
  const [sliderIndex, setSliderIndex] = React.useState(0);
  const totalImages = sliderImages.length;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSliderIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setSliderIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <div className={styles.hotelCard}>
      <div className={styles.sliderWrapper}>
        <button className={styles.sliderBtn} onClick={handlePrev} aria-label="Previous image">
          <ChevronLeft size={20} />
        </button>
        <img
          src={sliderImages[sliderIndex]}
          alt={room.name}
          className={styles.cardImage}
          style={{ objectFit: "cover", width: "100%", height: "250px" }}
        />
        <button className={styles.sliderBtn} onClick={handleNext} aria-label="Next image">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardLocation}>
          <MapPin size={12} /> Luxury Suite
        </span>
        <h3 className={styles.cardTitle}>{room.name}</h3>
        <p className={styles.cardDesc}>
          {room.description?.slice(0, 80)}…
          <a
            href="https://book-directonline.com/properties/southtweedmidirect"
            style={{
              color: "#4a148c",
              fontWeight: "bold",
              cursor: "pointer",
              marginLeft: 5,
              textDecoration: "underline"
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </p>
        <div className={styles.amenitiesGrid}>
          {amenityList.map((am, idx) => (
            <div key={idx} className={styles.amenityItem}>
              {getAmenityIcon(am)} <span>{am.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.cardFooter}>
          <a
            className={styles.knowMore}
            href="https://book-directonline.com/properties/southtweedmidirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            KNOW MORE
          </a>
          <a
            className={styles.bookBtn}
            href="https://book-directonline.com/properties/southtweedmidirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            BOOK NOW
          </a>
        </div>
      </div>
    </div>
  );
}

// All imports moved to top of file

// ---------- Amenity Icon Helper ----------
const getAmenityIcon = (amenity) => {
  const name =
    typeof amenity === "string"
      ? amenity.toLowerCase()
      : amenity?.name?.toLowerCase() || "";

  if (name.includes("wifi") || name.includes("internet"))
    return <Wifi size={16} />;
  if (name.includes("park") || name.includes("valet")) return <Car size={16} />;
  if (name.includes("business") || name.includes("meeting"))
    return <Briefcase size={16} />;
  if (
    name.includes("doctor") ||
    name.includes("medical") ||
    name.includes("spa")
  )
    return <Stethoscope size={16} />;
  if (
    name.includes("breakfast") ||
    name.includes("dining") ||
    name.includes("bar")
  )
    return <Coffee size={16} />;

  return <Check size={16} />;
};

const RoomShowcase = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // ---------- Cache-first load ----------
  const cachedRooms = roomService.getCachedSearch({});

  // ---------- Hardcoded Rooms per Request ----------
  const [rooms] = useState([
    {
      _id: "queen-room",
      name: "Queen Room",
      description:
        "Standard queen room ,Air conditioned/heating,Microwave,Toaster,BAr Fridge,Tea&Coffee Facilites,Fresh milk,Dairy room service,...",
      images: [roomSliderImages[0] || "https://via.placeholder.com/400"],
      amenities: ["Wifi", "Parking", "Tea&Coffee", "Non-Smoking"],
    },
    {
      _id: "deluxe-room",
      name: "Deluxe Room",
      description:
        "Our Deluxe Room offers Air conditioned/heating,Microwave,Toaster,BAr Fridge,Tea&Coffee Facilites,Fresh milk,Dairy room service,... ",
      images: [roomSliderImages[1] || "https://via.placeholder.com/400"],
      amenities: ["Wifi", "Parking", "Tea&Coffee", "Non-Smoking"],
    },
    {
      _id: "deluxe-twin",
      name: "Deluxe Twin",
      description:
        "Standard Twin Room, One Queen Bed and One Single Bed,Air conditioned/heating, Microwave, Toaster, Bar fridge, Tea & Coffee Facilities, Fresh Milk, Daily room service, Free Wi-FiPlates, Bowls & Cutlery are available, please see reception",
      images: [roomSliderImages[2] || "https://via.placeholder.com/400"],
      amenities: ["Wifi", "Parking", "Tea&Coffee", "Non-Smoking"],
    },
  ]);
  const [loading] = useState(false);

  // ---------- Fetch ALL rooms (Disabled) ----------
  /*
  useEffect(() => {
    let mounted = true;

    const fetchRooms = async () => {
      if (!rooms.length) setLoading(true);

      try {
        const res = await roomService.searchRooms({});
        if (!mounted || !res.success) return;

        const isDifferent =
          res.data.length !== rooms.length ||
          res.data.some((r, i) => r._id !== rooms[i]?._id);

        if (isDifferent) {
          setRooms(res.data);
        }
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRooms();
    return () => (mounted = false);
    // eslint-disable-next-line
  }, []);
  */

  // ---------- Scroll ----------
  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = 400;
    sliderRef.current.scrollLeft += direction === "left" ? -amount : amount;
  };

  const handleNavigate = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className={styles.roomShowcase}>
      {/* LEFT CONTENT */}
      <div className={styles.leftTextCol}>
        <h2 className={styles.bigHeadline}>
          ALL THAT'S <span>NEW!</span>
        </h2>
        <p className={styles.leftDesc}>
          These newly-opened suites bring in a fresh burst of energy and luxury
          to your favorite destinations.
        </p>
        <a
          href="https://book-directonline.com/properties/southtweedmidirect"
          className={styles.readMoreLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW ALL <ChevronDown size={16} />
        </a>
      </div>

      {/* RIGHT SLIDER */}
      <div className={styles.sliderContainer}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>

        <div className={styles.cardStrip} ref={sliderRef}>
          {loading
            ? [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={styles.hotelCard}
                  style={{ opacity: 0.5 }}
                >
                  <div style={{ height: 250, background: "#f3f3f3" }} />
                  <div className={styles.cardContent}>
                    <div style={{ height: 20, background: "#eee" }} />
                  </div>
                </div>
              ))
            : rooms.map((room, idx) => {
                // ❌ NO fallback image used
                const imageUrl =
                  typeof room.images?.[0] === "string"
                    ? room.images[0]
                    : room.images?.[0]?.url;

                if (!imageUrl) return null; // ❗ skip cards without image

                const amenityList =
                  room.amenities
                    ?.map((a) => (typeof a === "string" ? { name: a } : a))
                    .slice(0, 4) || [];

                return (
                  <RoomCardWithSlider
                    key={room._id}
                    room={room}
                    amenityList={amenityList}
                    sliderImages={roomSliderImages}
                    cardIdx={idx}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default RoomShowcase;
