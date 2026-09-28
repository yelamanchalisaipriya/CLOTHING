import React from 'react';
import { Award, Leaf, Shield, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-2">
            The Atelier Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#171717] tracking-tight">
            Crafting Garments That Transcends Seasons
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6E6D6A] leading-relaxed text-balance">
            Founded with a singular conviction: that modern clothing should balance architectural elegance, breathable organic comfort, and enduring Indian textile craftsmanship.
          </p>
        </div>

        {/* Cinematic Imagery Section */}
        <div className="relative mb-20 rounded-xs overflow-hidden shadow-xl max-h-[500px]">
          <img
            src="/src/assets/images/about_atelier_craft_1790578959710.jpg"
            alt="Hand tailoring and fabric draping at VÉLORA Atelier"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
            <span className="text-[11px] uppercase tracking-wider text-[#D8B984] font-semibold">
              Master Cutting Room · Bengaluru Atelier
            </span>
            <p className="font-serif text-xl sm:text-2xl mt-1">
              "We measure in millimeters and evaluate in generations."
            </p>
          </div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-2">
              01. The Beginning
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] mb-4">
              A Quiet Rejection of Ephemeral Fashion
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#54524D] leading-relaxed">
              <p>
                In a retail climate dominated by synthetic blends and disposable trends, VÉLORA ATELIER was founded to champion permanence. We wanted clothing that feels restorative against the skin, drapes with natural grace, and survives countless washings without losing its soul.
              </p>
              <p>
                Every silhouette starts on paper with proportion studies. We calibrate shoulder drops, collar stiffness, and armhole curves until a garment feels effortless the moment you slip into it.
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-2">
              02. Material Integrity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] mb-4">
              Traceable Textiles & Artisanal Mills
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#54524D] leading-relaxed">
              <p>
                We do not compromise on fibers. We source 100% GOTS-certified organic cotton from Coimbatore, pure Normandy flax linen from Western Europe, 19-momme grade 6A mulberry silk from Bengaluru sericulture clusters, and shuttle-loomed selvedge denim from Gujarat.
              </p>
              <p>
                We work directly with weaving cooperatives and master craftspeople, ensuring fair living wages, ethical air-conditioned ateliers, and absolute pride in every stitch.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="bg-white p-8 sm:p-12 border border-[#EBE8DF] rounded-xs shadow-xs mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-1">
              Core Principles
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#171717]">
              The VÉLORA Quality Promise
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-[#FAF9F5] text-[#9B7E51] rounded-xs flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#171717]">100% Natural Fibers</h4>
              <p className="text-xs text-[#6E6D6A] leading-relaxed">
                Zero polyester blends in our primary collections. Breathable, hypoallergenic, and biodegradable materials only.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 bg-[#FAF9F5] text-[#9B7E51] rounded-xs flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#171717]">Reinforced Construction</h4>
              <p className="text-xs text-[#6E6D6A] leading-relaxed">
                French seams, bound inner hems, twin-needle topstitching, and shanked horn or mother-of-pearl buttons.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 bg-[#FAF9F5] text-[#9B7E51] rounded-xs flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#171717]">Customer-First Care</h4>
              <p className="text-xs text-[#6E6D6A] leading-relaxed">
                Free domestic exchanges, doorstep trial returns, and lifelong button/stitching repair support.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 bg-[#FAF9F5] text-[#9B7E51] rounded-xs flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#171717]">Transparent Sourcing</h4>
              <p className="text-xs text-[#6E6D6A] leading-relaxed">
                Every product page details exact fabric composition, country of origin, and garment care instructions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-[#171717] text-white p-8 sm:p-12 text-center rounded-xs">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-3">
            Experience the Atelier Collection Firsthand
          </h3>
          <p className="text-xs sm:text-sm text-[#A8A49B] max-w-lg mx-auto mb-6">
            Complimentary express domestic shipping on all orders over ₹1,999. Use voucher <strong>VELORA10</strong> for 10% off.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop', { category: 'All' })}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D8B984] hover:bg-white text-[#171717] text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            <span>Discover Curated Garments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
