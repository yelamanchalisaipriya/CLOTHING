import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Ruler,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    navigateTo,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    showToast
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const wishlisted = isWishlisted(product.id);

  // Related products (from same department or category, excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.department === product.department || p.category === product.category)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    navigateTo('checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.length !== 6) {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    // Realistic simulation
    const firstDigit = pincodeInput.charAt(0);
    if (['5', '6'].includes(firstDigit)) {
      setPincodeStatus(`Available! Express 2-day delivery to ${pincodeInput} (Bengaluru / South Hub).`);
    } else if (['4'].includes(firstDigit)) {
      setPincodeStatus(`Available! Express 2-day delivery to ${pincodeInput} (Mumbai Hub).`);
    } else {
      setPincodeStatus(`Available! Standard 3-4 business day delivery to ${pincodeInput}.`);
    }
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8E8B82] mb-8">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-[#171717] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
          <button
            type="button"
            onClick={() => navigateTo('shop', { department: product.department })}
            className="hover:text-[#171717] transition-colors"
          >
            {product.department}
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
          <button
            type="button"
            onClick={() => navigateTo('shop', { category: product.category })}
            className="hover:text-[#171717] transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A49B]" />
          <span className="text-[#171717] font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Contiguous PDP Layout: Gallery Left + Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Module (Left, spans 7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (vertical on desktop) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 py-1">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#F4F2EC] rounded-xs overflow-hidden border transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#171717] ring-1 ring-[#171717]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    aspectRatio="4/5"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Photo */}
            <div className="flex-1 relative bg-[#F4F2EC] rounded-xs overflow-hidden shadow-sm">
              <ProductImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                aspectRatio="4/5"
                className="w-full h-full"
              />

              {product.discountPercent && product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider bg-[#171717] text-white px-2.5 py-1">
                  Save {product.discountPercent}%
                </span>
              )}

              <button
                type="button"
                aria-label="Toggle wishlist"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] hover:text-[#9B7E51] shadow-xs transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'fill-[#9B7E51] text-[#9B7E51]' : 'stroke-current'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Purchase Module (Right, spans 5 columns, sticky) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs lg:sticky lg:top-24 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6E6D6A] uppercase tracking-wider mb-2">
                <span>{product.department} · {product.category}</span>
                <span className="text-emerald-700 font-medium">In Stock ({product.stockCount} remaining)</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#171717] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price & Discounts */}
              <div className="flex items-baseline gap-3">
                <span className="font-sans font-semibold text-2xl text-[#171717] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-sans text-sm text-[#8E8B82] line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-semibold text-[#9B7E51] tracking-wide">
                    ({product.discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8E8B82] mt-1">
                Inclusive of all taxes & GST. Free shipping over ₹1,999.
              </p>
            </div>

            <p className="text-xs text-[#54524D] leading-relaxed pt-2 border-t border-[#EBE8DF]">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-[#171717] uppercase tracking-wider">
                  Color: <span className="font-normal text-[#6E6D6A]">{activeColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`relative p-0.5 rounded-full transition-all ${
                      selectedColorIndex === idx
                        ? 'ring-2 ring-offset-2 ring-[#171717]'
                        : 'hover:scale-105'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full block border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-[#171717] uppercase tracking-wider">
                  Select Size
                </span>
                <button
                  type="button"
                  onClick={() => setSizeChartOpen(true)}
                  className="inline-flex items-center gap-1 text-[#9B7E51] hover:underline font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-semibold rounded-xs border transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-[#FAF9F5] text-[#54524D] border-[#E5E2D9] hover:border-[#171717]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Quantity
              </span>
              <div className="flex items-center border border-[#E5E2D9] rounded-xs bg-[#FAF9F5]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#6E6D6A] hover:text-[#171717]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold tabular-nums text-[#171717]">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="p-2 text-[#6E6D6A] hover:text-[#171717]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 bg-[#171717] hover:bg-[#2B2B2B] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-[#9B7E51] hover:bg-[#82663A] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-xs"
              >
                Buy Now with Express Checkout
              </button>
            </div>

            {/* Pincode Delivery Availability Checker */}
            <div className="pt-4 border-t border-[#EBE8DF]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171717] block mb-2">
                Estimate Delivery & COD
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN (e.g. 560001)"
                  className="flex-1 bg-[#FAF9F5] border border-[#E5E2D9] px-3 py-2 text-xs text-[#171717] outline-hidden focus:border-[#171717]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white border border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF9F5]"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] text-emerald-800 mt-2 font-medium bg-emerald-50 p-2 rounded-xs border border-emerald-200">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Specifications & Care Tabs */}
            <div className="pt-4 border-t border-[#EBE8DF]">
              <div className="flex border-b border-[#EBE8DF] text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 mr-6 font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#171717] text-[#171717]'
                      : 'text-[#8E8B82] hover:text-[#171717]'
                  }`}
                >
                  Fabric & Fit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 mr-6 font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-[#171717] text-[#171717]'
                      : 'text-[#8E8B82] hover:text-[#171717]'
                  }`}
                >
                  Delivery & Returns
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'care'
                      ? 'border-b-2 border-[#171717] text-[#171717]'
                      : 'text-[#8E8B82] hover:text-[#171717]'
                  }`}
                >
                  Garment Care
                </button>
              </div>

              <div className="pt-3 text-xs text-[#54524D] leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-1.5">
                    <p><strong>Fabric Composition:</strong> {product.details.fabric}</p>
                    <p><strong>Silhouette & Fit:</strong> {product.details.fit}</p>
                    <p><strong>Artisan Origin:</strong> {product.details.origin}</p>
                    {product.details.modelHeight && (
                      <p>
                        <strong>Model Specs:</strong> {product.details.modelHeight}, wearing size{' '}
                        {product.details.modelWearingSize}.
                      </p>
                    )}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p>• Complimentary express domestic courier on all orders over ₹1,999.</p>
                    <p>• Dispatched within 24 hours from our Mumbai or Bengaluru atelier hubs.</p>
                    <p>• 7-day hassle-free reverse pickup with exchange or full refund.</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-1.5">
                    <p><strong>Recommended Care:</strong> {product.details.care}</p>
                    <p>Store on structured wooden hangers away from direct sunlight.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* "You May Also Like" Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-12 border-t border-[#EBE8DF]">
            <div className="mb-8 text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-1">
                Curated Pairing
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717]">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Chart Modal */}
      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSizeChartOpen(false)}
          />
          <div className="relative min-h-screen px-4 flex items-center justify-center py-12">
            <div className="relative bg-white max-w-lg w-full p-6 sm:p-8 rounded-xs shadow-2xl border border-[#E5E2D9]">
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE8DF]">
                <h3 className="font-serif text-xl font-medium text-[#171717]">
                  Atelier Sizing Guide (Inches)
                </h3>
                <button
                  type="button"
                  aria-label="Close size guide"
                  onClick={() => setSizeChartOpen(false)}
                  className="p-1 text-[#8E8B82] hover:text-[#171717]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#EBE8DF] text-[#8E8B82] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest / Bust</th>
                      <th className="py-2.5 px-3">Waist</th>
                      <th className="py-2.5 px-3">Hip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE8DF] text-[#171717] tabular-nums">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">XS (34)</td>
                      <td className="py-2.5 px-3">33 - 35"</td>
                      <td className="py-2.5 px-3">26 - 28"</td>
                      <td className="py-2.5 px-3">35 - 37"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">S (36)</td>
                      <td className="py-2.5 px-3">36 - 38"</td>
                      <td className="py-2.5 px-3">29 - 31"</td>
                      <td className="py-2.5 px-3">38 - 40"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">M (38)</td>
                      <td className="py-2.5 px-3">39 - 41"</td>
                      <td className="py-2.5 px-3">32 - 34"</td>
                      <td className="py-2.5 px-3">41 - 43"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">L (40)</td>
                      <td className="py-2.5 px-3">42 - 44"</td>
                      <td className="py-2.5 px-3">35 - 37"</td>
                      <td className="py-2.5 px-3">44 - 46"</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">XL (42)</td>
                      <td className="py-2.5 px-3">45 - 47"</td>
                      <td className="py-2.5 px-3">38 - 40"</td>
                      <td className="py-2.5 px-3">47 - 49"</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EBE8DF] text-[11px] text-[#6E6D6A]">
                Need a bespoke or altered fitting? Contact our studio concierge at +91 80 4912 3456 or via WhatsApp.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
