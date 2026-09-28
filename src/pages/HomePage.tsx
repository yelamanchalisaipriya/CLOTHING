import React, { useState } from 'react';
import { ArrowRight, Sparkles, Shield, Award, Leaf } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'new' | 'bestseller' | 'trending' | 'offers'>('new');

  const filteredShowcase = PRODUCTS.filter((p) => {
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'offers') return p.isSpecialOffer || (p.discountPercent && p.discountPercent > 0);
    return true;
  }).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#171717] text-white">
        {/* Background Image with Scrim Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_fashion_banner_1790578906797.jpg"
            alt="VÉLORA ATELIER Campaign"
            className="w-full h-full object-cover object-center brightness-85 scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xs border border-white/20 text-[#E5D2B8] text-[11px] uppercase tracking-widest font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn / Festive Collection '26</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white max-w-3xl leading-[1.08] text-balance">
            Modern Silhouettes. <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D8B984]">Timeless Craftsmanship.</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-[#D4D0C5] max-w-xl font-normal leading-relaxed text-balance">
            VÉLORA ATELIER presents ready-to-wear essentials crafted from Mulberry silk, Normandy flax linen, and Japanese selvedge denim.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigateTo('shop', { category: 'All' })}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#171717] hover:bg-[#D8B984] hover:text-[#171717] text-xs font-semibold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/40 hover:border-white text-white text-xs font-semibold uppercase tracking-widest transition-colors backdrop-blur-xs"
            >
              Explore Atelier
            </button>
          </div>
        </div>

        {/* Bottom Bar Details */}
        <div className="absolute bottom-4 left-0 right-0 hidden md:flex justify-between px-8 text-[11px] text-[#A8A49B] tracking-wider uppercase">
          <span>Handcrafted in India</span>
          <span>Complimentary Express Shipping over ₹1,999</span>
          <span>100% Traceable Fabrics</span>
        </div>
      </section>

      {/* 2. CURATED SHOWCASE (New Arrivals, Best Sellers, Trending, Special Offers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8E5DC]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-1">
              Curated Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
              Signature Garments
            </h2>
          </div>

          {/* Interactive Filter Segmented Buttons */}
          <div className="flex items-center gap-1 mt-6 md:mt-0 p-1 bg-[#F4F2EC] rounded-xs overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-xs transition-colors whitespace-nowrap ${
                activeTab === 'new'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#6E6D6A] hover:text-[#171717]'
              }`}
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bestseller')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-xs transition-colors whitespace-nowrap ${
                activeTab === 'bestseller'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#6E6D6A] hover:text-[#171717]'
              }`}
            >
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('trending')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-xs transition-colors whitespace-nowrap ${
                activeTab === 'trending'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#6E6D6A] hover:text-[#171717]'
              }`}
            >
              Trending Now
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('offers')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-xs transition-colors whitespace-nowrap ${
                activeTab === 'offers'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#6E6D6A] hover:text-[#171717]'
              }`}
            >
              Special Offers
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filteredShowcase.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => navigateTo('shop', { category: 'All' })}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. DUAL CAMPAIGN SPOTLIGHT (Men & Women) */}
      <section className="bg-[#F4F2EC] py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Menswear Campaign Card */}
            <div
              onClick={() => navigateTo('shop', { department: 'Men', category: 'Men' })}
              className="group relative h-[480px] sm:h-[540px] overflow-hidden cursor-pointer rounded-xs"
            >
              <img
                src="/src/assets/images/category_men_collection_1790578925997.jpg"
                alt="Men's Collection"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D8B984] font-semibold block mb-1">
                  Atelier Menswear
                </span>
                <h3 className="font-serif text-3xl font-normal mb-2 text-white">
                  Relaxed Tailoring & Raw Textures
                </h3>
                <p className="text-xs text-[#E5E2D9] max-w-sm mb-4 leading-relaxed">
                  Linen camp shirts, structured selvedge denim, and refined merino layers engineered for effortless versatility.
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold group-hover:translate-x-1 transition-transform text-white">
                  <span>Shop Men's</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Womenswear Campaign Card */}
            <div
              onClick={() => navigateTo('shop', { department: 'Women', category: 'Women' })}
              className="group relative h-[480px] sm:h-[540px] overflow-hidden cursor-pointer rounded-xs"
            >
              <img
                src="/src/assets/images/category_women_collection_1790578941741.jpg"
                alt="Women's Collection"
                className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D8B984] font-semibold block mb-1">
                  Atelier Womenswear
                </span>
                <h3 className="font-serif text-3xl font-normal mb-2 text-white">
                  Architectural Silhouettes & Pure Silks
                </h3>
                <p className="text-xs text-[#E5E2D9] max-w-sm mb-4 leading-relaxed">
                  Mulberry silk bias slips, double-breasted virgin wool blazers, and fluid high-rise trousers.
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold group-hover:translate-x-1 transition-transform text-white">
                  <span>Shop Women's</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ATELIER HERITAGE & CRAFTSMANSHIP FEATURE */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-7 relative">
              <div className="overflow-hidden rounded-xs shadow-xl">
                <img
                  src="/src/assets/images/about_atelier_craft_1790578959710.jpg"
                  alt="Tailoring craftsmanship at VÉLORA Atelier"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-6 shadow-lg border border-[#E8E5DC] max-w-xs">
                <p className="font-serif text-lg italic text-[#171717] mb-1">
                  "Cut with purpose, tailored to endure."
                </p>
                <span className="text-[11px] uppercase tracking-wider text-[#8E8B82]">
                  — Master Pattern Cutter, VÉLORA
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold mb-2">
                The Sartorial Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mb-5 leading-tight">
                Designed with Intent. Crafted Without Compromise.
              </h2>
              <p className="text-sm text-[#54524D] leading-relaxed mb-4">
                At VÉLORA ATELIER, we reject the endless churn of fast fashion. Every single silhouette undergoes months of sample fittings, wear tests, and fabric sourcing across India, France, and Japan.
              </p>
              <p className="text-sm text-[#54524D] leading-relaxed mb-6">
                From hand-rolled mulberry silk scarves in Varanasi to custom-milled organic cotton poplin in Coimbatore, we honor both Indian textile heritage and contemporary minimal aesthetics.
              </p>

              <div className="space-y-4 pt-2 border-t border-[#EBE8DF] mb-8">
                <div className="flex items-center gap-3 text-xs text-[#171717]">
                  <Leaf className="w-4 h-4 text-[#9B7E51]" />
                  <span>100% GOTS & EcoVero certified sustainable fabrics</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#171717]">
                  <Award className="w-4 h-4 text-[#9B7E51]" />
                  <span>Fair wages and ethical workspace standards across all artisan hubs</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#171717]">
                  <Shield className="w-4 h-4 text-[#9B7E51]" />
                  <span>Reinforced stress points & French seam finishes</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="px-6 py-3 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Read Our Full Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL SPECIAL OFFERS STRIP */}
      <section className="bg-[#171717] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#212121] p-8 sm:p-10 border border-[#2E2E2E]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D8B984] font-semibold block mb-1">
                Atelier Privileges
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Receive 10% Off Your Inaugural Order
              </h3>
              <p className="text-xs text-[#A8A49B] mt-1 max-w-lg leading-relaxed">
                Apply promotional voucher code <strong className="text-white">VELORA10</strong> at checkout on all orders exceeding ₹1,500. Complimentary doorstep delivery included.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigateTo('shop', { category: 'All' })}
                className="px-6 py-3 bg-[#D8B984] hover:bg-white text-[#171717] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Claim Privilege & Shop
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
