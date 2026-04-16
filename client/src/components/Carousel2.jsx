import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import c10 from "../assets/c10.png";
import c11 from "../assets/c11.png";
import c12 from "../assets/c12.png";
import c13 from "../assets/c13.png";
import c14 from "../assets/c14.png";
import c15 from "../assets/c15.png";
import c16 from "../assets/c16.png";

const slides = [
  { id: 1, bg: "#1a1a1a", image: c10, placeholder: "Slide 1" },
  { id: 2, bg: "#2d1f0e", image: c11, placeholder: "Slide 2" },
  { id: 3, bg: "#1a0d2e", image: c12, placeholder: "Slide 3" },
  { id: 4, bg: "#0a1628", image: c13, placeholder: "Slide 4" },
  { id: 5, bg: "#1a1a2e", image: c14, placeholder: "Slide 5" },
  { id: 6, bg: "#0d2818", image: c15, placeholder: "Slide 6" },
  { id: 7, bg: "#2e1a0a", image: c16, placeholder: "Slide 7" },
];

export default function Carousel2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const visibleCount = 4; // Number of cards visible at once
  const cardWidth = 280;
  const cardGap = 12;

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  const goNext = () => {
    if (isTransitioning) return;
    setCurrentIndex((prev) =>
      prev + 1 >= slides.length - visibleCount + 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    if (isTransitioning) return;
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - visibleCount : prev - 1
    );
  };

  const translateX = currentIndex * (cardWidth + cardGap);

  return (
    <div className="bg-white py-3 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto relative">
        {/* Left Arrow */}
        <button
          onClick={() => { stopAutoPlay(); goPrev(); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition border border-gray-200"
          style={{ left: "-16px" }}
        >
          <FiChevronLeft size={20} className="text-gray-700" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden mx-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${cardGap}px`,
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="rounded-xl overflow-hidden shrink-0 relative cursor-pointer"
                style={{
                  width: `${cardWidth}px`,
                  height: "130px",
                  background: slide.bg,
                }}
              >
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.placeholder}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder — replace with your <img> later */
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: slide.bg }}
                  >
                    <span className="text-white text-opacity-40 text-sm font-medium opacity-30">
                      {slide.placeholder}
                    </span>
                  </div>
                )}

                {/* AD Badge */}
                <span
                  className="absolute top-2 right-2 text-white text-xs px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(0,0,0,0.45)", fontSize: "10px" }}
                >
                  AD
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => { stopAutoPlay(); goNext(); }}
          className="absolute top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition border border-gray-200"
          style={{ right: "-16px" }}
        >
          <FiChevronRight size={20} className="text-gray-700" />
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: slides.length - visibleCount + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-blue-500 w-4 h-1.5"
                  : "bg-gray-300 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}