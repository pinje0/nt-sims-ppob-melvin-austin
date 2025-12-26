"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function PromoBanner() {
  const { banners } = useSelector((state) => state.transaction);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Filter out invalid banners
  const validBanners =
    banners?.filter((banner) => banner.banner_image && banner.banner_image !== "null") || [];

  // Triple the banners for infinite loop effect
  const loopedBanners =
    validBanners.length > 0 ? [...validBanners, ...validBanners, ...validBanners] : [];

  useEffect(() => {
    // Start at middle set for seamless loop
    if (scrollRef.current && validBanners.length > 0) {
      const scrollWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = scrollWidth;
    }
  }, [validBanners.length]);

  if (validBanners.length === 0) {
    return null;
  }

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = "grab";
    checkLoop();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollRef.current.style.cursor = "grab";
    }
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    checkLoop();
  };

  // Check and reset scroll position for infinite loop
  const checkLoop = () => {
    if (!scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth / 3;
    const currentScroll = scrollRef.current.scrollLeft;

    // If scrolled past right copy, reset to middle
    if (currentScroll >= scrollWidth * 2) {
      scrollRef.current.scrollLeft = scrollWidth;
    }
    // If scrolled past left copy, reset to middle
    else if (currentScroll <= 0) {
      scrollRef.current.scrollLeft = scrollWidth;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Check loop after scroll animation
      setTimeout(checkLoop, 300);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Temukan promo menarik</h3>

      <div className="relative">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={checkLoop}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 cursor-grab select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {loopedBanners.map((banner, index) => (
            <div
              key={`${banner.banner_name}-${index}`}
              className="shrink-0 w-80 h-37.5 relative rounded-lg overflow-hidden shadow-sm pointer-events-none"
              draggable={false}
            >
              <Image
                src={banner.banner_image}
                alt={banner.banner_name || `Banner ${(index % validBanners.length) + 1}`}
                fill
                sizes="300px"
                className="object-cover"
                priority={index < 3}
                loading={index < 3 ? "eager" : "lazy"}
                unoptimized
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {validBanners.length > 1 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700 text-xl font-bold z-10"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-700 text-xl font-bold z-10"
              aria-label="Scroll right"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}
