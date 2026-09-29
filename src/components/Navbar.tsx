import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    activePage,
    navigateTo,
    setIsCartOpen,
    setIsSearchOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleNavClick = (
    page: any,
    options?: { category?: string; department?: string }
  ) => {
    navigateTo(page, options);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EBE8DF] transition-all">
      {/* Editorial Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#171717] text-[#FAF9F5] text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 text-center font-normal tracking-wide text-[11px] sm:text-xs">
              <span>Complimentary express delivery across India on orders over ₹1,999</span>
              <span className="hidden md:inline mx-2 text-[#9B7E51]">·</span>
              <span className="hidden md:inline text-[#D4C8B5]">
                Use code <strong className="text-white tracking-widest">VELORA10</strong> for 10% off
              </span>
            </div>
            <button
              type="button"
              aria-label="Dismiss banner"
              onClick={() => setShowAnnouncement(false)}
              className="text-[#9E9B93] hover:text-white text-xs ml-2 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar Contract (3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#171717] hover:text-[#9B7E51] transition-colors -ml-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#171717] hover:opacity-90 transition-opacity whitespace-nowrap text-left"
          >
            VÉLORA <span className="font-light italic text-[#9B7E51]">ATELIER</span>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wider uppercase text-[#54524D]">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-[#171717] ${
              activePage === 'home' ? 'text-[#171717] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop', { category: 'All' })}
            className={`transition-colors hover:text-[#171717] ${
              activePage === 'shop' ? 'text-[#171717] font-semibold' : ''
            }`}
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop', { department: 'Men', category: 'Men' })}
            className="transition-colors hover:text-[#171717]"
          >
            Men
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop', { department: 'Women', category: 'Women' })}
            className="transition-colors hover:text-[#171717]"
          >
            Women
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop', { department: 'Kids', category: 'Kids' })}
            className="transition-colors hover:text-[#171717]"
          >
            Kids
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-[#171717] ${
              activePage === 'about' ? 'text-[#171717] font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-[#171717] ${
              activePage === 'contact' ? 'text-[#171717] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions (AI Stylist, Search, Wishlist, Cart) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* n8n AI Chatbot Trigger */}
          <button
            type="button"
            aria-label="Ask AI Stylist"
            title="Chat with n8n AI Stylist"
            onClick={() => window.dispatchEvent(new CustomEvent('open-n8n-chat'))}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#171717] hover:text-white text-[#171717] border border-[#E5E2D9] rounded-full transition-colors text-xs font-medium mr-1 shadow-2xs group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9B7E51] group-hover:text-[#D8B984]" />
            <span className="hidden lg:inline text-[11px] uppercase tracking-wider font-semibold">AI Stylist</span>
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 text-[#171717] hover:text-[#9B7E51] transition-colors rounded-full"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Link / Trigger */}
          <button
            type="button"
            aria-label="View saved items"
            onClick={() => handleNavClick('shop')}
            className="hidden sm:flex relative p-2.5 text-[#171717] hover:text-[#9B7E51] transition-colors rounded-full"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#9B7E51] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Bag */}
          <button
            type="button"
            aria-label="Open shopping bag"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-[#171717] hover:text-[#9B7E51] transition-colors rounded-full group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#171717] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-18 z-50 bg-[#FAF9F5] border-t border-[#EBE8DF] flex flex-col p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 text-base font-medium tracking-wide">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('shop', { category: 'All' })}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('shop', { department: 'Men', category: 'Men' })}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>Men's Collection</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('shop', { department: 'Women', category: 'Women' })}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>Women's Collection</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('shop', { department: 'Kids', category: 'Kids' })}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>Kids' Collection</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>About Atelier</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 border-b border-[#EBE8DF]/60 text-[#171717] flex items-center justify-between"
            >
              <span>Contact & Stores</span>
              <ArrowRight className="w-4 h-4 text-[#8E8B82]" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EBE8DF] flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-n8n-chat'));
              }}
              className="w-full py-3 px-4 bg-[#FAF9F5] border border-[#E5E2D9] rounded-xs text-xs font-semibold text-[#171717] flex items-center justify-center gap-2 text-center"
            >
              <Sparkles className="w-4 h-4 text-[#9B7E51]" />
              <span>Ask n8n AI Stylist Concierge</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full py-3 px-4 bg-white border border-[#EBE8DF] rounded-xs text-xs font-medium text-[#171717] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search products, sizes, fabrics</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3 px-4 bg-[#171717] text-white text-xs font-medium rounded-xs flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
