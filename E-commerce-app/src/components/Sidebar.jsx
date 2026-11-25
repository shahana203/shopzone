
import { Tag, SlidersHorizontal } from "lucide-react";

function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceRangeChange,
}) {
  return (
    <aside className="w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5 h-fit shadow-sm">

      {/* Category Section */}
      <div className="flex items-center gap-2 mb-4">
        <Tag size={19} className="text-blue-600" />

        <h2 className="text-lg font-bold text-gray-800">
          Categories
        </h2>
      </div>

      <div className="space-y-2">

        {/* All Products */}
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition ${selectedCategory === "all"
              ? "bg-blue-50 text-blue-600 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          All Products
        </button>

        {/* Product Categories */}
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm capitalize transition ${selectedCategory === category
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {category}
          </button>
        ))}

      </div>

      {/* Price Filter Section */}
      <div className="border-t border-gray-200 mt-6 pt-5">

        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={18} className="text-blue-600" />

          <h2 className="text-base font-semibold text-gray-800">
            Filter by Price
          </h2>
        </div>

        <div className="relative h-7">

          {/* Background Track */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full" />

          {/* Selected Blue Track */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full"
            style={{
              left: `${(minPrice / 500) * 100}%`,
              right: `${100 - (maxPrice / 500) * 100}%`,
            }}
          />

          {/* Minimum Price Slider */}
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={minPrice}
            aria-label="Minimum price"
            onChange={(e) => {
              const value = Math.min(
                Number(e.target.value),
                maxPrice - 10
              );

              onPriceRangeChange(value, maxPrice);
            }}
            className="range-slider"
          />

          {/* Maximum Price Slider */}
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={maxPrice}
            aria-label="Maximum price"
            onChange={(e) => {
              const value = Math.max(
                Number(e.target.value),
                minPrice + 10
              );

              onPriceRangeChange(minPrice, value);
            }}
            className="range-slider"
          />

        </div>

        {/* Price Values */}
        <div className="flex justify-between text-sm text-gray-700 mt-3">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
