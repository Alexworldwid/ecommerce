"use client";

import { useMenu } from "@/app/context/menuContext";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MenuButton = () => {
  const { isMenuOpen, toggleMenu } = useMenu();
  const topLine = useRef<HTMLDivElement>(null);
  const middleLine = useRef<HTMLDivElement>(null);
  const bottomLine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

    if (isMenuOpen) {
      tl.to(topLine.current, { y: 6.5, rotate: 45 }, 0)
        .to(middleLine.current, { opacity: 0 }, 0)
        .to(bottomLine.current, { y: -6.5, rotate: -45 }, 0);
    } else {
      tl.to(topLine.current, { y: 0, rotate: 0 }, 0)
        .to(middleLine.current, { opacity: 1 }, 0)
        .to(bottomLine.current, { y: 0, rotate: 0 }, 0);
    }
  }, [isMenuOpen]);

  return (
    <button onClick={toggleMenu} className="relative w-6 h-6 z-50 lg:hidden">
      <div
        ref={topLine}
        className="absolute top-1 left-0 w-full h-0.5 bg-black"
        style={{ transformOrigin: "center" }}
      ></div>
      <div
        ref={middleLine}
        className="absolute top-1/2 left-0 w-full h-0.5 bg-black -translate-y-1/2"
        style={{ transformOrigin: "center" }}
      ></div>
      <div
        ref={bottomLine}
        className="absolute bottom-1 left-0 w-full h-0.5 bg-black"
        style={{ transformOrigin: "center" }}
      ></div>
    </button>
  );
};

export default MenuButton;
