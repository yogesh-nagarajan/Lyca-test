"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Carousel({
  prevArrow,
  nextArrow,
  carousel,
}: any) {
  const length = carousel?.length || 0;

  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!length) return null;

  // Clone slides for infinite loop
  const slides = [
    carousel[length - 1],
    ...carousel,
    carousel[0],
  ];

  // Auto Slide
  useEffect(() => {
    if (isHovered || length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, length]);

  // Infinite Reset Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (current === slides.length - 1) {
      timeout = setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 700);
    }

    if (current === 0) {
      timeout = setTimeout(() => {
        setTransition(false);
        setCurrent(slides.length - 2);
      }, 700);
    }

    return () => clearTimeout(timeout);
  }, [current, slides.length]);

  // Re-enable transition smoothly
  useEffect(() => {
    if (!transition) {
      const timeout = setTimeout(() => {
        setTransition(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [transition]);

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div
        ref={sliderRef}
        className={`flex ${
          transition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((image: any, index: number) => (
          <div
            key={index}
            className="relative w-full h-[400px] flex-shrink-0"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_AEM_HOST}${image.imagePath._dynamicUrl}`}
              alt={image.altText || "Carousel Image"}
              fill
              priority={index === 1}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 z-10"
      >
        <Image src={prevArrow} alt="Prev Arrow" width={47} height={47} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 z-10"
      >
        <Image src={nextArrow} alt="Next Arrow" width={47} height={47} />
      </button>

      {/* Custom Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">

        {/* Moving Middle Bar */}
        <div className="relative w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-indigo-800 transition-all duration-700"
            style={{
              width: `${100 / length}%`,
              transform: `translateX(${((current - 1 + length) % length) * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}   