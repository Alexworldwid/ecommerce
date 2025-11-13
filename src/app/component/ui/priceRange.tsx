"use client";

import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

type PriceRangeProps = {
  minPrice: number;
  maxPrice: number;
  setPriceRange: (range: [number, number]) => void;
};

const PriceRange = ({ minPrice, maxPrice, setPriceRange }: PriceRangeProps) => {
  const [priceRange, setLocalPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const handleChange = (values: number[]) => {
    if (values.length === 2) {
      setLocalPriceRange([values[0], values[1]]);
      setPriceRange([values[0], values[1]]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium mb-2">Price Range</p>

        <div className="flex justify-between text-sm mb-1">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>

        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={priceRange}
          min={0}
          max={500}
          step={40}
          onValueChange={handleChange}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
            <Slider.Range className="absolute bg-black rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-4 h-4 bg-black rounded-full focus:outline-none"
            aria-label="Minimum price"
          />
          <Slider.Thumb
            className="block w-4 h-4 bg-black rounded-full focus:outline-none"
            aria-label="Maximum price"
          />
        </Slider.Root>
      </div>
    </div>
  );
};

export default PriceRange;
