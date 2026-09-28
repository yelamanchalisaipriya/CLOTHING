import React, { useState } from 'react';
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag, Check, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductImage } from '../components/ProductImage';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    freeDeliveryThreshold,
    updateQuantity,
    removeFromCart,
    clearCart,
    navigateTo,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMessage({ text: res.message, error: false });
      setCouponCode('');
    } else {
      setCouponMessage({ text: res.message, error: true });
    }
  };

  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF9F5] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center bg-white p-10 border border-[#EBE8DF] rounded-xs shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF9F5] flex items-center justify-center text-[#8E8B82] mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 stroke-1" />
          </div>
          <h1 className="font-serif text-2xl font-normal text-[#171717] mb-2">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs text-[#6E6D6A] mb-8 leading-relaxed">
            There are currently no items in your cart. Explore our seasonal collections of modern tailored clothing.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop', { category: 'All' })}
            className="w-full py-3.5 px-6 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            Start Exploring Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-[#EBE8DF]">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#8E8B82] block mb-1">
              Checkout Bag
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
              Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-[#8E8B82] hover:text-rose-600 mt-2 sm:mt-0 transition-colors"
          >
            Clear entire bag
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#F4F2EC] p-4 border border-[#E8E5DC] rounded-xs mb-8">
          <div className="flex items-center justify-between text-xs mb-2 font-medium">
            {amountNeededForFreeDelivery > 0 ? (
              <span className="text-[#54524D]">
                Add <strong className="text-[#171717]">₹{amountNeededForFreeDelivery.toLocaleString('en-IN')}</strong> more to qualify for complimentary express delivery
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4" />
                Congratulations! You unlocked complimentary express shipping
              </span>
            )}
            <span className="text-[#8E8B82] text-xs tabular-nums">{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#171717] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 bg-white border border-[#EBE8DF] rounded-xs overflow-hidden shadow-xs divide-y divide-[#EBE8DF]">
            {cart.map((item) => (
              <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-26 bg-[#F4F2EC] rounded-xs overflow-hidden shrink-0">
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      title={item.product.name}
                      aspectRatio="4/5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8E8B82]">
                      {item.product.department} · {item.product.category}
                    </span>
                    <h3 className="font-serif text-base font-medium text-[#171717] mt-0.5">
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-[#6E6D6A] mt-1 flex items-center gap-3">
                      <span>Size: <strong className="text-[#171717]">{item.size}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full inline-block border border-black/10"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <span>{item.color.name}</span>
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#171717] mt-1 tabular-nums sm:hidden">
                      ₹{item.product.price.toLocaleString('en-IN')} per unit
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F4F2EC]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E5E2D9] rounded-xs bg-[#FAF9F5]">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-[#6E6D6A] hover:text-[#171717] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold tabular-nums text-[#171717]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-[#6E6D6A] hover:text-[#171717] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[90px]">
                    <span className="font-sans text-base font-semibold text-[#171717] tabular-nums block">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#8E8B82] tabular-nums hidden sm:block">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#8E8B82] hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 border border-[#EBE8DF] rounded-xs shadow-xs space-y-5">
              <h2 className="font-serif text-xl font-medium text-[#171717] pb-3 border-b border-[#EBE8DF]">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#171717] block mb-2">
                  Promotional Voucher
                </span>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-[#F4F2EC] rounded-xs text-xs">
                    <div className="flex items-center gap-1.5 text-[#171717]">
                      <Tag className="w-3.5 h-3.5 text-[#9B7E51]" />
                      <span>Code <strong>{appliedCoupon}</strong> active</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponMessage(null);
                      }}
                      placeholder="e.g. VELORA10"
                      className="flex-1 bg-[#FAF9F5] border border-[#E5E2D9] px-3 py-2 text-xs uppercase text-[#171717] placeholder:normal-case outline-hidden focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#333]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 ${couponMessage.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {couponMessage.text}
                  </p>
                )}
                <p className="text-[11px] text-[#8E8B82] mt-2">
                  Tip: Use <strong>VELORA10</strong> for 10% off or <strong>FIRSTBUY</strong> for ₹500 off.
                </p>
              </div>

              {/* Line item prices */}
              <div className="space-y-2 text-xs text-[#54524D] pt-3 border-t border-[#EBE8DF]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#171717] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#9B7E51]">
                    <span>Promotional Voucher Discount</span>
                    <span className="font-semibold tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Domestic Shipping</span>
                  <span className="font-semibold text-[#171717] tabular-nums">
                    {deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#EBE8DF] flex justify-between text-base font-semibold text-[#171717]">
                  <span>Total Amount</span>
                  <span className="text-xl tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#8E8B82]">All applicable taxes & GST included.</p>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigateTo('checkout')}
                className="w-full py-4 px-6 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => navigateTo('shop', { category: 'All' })}
                  className="text-xs text-[#6E6D6A] hover:text-[#171717] underline"
                >
                  Continue Browsing Catalog
                </button>
              </div>
            </div>

            {/* Reassurance Badge */}
            <div className="bg-[#F4F2EC] p-4 rounded-xs border border-[#E8E5DC] flex items-center gap-3 text-xs text-[#54524D]">
              <ShieldCheck className="w-5 h-5 text-[#9B7E51] shrink-0" />
              <span>
                Encrypted checkout with Cash on Delivery (COD) and seamless UPI payments.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
