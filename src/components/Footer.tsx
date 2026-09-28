import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, MessageCircle, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed! Check your inbox for 10% welcome code: VELORA10');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#171717] text-[#EDEAE2] pt-16 pb-12 border-t border-[#292929]">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#2B2B2B]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#242424] text-[#D8B984] rounded-xs shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Complimentary Delivery</h4>
              <p className="text-xs text-[#9E9B93] mt-1 leading-relaxed">
                Free standard express shipping on all domestic orders over ₹1,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#242424] text-[#D8B984] rounded-xs shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">7-Day Effortless Returns</h4>
              <p className="text-xs text-[#9E9B93] mt-1 leading-relaxed">
                Doorstep pickup and instant exchange or full refund with no hidden terms.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#242424] text-[#D8B984] rounded-xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Artisanal Sourcing</h4>
              <p className="text-xs text-[#9E9B93] mt-1 leading-relaxed">
                100% natural, certified organic fibers & responsibly loomed textiles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#242424] text-[#D8B984] rounded-xs shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Direct Atelier Concierge</h4>
              <p className="text-xs text-[#9E9B93] mt-1 leading-relaxed">
                Available Mon–Sat, 10am–8pm IST via WhatsApp and phone assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <h3 className="font-serif text-2xl font-semibold tracking-wider text-white">
              VÉLORA <span className="font-light italic text-[#D8B984]">ATELIER</span>
            </h3>
            <p className="text-xs text-[#9E9B93] mt-3 leading-relaxed max-w-md">
              A contemporary Indian ready-to-wear atelier dedicated to architectural silhouettes, breathable natural textiles, and quiet sartorial craftsmanship.
            </p>

            <div className="mt-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-white block mb-2">
                Join the Private Circle
              </span>
              <p className="text-xs text-[#9E9B93] mb-3">
                Receive invitation-only previews, private seasonal trunk shows, and 10% off your inaugural order.
              </p>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#222] border border-[#333] text-xs text-[#D8B984]">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Welcome to the Atelier. Use code <strong>VELORA10</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-[#242424] border border-[#383838] focus:border-[#D8B984] px-3.5 py-2.5 text-xs text-white placeholder-[#78756E] outline-hidden transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="bg-white hover:bg-[#D8B984] text-[#171717] px-4 py-2.5 text-xs font-semibold tracking-wider transition-colors shrink-0 flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#D8B984] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ABA79D]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { department: 'Women' })}
                  className="hover:text-white transition-colors"
                >
                  Womenswear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { department: 'Men' })}
                  className="hover:text-white transition-colors"
                >
                  Menswear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { department: 'Kids' })}
                  className="hover:text-white transition-colors"
                >
                  Kids' Essentials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'Jackets' })}
                  className="hover:text-white transition-colors"
                >
                  Outerwear & Coats
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'Accessories' })}
                  className="hover:text-white transition-colors"
                >
                  Accessories & Leather
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'All' })}
                  className="hover:text-white transition-colors"
                >
                  Explore All Pieces
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#D8B984] mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ABA79D]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Size & Fitting Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Care & Fabric Longevity
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#D8B984] mb-4">
              The Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ABA79D]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Philosophy & Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  Sustainable Materials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Flagship Boutiques
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & WhatsApp
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#78756E]">
                GST Registered · Made in India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#292929] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7770] gap-4">
        <div>
          © {new Date().getFullYear()} VÉLORA ATELIER PVT. LTD. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Bengaluru · Mumbai · New Delhi</span>
          <span aria-hidden="true">·</span>
          <span>Terms & Privacy</span>
        </div>
      </div>
    </footer>
  );
};
