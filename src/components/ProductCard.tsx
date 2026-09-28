import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openProduct, toggleWishlist, isWishlisted } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    addToCart(product, size, activeColor, 1);
    setAddedAnimation(true);
    setQuickSizeOpen(false);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeOpen(false);
      }}
      onClick={() => openProduct(product.id)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#F4F2EC] rounded-sm mb-3">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          title={product.name}
          category={product.category}
          aspectRatio="4/5"
          className="group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Status markers - Quiet editorial tag, no garish badge sandwich */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/90 backdrop-blur-xs text-[#171717] px-2 py-0.5 shadow-xs">
              New In
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-[10px] font-semibold tracking-wider bg-[#171717]/90 text-white px-2 py-0.5 shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] hover:text-[#9B7E51] shadow-xs transition-colors duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              wishlisted ? 'fill-[#9B7E51] text-[#9B7E51]' : 'stroke-current'
            }`}
          />
        </button>

        {/* Quick Actions Hover Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2 z-20">
          {quickSizeOpen ? (
            <div
              className="bg-white/95 backdrop-blur-sm p-2 rounded-sm shadow-md animate-in fade-in slide-in-from-bottom-2 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[11px] font-medium text-[#171717] mb-1.5 px-1 flex items-center justify-between">
                <span>Select Size:</span>
                <span className="text-[#6E6D6A]">{activeColor.name}</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="py-1 text-xs font-medium border border-[#E5E2D9] rounded-xs hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickSizeOpen(true);
                }}
                className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#171717] text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </>
                )}
              </button>

              <button
                type="button"
                aria-label="View Details"
                onClick={(e) => {
                  e.stopPropagation();
                  openProduct(product.id);
                }}
                className="p-2 bg-white/95 hover:bg-white text-[#171717] shadow-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col gap-1 text-left">
        {/* Unboxed Metadata: category and department */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#6E6D6A] tracking-wider uppercase">
          <span>{product.department}</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-base font-medium text-[#171717] line-clamp-1 group-hover:text-[#9B7E51] transition-colors">
          {product.name}
        </h3>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div
            className="flex items-center gap-1.5 my-1"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  selectedColorIndex === idx
                    ? 'ring-1.5 ring-offset-1 ring-[#171717] scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[11px] text-[#6E6D6A] ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        )}

        {/* Price & Discount - Tabular Numerals */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-sans font-semibold text-sm tabular-nums text-[#171717]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="font-sans text-xs text-[#8E8B82] line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
