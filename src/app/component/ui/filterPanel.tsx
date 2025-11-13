import React from 'react';
import PriceRange from './priceRange';

interface FilterPanelProps {
  category: string[];
  setCategory: (category: string[]) => void;
  setColor: (color: string) => void;
  setSize: (size: string) => void;
  setPriceRange: (range: [number, number]) => void;
  priceRange: [number, number];
  color: string,
  size: string,
  isFilterMenuOpen: boolean;
}

const FilterPanel = ({
  category,
  setCategory,
  setColor,
  setSize,
  priceRange,
  setPriceRange,
  color,
  size,
  isFilterMenuOpen
}: FilterPanelProps) => {
  const handleCategoryChange = (cat: string) => {
    const updated = category.includes(cat)
      ? category.filter((c) => c !== cat)
      : [...category, cat];
    setCategory(updated);
  };

  return (
    <aside className={`space-y-6 border bg-white border-gray-200 py-4 px-4 flex-col gap-4 rounded-md h-fit max-w-[160px] w-full absolute md:static md:block top-10 right-0 z-20 ${isFilterMenuOpen ? 'block' : 'hidden'}`}>
      {/* Categories */}
      <div>
        <p className="font-medium mb-2">Categories</p>
        <div className="flex gap-2 flex-wrap flex-col">
          {['male', 'female', 'shirt', 'hoodies'].map((cat) => (
            <label key={cat} className="flex items-center gap-1 cursor-pointer border-b border-b-gray-200 py-2">
              <input
                type="checkbox"
                checked={category.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat[0].toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className='flex flex-col gap-4'>
        <p className="font-medium mb-2">Colors</p>
        <div className="flex gap-2">
          {['Red', 'Blue', 'Green'].map((c) => (
            <div key={c} className={`${c === color ? 'outline outline-1 outline-offset-[-1px] outline-gray-900' : ''} flex items-center justify-center h-8 w-8 rounded-full`}>
                <button
                onClick={() => color !== c ? setColor(c) : setColor('')}
                className={`border rounded-full h-5 w-5 ${c == color ? "animate-press" : ""}`}
                style={{ backgroundColor: c }}
                >
                </button>
            </div>
            
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium mb-2">Sizes</p>
        <div className="flex gap-2">
          {['S', 'M', 'L'].map((s) => (
            <button
              key={s}
              onClick={() => size !== s ? setSize(s) : setSize('')}
              className={`border px-3 py-1 rounded hover:bg-gray-100 ${size === s ? "outline outline-gray-500" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <PriceRange minPrice={0} maxPrice={priceRange[1]} setPriceRange={setPriceRange} />
      
    </aside>
  );
};

export default FilterPanel;
