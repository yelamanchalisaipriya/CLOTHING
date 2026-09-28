import React from 'react';
import { CheckCircle2, PackageCheck, ArrowRight, Printer, MapPin, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductImage } from '../components/ProductImage';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder, navigateTo } = useShop();

  if (!lastOrder) {
    return (
      <div className="bg-[#FAF9F5] min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white p-8 border border-[#EBE8DF] text-center max-w-sm">
          <p className="font-serif text-xl mb-3">No recent order found</p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  const { orderId, items, shippingAddress, paymentMethod, total, estimatedDelivery, subtotal, discount, deliveryFee } = lastOrder;

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Receipt Card */}
        <div className="bg-white border border-[#EBE8DF] rounded-xs shadow-md p-6 sm:p-10 space-y-8">
          {/* Header Badge */}
          <div className="text-center pb-6 border-b border-[#EBE8DF]">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9B7E51]">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] mt-1">
              Thank You, {shippingAddress.fullName}
            </h1>
            <p className="text-xs text-[#6E6D6A] mt-2 max-w-md mx-auto">
              Your order has been registered at our atelier. A confirmation dispatch note will be sent to <strong>{shippingAddress.email}</strong>.
            </p>

            <div className="mt-4 inline-flex items-center gap-3 bg-[#FAF9F5] border border-[#E8E5DC] px-4 py-2 text-xs font-medium text-[#171717]">
              <span>Order Reference:</span>
              <strong className="tracking-wider text-sm font-sans">{orderId}</strong>
            </div>
          </div>

          {/* Delivery & Address Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FAF9F5] p-5 rounded-xs border border-[#E8E5DC] text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#171717] uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4 text-[#9B7E51]" />
                <span>Estimated Arrival</span>
              </div>
              <p className="text-sm font-serif font-medium text-[#171717]">
                By {estimatedDelivery}
              </p>
              <p className="text-[#6E6D6A]">Shipped via Express Air Courier with live tracking.</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#171717] uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-[#9B7E51]" />
                <span>Delivery Address</span>
              </div>
              <p className="text-[#171717] font-medium">{shippingAddress.fullName}</p>
              <p className="text-[#6E6D6A] leading-relaxed">
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}
              </p>
              <p className="text-[#6E6D6A]">Phone: +91 {shippingAddress.mobile}</p>
            </div>
          </div>

          {/* Items Purchased List */}
          <div>
            <h3 className="font-serif text-lg font-medium text-[#171717] mb-3">
              Garments in This Order ({items.length})
            </h3>
            <div className="divide-y divide-[#EBE8DF] border-y border-[#EBE8DF]">
              {items.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-[#F4F2EC] rounded-xs overflow-hidden shrink-0">
                      <ProductImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        aspectRatio="4/5"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#171717]">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-[#6E6D6A] mt-0.5 flex items-center gap-2">
                        <span>Size: {item.size}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.color.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#171717] tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Breakdown Summary */}
          <div className="space-y-2 text-xs text-[#54524D] pt-2">
            <div className="flex justify-between">
              <span>Payment Mode</span>
              <span className="font-semibold text-[#171717]">
                {paymentMethod === 'COD' ? 'Cash on Delivery (Pay upon arrival)' : paymentMethod === 'UPI' ? 'Instant UPI' : 'Credit / Debit Card'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#171717] tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#9B7E51]">
                <span>Promotional Voucher</span>
                <span className="font-medium tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-medium text-[#171717] tabular-nums">
                {deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="pt-3 border-t border-[#EBE8DF] flex justify-between text-base font-semibold text-[#171717]">
              <span>Final Total Paid / Due</span>
              <span className="text-xl tabular-nums">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 border border-[#E5E2D9] hover:border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('shop', { category: 'All' })}
              className="flex-1 py-3 px-4 bg-[#171717] hover:bg-[#9B7E51] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
