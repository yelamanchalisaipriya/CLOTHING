import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Check, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';
import { ProductImage } from '../components/ProductImage';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    navigateTo,
    placeOrder,
    showToast
  } = useShop();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: 'Karnataka',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'CARD'>('COD');
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick auto-populate city / state when pincode is entered
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => {
      let city = prev.city;
      let state = prev.state;
      if (clean.startsWith('56')) {
        city = 'Bengaluru';
        state = 'Karnataka';
      } else if (clean.startsWith('40')) {
        city = 'Mumbai';
        state = 'Maharashtra';
      } else if (clean.startsWith('11')) {
        city = 'New Delhi';
        state = 'Delhi';
      } else if (clean.startsWith('60')) {
        city = 'Chennai';
        state = 'Tamil Nadu';
      } else if (clean.startsWith('50')) {
        city = 'Hyderabad';
        state = 'Telangana';
      }
      return { ...prev, pincode: clean, city, state };
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, '').length < 10) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your shopping bag is empty', 'error');
      navigateTo('shop');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate real verification network latency
      await new Promise(r => setTimeout(r, 1200));
      await placeOrder(formData, paymentMethod);
    } catch (err) {
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF9F5] min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white p-8 border border-[#EBE8DF] text-center max-w-sm">
          <p className="font-serif text-xl mb-3">No items to checkout</p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigateTo('cart')}
            className="inline-flex items-center gap-1.5 text-xs text-[#8E8B82] hover:text-[#171717] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
            Secure Order Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Shipping Form & Payment Method */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shipping Address Section */}
              <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#EBE8DF]">
                  <h2 className="font-serif text-xl font-medium text-[#171717]">
                    1. Shipping Information
                  </h2>
                  <span className="text-xs text-[#8E8B82]">* Required fields</span>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                        errors.fullName ? 'border-rose-500' : 'border-[#E5E2D9]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Mobile & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="bg-[#EAE7DE] border border-r-0 border-[#E5E2D9] px-3 py-2.5 text-xs text-[#54524D] font-medium">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                          placeholder="9876543210"
                          className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                            errors.mobile ? 'border-rose-500' : 'border-[#E5E2D9]'
                          }`}
                        />
                      </div>
                      {errors.mobile && <p className="text-[11px] text-rose-500 mt-1">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya.sharma@example.com"
                        className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                          errors.email ? 'border-rose-500' : 'border-[#E5E2D9]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                      Street Address & Apartment *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. 42, Lavelle Road, Apartment 3B"
                      className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                        errors.address ? 'border-rose-500' : 'border-[#E5E2D9]'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
                  </div>

                  {/* Pincode, City, State */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="560001"
                        className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                          errors.pincode ? 'border-rose-500' : 'border-[#E5E2D9]'
                        }`}
                      />
                      {errors.pincode && <p className="text-[11px] text-rose-500 mt-1">{errors.pincode}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Bengaluru"
                        className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                          errors.city ? 'border-rose-500' : 'border-[#E5E2D9]'
                        }`}
                      />
                      {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="Karnataka"
                        className={`w-full bg-[#FAF9F5] border px-3.5 py-2.5 text-xs text-[#171717] outline-hidden focus:border-[#171717] ${
                          errors.state ? 'border-rose-500' : 'border-[#E5E2D9]'
                        }`}
                      />
                      {errors.state && <p className="text-[11px] text-rose-500 mt-1">{errors.state}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#EBE8DF]">
                  <h2 className="font-serif text-xl font-medium text-[#171717]">
                    2. Payment Method
                  </h2>
                  <span className="text-xs text-emerald-700 font-medium">100% Encrypted</span>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3.5 p-4 border rounded-xs cursor-pointer transition-colors ${
                      paymentMethod === 'COD'
                        ? 'border-[#171717] bg-[#FAF9F5]'
                        : 'border-[#E5E2D9] hover:border-[#171717]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 accent-[#171717]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#171717] uppercase tracking-wide">
                          Cash on Delivery (COD)
                        </span>
                        <Banknote className="w-4 h-4 text-[#8E8B82]" />
                      </div>
                      <p className="text-xs text-[#6E6D6A] mt-0.5">
                        Pay via cash, UPI, or card to courier upon doorstep delivery.
                      </p>
                    </div>
                  </label>

                  {/* UPI */}
                  <label
                    className={`flex items-start gap-3.5 p-4 border rounded-xs cursor-pointer transition-colors ${
                      paymentMethod === 'UPI'
                        ? 'border-[#171717] bg-[#FAF9F5]'
                        : 'border-[#E5E2D9] hover:border-[#171717]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 accent-[#171717]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#171717] uppercase tracking-wide">
                          Instant UPI / QR Code (Demo)
                        </span>
                        <QrCode className="w-4 h-4 text-[#8E8B82]" />
                      </div>
                      <p className="text-xs text-[#6E6D6A] mt-0.5">
                        Google Pay, PhonePe, Paytm, BHIM or any UPI handle.
                      </p>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-start gap-3.5 p-4 border rounded-xs cursor-pointer transition-colors ${
                      paymentMethod === 'CARD'
                        ? 'border-[#171717] bg-[#FAF9F5]'
                        : 'border-[#E5E2D9] hover:border-[#171717]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                      className="mt-1 accent-[#171717]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#171717] uppercase tracking-wide">
                          Credit / Debit Card (Demo)
                        </span>
                        <CreditCard className="w-4 h-4 text-[#8E8B82]" />
                      </div>
                      <p className="text-xs text-[#6E6D6A] mt-0.5">
                        Visa, Mastercard, RuPay, American Express.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order Action */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white p-6 sm:p-8 border border-[#EBE8DF] rounded-xs shadow-xs space-y-5">
                <h2 className="font-serif text-xl font-medium text-[#171717] pb-3 border-b border-[#EBE8DF]">
                  Order Items ({cart.length})
                </h2>

                {/* Items Preview */}
                <div className="max-h-60 overflow-y-auto divide-y divide-[#EBE8DF] pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                      <div className="w-12 h-16 bg-[#F4F2EC] rounded-xs overflow-hidden shrink-0">
                        <ProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          aspectRatio="4/5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-medium text-[#171717] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#6E6D6A] mt-0.5">
                          {item.size} · {item.color.name} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#171717] tabular-nums shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-[#54524D] pt-4 border-t border-[#EBE8DF]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171717] tabular-nums">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#9B7E51]">
                      <span>Discount</span>
                      <span className="font-semibold tabular-nums">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Delivery</span>
                    <span className="font-semibold text-[#171717] tabular-nums">
                      {deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#EBE8DF] flex justify-between text-base font-semibold text-[#171717]">
                    <span>Total Payable</span>
                    <span className="text-xl tabular-nums">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#171717] hover:bg-[#9B7E51] disabled:bg-[#8E8B82] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying & Placing Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Confirm & Place Order</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-[11px] text-[#8E8B82] justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>30-Day Purchase Protection Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
