import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, Check, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our atelier concierge!');
    setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  const handleWhatsApp = () => {
    // Open whatsapp simulation
    showToast('Opening WhatsApp Atelier Concierge (+91 98450 12345)...', 'info');
    window.open('https://wa.me/919845012345?text=Hello%20V%C3%A9lora%20Atelier%2C%20I%20would%20like%20assistance%20with%20an%20order.', '_blank');
  };

  const faqs = [
    {
      q: 'How long does domestic shipping take across India?',
      a: 'All orders are dispatched within 24 hours from our Mumbai or Bengaluru atelier facilities. Metro cities (Bengaluru, Mumbai, Delhi-NCR, Chennai, Hyderabad) receive delivery within 2–3 business days. Other pin codes typically arrive within 4–5 business days.'
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We offer a complimentary 7-day hassle-free reverse pickup from your doorstep. The garment must be unworn, unwashed, and have its original atelier tags intact. Exchanges for different sizes or store credit are processed immediately upon pickup.'
    },
    {
      q: 'Are custom alterations available for online orders?',
      a: 'Yes. If you need trouser hems adjusted or sleeve adjustments, contact our atelier concierge via WhatsApp (+91 98450 12345) with your Order ID within 2 hours of placing the order.'
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We support Cash on Delivery (COD), all Indian UPI apps (Google Pay, PhonePe, Paytm, CRED), Credit/Debit cards (Visa, MasterCard, RuPay, Amex), and Net Banking.'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-2">
            Client Relations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#171717]">
            Connect with Our Atelier
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#6E6D6A] leading-relaxed">
            Whether you require personal styling advice, bespoke size assistance, or order updates, our concierge team is at your disposal.
          </p>
        </div>

        {/* 3 Contact Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Concierge Phone */}
          <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-3">
            <div className="w-10 h-10 bg-[#FAF9F5] text-[#9B7E51] rounded-xs flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#171717]">Phone Concierge</h3>
            <p className="text-xs text-[#6E6D6A]">Direct line for instant guidance & phone orders.</p>
            <div className="pt-2 text-xs font-semibold text-[#171717] space-y-1">
              <p>+91 (80) 4912 3456</p>
              <p className="text-[#8E8B82] font-normal">Mon – Sat, 10:00 AM – 8:00 PM IST</p>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-3">
            <div className="w-10 h-10 bg-[#FAF9F5] text-emerald-600 rounded-xs flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#171717]">WhatsApp Stylist</h3>
            <p className="text-xs text-[#6E6D6A]">Chat directly with our senior fit advisors.</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Card 3: Email Inquiries */}
          <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-3">
            <div className="w-10 h-10 bg-[#FAF9F5] text-[#9B7E51] rounded-xs flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#171717]">Email Concierge</h3>
            <p className="text-xs text-[#6E6D6A]">For orders, alterations, and press inquiries.</p>
            <div className="pt-2 text-xs font-semibold text-[#171717] space-y-1">
              <p>concierge@veloraatelier.com</p>
              <p className="text-[#8E8B82] font-normal">Responses within 4 business hours</p>
            </div>
          </div>
        </div>

        {/* Contact Form & Flagship Boutique Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#EBE8DF] rounded-xs shadow-xs">
            <h2 className="font-serif text-2xl font-normal text-[#171717] mb-2">
              Send an Atelier Inquiry
            </h2>
            <p className="text-xs text-[#6E6D6A] mb-6">
              Fill out the form below and an atelier stylist will get in touch shortly.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xs text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg text-emerald-900 font-medium">Message Received</h4>
                <p className="text-xs text-emerald-800">
                  Thank you for writing to us. Our concierge will review your note and respond within a few hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-emerald-900 underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ananya Sen"
                      className="w-full bg-[#FAF9F5] border border-[#E5E2D9] px-3.5 py-2.5 outline-hidden focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ananya@example.com"
                      className="w-full bg-[#FAF9F5] border border-[#E5E2D9] px-3.5 py-2.5 outline-hidden focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAF9F5] border border-[#E5E2D9] px-3.5 py-2.5 outline-hidden focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-[#E5E2D9] px-3.5 py-2.5 outline-hidden focus:border-[#171717]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Status">Order Status & Tracking</option>
                      <option value="Size Consultation">Size & Fit Consultation</option>
                      <option value="Exchange / Return">Exchange or Return Assistance</option>
                      <option value="Bespoke Request">Bespoke / Bulk Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can assist you..."
                    className="w-full bg-[#FAF9F5] border border-[#E5E2D9] p-3.5 outline-hidden focus:border-[#171717] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#171717] hover:bg-[#9B7E51] text-white font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Physical Flagship Boutiques */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-5">
              <h2 className="font-serif text-2xl font-normal text-[#171717]">
                Flagship Boutiques
              </h2>
              <p className="text-xs text-[#6E6D6A]">
                Visit our physical showrooms for private fittings, custom tailoring consultations, and fabric viewings.
              </p>

              {/* Location 1: Bengaluru */}
              <div className="pt-4 border-t border-[#EBE8DF] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#171717] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#9B7E51]" />
                  <span>Bengaluru Flagship</span>
                </div>
                <p className="text-[#54524D] leading-relaxed">
                  12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                </p>
                <div className="flex items-center gap-2 text-[#8E8B82] pt-1">
                  <Clock className="w-3 h-3" />
                  <span>Open Daily: 11:00 AM – 9:00 PM IST</span>
                </div>
              </div>

              {/* Location 2: Mumbai */}
              <div className="pt-4 border-t border-[#EBE8DF] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#171717] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#9B7E51]" />
                  <span>Mumbai Heritage Store</span>
                </div>
                <p className="text-[#54524D] leading-relaxed">
                  Ropewalk Lane, Kala Ghoda, Fort, Mumbai, Maharashtra 400001
                </p>
                <div className="flex items-center gap-2 text-[#8E8B82] pt-1">
                  <Clock className="w-3 h-3" />
                  <span>Open Daily: 11:00 AM – 8:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-[#FAF9F5] p-6 border border-[#E8E5DC] rounded-xs text-xs space-y-3">
              <span className="font-semibold uppercase tracking-wider text-[#171717] block">
                Follow The Atelier
              </span>
              <p className="text-[#6E6D6A]">
                Join our visual journal for behind-the-scenes cutting room glimpses, styling lookbooks, and seasonal campaigns.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-[#171717]">
                <a href="#instagram" onClick={(e) => { e.preventDefault(); showToast('Instagram: @veloraatelier'); }} className="hover:text-[#9B7E51]">
                  Instagram
                </a>
                <span aria-hidden="true">·</span>
                <a href="#pinterest" onClick={(e) => { e.preventDefault(); showToast('Pinterest: @veloraatelier'); }} className="hover:text-[#9B7E51]">
                  Pinterest
                </a>
                <span aria-hidden="true">·</span>
                <a href="#twitter" onClick={(e) => { e.preventDefault(); showToast('X / Twitter: @veloraatelier'); }} className="hover:text-[#9B7E51]">
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-[#EBE8DF]">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#9B7E51] font-semibold block mb-1">
              Answers & Assistance
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#171717]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EBE8DF] rounded-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base text-[#171717] font-medium"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E8B82] transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-[#171717]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#54524D] leading-relaxed border-t border-[#F4F2EC] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
