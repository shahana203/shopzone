function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceRangeChange,
}) {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-5 h-fit shadow-sm">

      {/* Category Section */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Categories
      </h2>

      <div className="space-y-2">

        <button
          onClick={() => onCategoryChange("all")}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
            selectedCategory === "all"
              ? "bg-blue-50 text-blue-600 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition ${
              selectedCategory === category
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}

      </div>

     
{/* Price Section */}

{/* Price Filter */}
<div className="border-t border-gray-200 mt-6 pt-5">

  <h2 className="text-base font-semibold text-gray-800 mb-5">
    Filter by Price
  </h2>

  <div className="relative h-6">

    {/* Background track */}
    <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full" />

    {/* Selected blue track */}
    <div
      className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full"
      style={{
        left: `${(minPrice / 500) * 100}%`,
        right: `${100 - (maxPrice / 500) * 100}%`,
      }}
    />

    {/* Minimum price slider */}
    <input
      type="range"
      min="0"
      max="500"
      step="10"
      value={minPrice}
      onChange={(e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 10);
        onPriceRangeChange(value, maxPrice);
      }}
      className="range-slider"
    />

    {/* Maximum price slider */}
    <input
      type="range"
      min="0"
      max="500"
      step="10"
      value={maxPrice}
      onChange={(e) => {
        const value = Math.max(Number(e.target.value), minPrice + 10);
        onPriceRangeChange(minPrice, value);
      }}
      className="range-slider"
    />

  </div>

  <div className="flex justify-between text-sm text-gray-700 mt-3">
    <span>₹{minPrice}</span>
    <span>₹{maxPrice}</span>
  </div>

</div>


     

    </aside>
  );
}

export default Sidebar;
