import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';

export const CartDrawer: React.FC = () => {
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
    isCartOpen,
    setIsCartOpen,
    navigateTo,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#EBE8DF] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#171717]" />
              <h2 className="font-serif text-xl font-semibold tracking-wide text-[#171717]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#6E6D6A] font-medium ml-1">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              type="button"
              aria-label="Close bag"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6E6D6A] hover:text-[#171717] rounded-full hover:bg-[#FAF9F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F4F2EC] px-5 py-3 border-b border-[#E8E5DC]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {amountNeededForFreeDelivery > 0 ? (
                <span className="text-[#54524D]">
                  Add <strong className="text-[#171717]">₹{amountNeededForFreeDelivery.toLocaleString('en-IN')}</strong> for Complimentary Delivery
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Unlocked Complimentary Express Delivery
                </span>
              )}
              <span className="text-[#8E8B82] text-[11px] tabular-nums">
                {freeDeliveryProgress}%
              </span>
            </div>
            <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#171717] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F4F2EC] flex items-center justify-center text-[#8E8B82] mb-4">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#171717] mb-1">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-[#6E6D6A] max-w-xs mb-6 leading-relaxed">
                Discover our latest handcrafted silhouettes and timeless essentials for this season.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop', { category: 'All' });
                }}
                className="py-3 px-6 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Explore New Arrivals
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE8DF]">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="w-20 h-26 shrink-0 bg-[#F4F2EC] overflow-hidden rounded-xs">
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      title={item.product.name}
                      aspectRatio="4/5"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#171717] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9E9B93] hover:text-rose-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-[#6E6D6A] mt-0.5 flex items-center gap-2">
                        <span>Size: <strong className="text-[#171717]">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span>{item.color.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E5E2D9] rounded-xs bg-white">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#6E6D6A] hover:text-[#171717] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#6E6D6A] hover:text-[#171717] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-sans text-sm font-semibold text-[#171717] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EBE8DF] bg-white space-y-4">
              {/* Coupon Box */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#F4F2EC] rounded-xs text-xs text-[#171717]">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#9B7E51]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> active</span>
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
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VELORA10)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 bg-[#FAF9F5] border border-[#E5E2D9] px-3 py-1.5 text-xs text-[#171717] uppercase placeholder:normal-case placeholder:text-[#9E9B93] outline-hidden focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#171717] text-white text-xs font-medium hover:bg-[#333] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#54524D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171717] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#9B7E51]">
                    <span>Promotional Discount</span>
                    <span className="font-medium tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-[#171717] tabular-nums">
                    {deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EBE8DF] flex justify-between text-sm font-semibold text-[#171717]">
                  <span>Total</span>
                  <span className="text-base tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#8E8B82]">All duties and GST taxes included.</p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('cart');
                  }}
                  className="py-3 px-4 border border-[#171717] text-[#171717] text-xs font-semibold tracking-wider uppercase hover:bg-[#FAF9F5] transition-colors text-center"
                >
                  View Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="py-3 px-4 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
