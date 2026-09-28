import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails, ShippingAddress, ProductColor, FilterState, PageView } from '../types';
import { PRODUCTS, COUPONS } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  finalTotal: number;
  freeDeliveryThreshold: number;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  activePage: PageView;
  selectedProductId: string | null;
  navigateTo: (page: PageView, options?: { category?: string; department?: string; productId?: string }) => void;
  openProduct: (productId: string) => void;

  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  lastOrder: OrderDetails | null;
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: 'COD' | 'UPI' | 'CARD') => Promise<{ success: boolean; orderId: string }>;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const initialFilterState: FilterState = {
  search: '',
  department: 'All',
  category: 'All',
  sizes: [],
  colors: [],
  priceRange: [1000, 10000],
  sortBy: 'featured'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage hydrated states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('velora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('velora_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  // Toast timer
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 1999;
  const deliveryFee = subtotal === 0 || subtotal >= freeDeliveryThreshold ? 0 : 149;

  let discountAmount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon.percent) {
      discountAmount = Math.round((subtotal * coupon.percent) / 100);
    } else if (coupon.amount) {
      discountAmount = Math.min(coupon.amount, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Actions
  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const cartItemId = `${product.id}_${size}_${color.name}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, size, color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const config = COUPONS[cleanCode];
    if (!config) {
      return { success: false, message: 'Invalid coupon code. Try VELORA10 or FIRSTBUY' };
    }
    if (subtotal < config.minSpend) {
      return { success: false, message: `Minimum order value of ₹${config.minSpend.toLocaleString('en-IN')} required for ${cleanCode}` };
    }
    setAppliedCoupon(cleanCode);
    showToast(`Promo ${cleanCode} applied successfully!`);
    return { success: true, message: `Promo code ${cleanCode} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: PageView, options?: { category?: string; department?: string; productId?: string }) => {
    if (options?.category || options?.department) {
      setFilterState(prev => ({
        ...prev,
        category: options.category || prev.category,
        department: options.department || prev.department,
        search: ''
      }));
    }
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const placeOrder = async (shippingAddress: ShippingAddress, paymentMethod: 'COD' | 'UPI' | 'CARD') => {
    // Generate order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `VEL-${randomNum}`;
    
    // Delivery estimated date: 3-4 days from now
    const d = new Date();
    d.setDate(d.getDate() + 4);
    const estimatedDelivery = d.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder: OrderDetails = {
      orderId,
      items: [...cart],
      shippingAddress,
      paymentMethod,
      subtotal,
      discount: discountAmount,
      deliveryFee,
      total: finalTotal,
      createdAt: new Date().toISOString(),
      estimatedDelivery
    };

    setLastOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    setActivePage('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Order confirmed! Thank you for shopping with VÉLORA.');
    return { success: true, orderId };
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        deliveryFee,
        discountAmount,
        finalTotal,
        freeDeliveryThreshold,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        activePage,
        selectedProductId,
        navigateTo,
        openProduct,
        filterState,
        setFilterState,
        resetFilters,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        lastOrder,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
