import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductImage } from './ProductImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProduct, navigateTo } = useShop();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.details.fabric.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Silk Dress',
    'Linen Shirt',
    'Cashmere',
    'Wool Trousers',
    'Selvedge Denim',
    'Chore Jacket'
  ];

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    openProduct(id);
  };

  const handleSelectSearchTerm = (term: string) => {
    setQuery(term);
  };

  const handleViewAllResults = () => {
    setIsSearchOpen(false);
    navigateTo('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen px-4 pt-16 pb-20 flex justify-center items-start">
        <div className="relative w-full max-w-2xl bg-[#FAF9F5] shadow-2xl rounded-xs overflow-hidden border border-[#E5E2D9] animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#EBE8DF] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#8E8B82] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by garment, fabric (silk, linen, cashmere), or style..."
              className="flex-1 text-sm sm:text-base text-[#171717] placeholder-[#8E8B82] bg-transparent outline-hidden"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear input"
                onClick={() => setQuery('')}
                className="text-xs text-[#8E8B82] hover:text-[#171717] px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-[#6E6D6A] hover:text-[#171717] rounded-full hover:bg-[#FAF9F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when Query is Empty */}
          {!query.trim() && (
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8B82] block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectSearchTerm(term)}
                    className="py-1.5 px-3 bg-white border border-[#E5E2D9] hover:border-[#171717] text-xs text-[#54524D] hover:text-[#171717] rounded-xs transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8B82] block mb-3">
                Curated Collections
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['Women', 'Men', 'Kids', 'Jackets'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('shop', { category: cat });
                    }}
                    className="p-3 text-left bg-white border border-[#E5E2D9] hover:border-[#171717] transition-colors"
                  >
                    <span className="font-serif font-medium text-sm text-[#171717] block">
                      {cat}
                    </span>
                    <span className="text-[11px] text-[#8E8B82]">Browse items →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EBE8DF]">
                <span className="text-xs text-[#6E6D6A]">
                  Found <strong className="text-[#171717]">{searchResults.length}</strong> matching pieces
                </span>
                {searchResults.length > 0 && (
                  <button
                    type="button"
                    onClick={handleViewAllResults}
                    className="text-xs font-medium text-[#9B7E51] hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-serif text-lg text-[#171717] mb-1">
                    No garments found for "{query}"
                  </p>
                  <p className="text-xs text-[#6E6D6A] max-w-sm mx-auto">
                    Try searching for "Linen", "Silk", "Dress", "Blazer", or explore our core departments.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="group flex gap-3 p-2.5 bg-white border border-[#E8E5DC] hover:border-[#171717] rounded-xs cursor-pointer transition-all"
                    >
                      <div className="w-14 h-18 bg-[#F4F2EC] shrink-0 overflow-hidden rounded-xs">
                        <ProductImage
                          src={p.images[0]}
                          alt={p.name}
                          aspectRatio="4/5"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8B82]">
                          {p.department} · {p.category}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#9B7E51] transition-colors line-clamp-1">
                          {p.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#171717] mt-1 tabular-nums">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
