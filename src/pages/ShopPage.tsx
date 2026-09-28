import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, AVAILABLE_SIZES, AVAILABLE_COLORS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { filterState, setFilterState, resetFilters } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Search input local state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCategorySelect = (categoryValue: string) => {
    setFilterState(prev => ({
      ...prev,
      category: categoryValue,
      department: categoryValue === 'Men' || categoryValue === 'Women' || categoryValue === 'Kids' ? categoryValue : prev.department
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFilterState(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handleColorToggle = (colorName: string) => {
    setFilterState(prev => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter(c => c !== colorName) : [...prev.colors, colorName]
      };
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }));
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (filterState.search.trim()) {
      const q = filterState.search.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.details.fabric.toLowerCase().includes(q)
      );
    }

    // Category / Department
    if (filterState.category && filterState.category !== 'All') {
      if (filterState.category === 'Men') {
        result = result.filter(p => p.department === 'Men' || p.category === 'Men');
      } else if (filterState.category === 'Women') {
        result = result.filter(p => p.department === 'Women' || p.category === 'Women');
      } else if (filterState.category === 'Kids') {
        result = result.filter(p => p.department === 'Kids');
      } else {
        result = result.filter(p => p.category === filterState.category);
      }
    }

    // Size filter
    if (filterState.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(sz => filterState.sizes.includes(sz)));
    }

    // Color filter
    if (filterState.colors.length > 0) {
      result = result.filter(p =>
        p.colors.some(col =>
          filterState.colors.some(selectedCol =>
            col.name.toLowerCase().includes(selectedCol.toLowerCase()) ||
            selectedCol.toLowerCase().includes(col.name.toLowerCase())
          )
        )
      );
    }

    // Price range
    result = result.filter(
      p => p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1]
    );

    // Sorting
    switch (filterState.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popularity':
        result.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
        break;
      case 'featured':
      default:
        // maintain catalog order with best sellers first
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [filterState]);

  const hasActiveFilters =
    filterState.category !== 'All' ||
    filterState.search !== '' ||
    filterState.sizes.length > 0 ||
    filterState.colors.length > 0 ||
    filterState.priceRange[1] < 10000 ||
    filterState.priceRange[0] > 1000;

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#8E8B82] uppercase tracking-wider mb-2">
            <span>Atelier</span>
            <span aria-hidden="true">/</span>
            <span>Catalog</span>
            {filterState.category !== 'All' && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#171717] font-semibold">{filterState.category}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
              {filterState.category === 'All' ? 'Entire Collection' : filterState.category}
            </h1>
            <p className="text-xs text-[#6E6D6A]">
              Showing <strong className="text-[#171717]">{filteredProducts.length}</strong> meticulously tailored pieces
            </p>
          </div>
        </div>

        {/* Search & Mobile Filter Trigger Bar */}
        <div className="bg-white border border-[#EBE8DF] p-3 sm:p-4 rounded-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8E8B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterState.search}
              onChange={handleSearchChange}
              placeholder="Search garments, textures, or styles..."
              className="w-full pl-9 pr-8 py-2 text-xs text-[#171717] bg-[#FAF9F5] border border-[#E5E2D9] rounded-xs focus:border-[#171717] outline-hidden placeholder:text-[#8E8B82]"
            />
            {filterState.search && (
              <button
                type="button"
                aria-label="Clear search text"
                onClick={() => setFilterState(prev => ({ ...prev, search: '' }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8E8B82] hover:text-[#171717]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#E5E2D9] rounded-xs bg-[#FAF9F5] text-[#171717]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#9B7E51]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="text-xs text-[#6E6D6A] whitespace-nowrap hidden sm:inline">
                Sort By:
              </label>
              <div className="relative">
                <select
                  id="shop-sort"
                  value={filterState.sortBy}
                  onChange={handleSortChange}
                  className="appearance-none bg-[#FAF9F5] border border-[#E5E2D9] px-3 pr-8 py-2 text-xs font-medium text-[#171717] rounded-xs outline-hidden focus:border-[#171717] cursor-pointer"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6D6A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-[#8E8B82] text-[11px] uppercase tracking-wider">
              Active Filters:
            </span>
            {filterState.category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E5E2D9] text-[#171717] rounded-xs">
                <span>Category: {filterState.category}</span>
                <button
                  type="button"
                  aria-label="Remove category filter"
                  onClick={() => setFilterState(prev => ({ ...prev, category: 'All' }))}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.sizes.map(sz => (
              <span key={sz} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E5E2D9] text-[#171717] rounded-xs">
                <span>Size: {sz}</span>
                <button
                  type="button"
                  aria-label={`Remove size filter ${sz}`}
                  onClick={() => handleSizeToggle(sz)}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.colors.map(col => (
              <span key={col} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E5E2D9] text-[#171717] rounded-xs">
                <span>Color: {col}</span>
                <button
                  type="button"
                  aria-label={`Remove color filter ${col}`}
                  onClick={() => handleColorToggle(col)}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-[#9B7E51] hover:underline ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 border border-[#EBE8DF] rounded-xs space-y-7 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE8DF]">
              <h3 className="font-serif text-lg font-medium text-[#171717]">
                Refine Pieces
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#8E8B82] hover:text-[#171717] transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                Categories
              </h4>
              <div className="space-y-1.5 text-xs">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategorySelect(cat.value)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-xs transition-colors ${
                      filterState.category === cat.value
                        ? 'bg-[#171717] text-white font-medium'
                        : 'text-[#54524D] hover:bg-[#FAF9F5] hover:text-[#171717]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[11px] tabular-nums ${filterState.category === cat.value ? 'text-[#D8B984]' : 'text-[#8E8B82]'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="pt-5 border-t border-[#EBE8DF]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                Garment Size
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                {AVAILABLE_SIZES.map(sz => {
                  const isSelected = filterState.sizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleSizeToggle(sz)}
                      className={`py-1.5 text-xs font-medium rounded-xs border transition-colors ${
                        isSelected
                          ? 'border-[#171717] bg-[#171717] text-white'
                          : 'border-[#E5E2D9] bg-white text-[#54524D] hover:border-[#171717]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div className="pt-5 border-t border-[#EBE8DF]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                Color Palette
              </h4>
              <div className="space-y-2">
                {AVAILABLE_COLORS.map(col => {
                  const isSelected = filterState.colors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => handleColorToggle(col.name)}
                      className={`w-full flex items-center justify-between py-1 px-1.5 text-xs rounded-xs transition-colors ${
                        isSelected ? 'bg-[#F4F2EC] font-semibold text-[#171717]' : 'text-[#54524D] hover:text-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-full inline-block ${
                            col.border ? 'border border-[#CCC]' : ''
                          }`}
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </div>
                      {isSelected && <span className="text-xs text-[#9B7E51]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-5 border-t border-[#EBE8DF]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                  Max Price
                </h4>
                <span className="text-xs font-semibold tabular-nums text-[#171717]">
                  ₹{filterState.priceRange[1].toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={filterState.priceRange[1]}
                onChange={(e) =>
                  setFilterState(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                  }))
                }
                className="w-full accent-[#171717] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8E8B82] mt-1 tabular-nums">
                <span>₹1,000</span>
                <span>₹10,000</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#EBE8DF] p-12 text-center rounded-xs">
                <p className="font-serif text-2xl font-normal text-[#171717] mb-2">
                  No matching garments found
                </p>
                <p className="text-xs text-[#6E6D6A] max-w-md mx-auto mb-6 leading-relaxed">
                  We could not find items fitting your current filter combination. Try clearing some filters or searching for alternative categories.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="py-2.5 px-6 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#FAF9F5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EBE8DF]">
                  <h3 className="font-serif text-xl font-medium text-[#171717]">
                    Filter Garments
                  </h3>
                  <button
                    type="button"
                    aria-label="Close filters"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-[#6E6D6A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="py-4 border-b border-[#EBE8DF]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                    Categories
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleCategorySelect(cat.value)}
                        className={`p-2 text-left rounded-xs ${
                          filterState.category === cat.value
                            ? 'bg-[#171717] text-white font-medium'
                            : 'bg-white border border-[#E5E2D9] text-[#54524D]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Garment Sizes */}
                <div className="py-4 border-b border-[#EBE8DF]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                    Sizes
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {AVAILABLE_SIZES.map(sz => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeToggle(sz)}
                        className={`py-2 text-xs font-medium rounded-xs border ${
                          filterState.sizes.includes(sz)
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white border-[#E5E2D9] text-[#54524D]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EBE8DF] flex gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-3 border border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
