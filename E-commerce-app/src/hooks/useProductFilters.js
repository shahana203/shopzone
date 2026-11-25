
import { useMemo } from "react";

function useProductFilters(
  products,
  searchTerm,
  selectedCategory,
  minPrice,
  maxPrice,
  sortOption
) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesPrice =
        product.price >= minPrice &&
        product.price <= maxPrice;

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice]);

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortOption === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    if (sortOption === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [filteredProducts, sortOption]);

  return sortedProducts;
}

export default useProductFilters;
