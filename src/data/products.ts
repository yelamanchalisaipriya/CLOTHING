import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- WOMENSWEAR ---
  {
    id: 'prod-w-01',
    name: 'Sculptural Draped Silk Midi Dress',
    category: 'Dresses',
    department: 'Women',
    price: 5499,
    originalPrice: 6999,
    discountPercent: 21,
    shortDescription: 'Fluid mulberry silk midi dress with an asymmetric drape neckline and contoured waist.',
    description: 'Cut from premium grade 100% mulberry silk, this sculptural midi dress effortlessly marries effortless fluid movement with precise architectural lines. Featuring a subtle boat neckline, delicate bias cut that drapes naturally over the silhouette, and a discreet side seam zip.',
    details: {
      fabric: '100% Grade 6A Mulberry Silk (19 Momme)',
      fit: 'Relaxed bias cut; falls gracefully around the mid-calf.',
      care: 'Dry clean only or delicate hand wash in cold water with silk detergent.',
      origin: 'Crafted in Bengaluru, India with sustainably sourced silk.',
      modelHeight: "5'9\" (175 cm)",
      modelWearingSize: 'S'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Cream', hex: '#FAF7F0' },
      { name: 'Onyx Noir', hex: '#1C1C1E' },
      { name: 'Warm Terracotta', hex: '#A35D49' }
    ],
    images: [
      '/src/assets/images/category_women_collection_1790578941741.jpg',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 42,
    isNew: true,
    isBestSeller: true,
    isTrending: true
  },
  {
    id: 'prod-w-02',
    name: 'Tailored Double-Breasted Camel Blazer',
    category: 'Jackets',
    department: 'Women',
    price: 6899,
    originalPrice: 8499,
    discountPercent: 19,
    shortDescription: 'Sharply tailored virgin wool blazer with horn buttons and structured shoulders.',
    description: 'An enduring wardrobe cornerstone. Expertly constructed from lightweight Italian virgin wool with structured canvassed lapels, natural horn buttons, flap pockets, and a lustrous cupro lining for smooth layering over knits and silks.',
    details: {
      fabric: '96% Italian Virgin Wool, 4% Elastane; 100% Bemberg Cupro lining',
      fit: 'Tailored regular silhouette with gentle shoulder padding.',
      care: 'Specialist dry clean only.',
      origin: 'Tailored at our heritage atelier in Mumbai.',
      modelHeight: "5'10\" (178 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel Sand', hex: '#C29B72' },
      { name: 'Midnight Charcoal', hex: '#262629' },
      { name: 'Cream Chalk', hex: '#EBE6DC' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 8,
    rating: 4.8,
    reviewCount: 31,
    isBestSeller: true,
    isSpecialOffer: true
  },
  {
    id: 'prod-w-03',
    name: 'Airy Organic Cotton Poplin Shirt',
    category: 'Shirts',
    department: 'Women',
    price: 2499,
    originalPrice: 3199,
    discountPercent: 22,
    shortDescription: 'Crisp organic GOTS-certified poplin shirt with elongated cuffs and mother-of-pearl buttons.',
    description: 'Woven from long-staple organic cotton that delivers a crisp handfeel and breathable all-day comfort. Designed with a clean pointed collar, drop shoulder seam, and a curved hem that sits cleanly both tucked and untucked.',
    details: {
      fabric: '100% GOTS-Certified Organic Cotton Poplin',
      fit: 'Relaxed oversized fit.',
      care: 'Machine wash delicate at 30°C. Warm iron while slightly damp.',
      origin: 'Woven in Coimbatore, India.',
      modelHeight: "5'8\" (173 cm)",
      modelWearingSize: 'S'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Pale French Blue', hex: '#C9D6DF' },
      { name: 'Soft Sage', hex: '#B2BEB5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.7,
    reviewCount: 64,
    isTrending: true
  },
  {
    id: 'prod-w-04',
    name: 'Wide-Leg High-Rise Lyocell Trousers',
    category: 'Jeans',
    department: 'Women',
    price: 3299,
    originalPrice: 3999,
    discountPercent: 18,
    shortDescription: 'High-waisted tailored trousers with front pleats and fluid wide legs.',
    description: 'Engineered for seamless transition from workspace to evening. Woven from sustainable TENCEL™ lyocell and linen, providing dramatic drape without stiffness. Features deep side pockets and a neat blind hem.',
    details: {
      fabric: '70% TENCEL™ Lyocell, 30% Belgian Linen',
      fit: 'High-waisted, wide-leg cut with front double pleats.',
      care: 'Machine wash gentle inside out. Line dry in shade.',
      origin: 'Responsibly crafted in Tirupur, India.',
      modelHeight: "5'9\" (176 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ecru', hex: '#EBE5D8' },
      { name: 'Charcoal Black', hex: '#232323' },
      { name: 'Olive Drab', hex: '#5B6547' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 19,
    rating: 4.9,
    reviewCount: 48,
    isBestSeller: true
  },
  {
    id: 'prod-w-05',
    name: 'Asymmetrical Draped Crepe Top',
    category: 'Tops',
    department: 'Women',
    price: 2199,
    originalPrice: 2699,
    discountPercent: 19,
    shortDescription: 'Sleeveless top with sculptural one-shoulder fold and fluid waistline.',
    description: 'An architectural top crafted from textured matte crepe that resists wrinkles. The asymmetric neckline creates an elevated, modern profile that pairs impeccably with tailored trousers or sleek denim.',
    details: {
      fabric: '100% Viscose Crepe (EcoVero certified)',
      fit: 'Contoured bust with gentle flare at waist.',
      care: 'Gentle hand wash cold; dry flat.',
      origin: 'Handcrafted in Jaipur, India.',
      modelHeight: "5'8\" (173 cm)",
      modelWearingSize: 'S'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pitch Black', hex: '#121212' },
      { name: 'Warm Terracotta', hex: '#9E5B40' },
      { name: 'Porcelain White', hex: '#F5F5F0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.6,
    reviewCount: 19,
    isNew: true
  },
  {
    id: 'prod-w-06',
    name: 'Vintage Wash Wide-Leg Rigid Jeans',
    category: 'Jeans',
    department: 'Women',
    price: 3499,
    originalPrice: 4199,
    discountPercent: 17,
    shortDescription: 'Authentic 13oz non-stretch Japanese selvedge denim in a clean vintage indigo wash.',
    description: 'Crafted with old-school shuttle looms for true denim purists. Sits comfortably at the natural waist with a straight wide leg, antique silver hardware, and reinforced bar-tacks for years of wear.',
    details: {
      fabric: '100% Kurabo Mills Cotton Selvedge Denim (13 oz)',
      fit: 'High-rise, relaxed straight-wide leg.',
      care: 'Wash inside-out in cold water. Hang dry.',
      origin: 'Loomed in Okayama, finished in Gujarat.',
      modelHeight: "5'9\" (175 cm)",
      modelWearingSize: 'S'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Indigo', hex: '#3B536E' },
      { name: 'Washed Black', hex: '#2E3033' },
      { name: 'Chalk Bone', hex: '#E8E4DA' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 16,
    rating: 4.8,
    reviewCount: 39,
    isTrending: true
  },
  {
    id: 'prod-w-07',
    name: 'Pure Cashmere Mock-Neck Knit',
    category: 'Tops',
    department: 'Women',
    price: 5899,
    originalPrice: 7299,
    discountPercent: 19,
    shortDescription: 'Ultra-soft 2-ply Mongolian cashmere sweater with delicate ribbed hems.',
    description: 'Unrivaled warmth and lightness. Made using Grade-A Mongolian cashmere with a ribbed mock neck and dropped shoulder seams. Designed to be cherished season after season.',
    details: {
      fabric: '100% Grade-A Mongolian Cashmere (12 gauge, 2-ply)',
      fit: 'Easy regular fit.',
      care: 'Hand wash with wool shampoo or dry clean.',
      origin: 'Knit in Himachal Pradesh, India.',
      modelHeight: "5'8\" (173 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7CEC2' },
      { name: 'Midnight Charcoal', hex: '#27282B' },
      { name: 'Deep Sage', hex: '#485848' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 11,
    rating: 5.0,
    reviewCount: 26,
    isSpecialOffer: true
  },
  {
    id: 'prod-w-08',
    name: 'Structured Linen Trench Coat',
    category: 'Jackets',
    department: 'Women',
    price: 7499,
    originalPrice: 9299,
    discountPercent: 19,
    shortDescription: 'Double-breasted heavyweight European linen trench with storm flap and buckled belt.',
    description: 'The definitive seasonal transitional outer layer. Cut from structured 320gsm pure linen, featuring gunmetal hardware, epaulettes, deep welt pockets, and a detachable tie belt that cinches the waist beautifully.',
    details: {
      fabric: '100% Belgian Flax Heavyweight Linen (320 GSM)',
      fit: 'Oversized silhouette; size down for a closer fit.',
      care: 'Dry clean recommended.',
      origin: 'Tailored at our Mumbai atelier.',
      modelHeight: "5'10\" (178 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Sand Taupe', hex: '#BDAEA2' },
      { name: 'Graphite Grey', hex: '#333538' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 6,
    rating: 4.9,
    reviewCount: 18,
    isNew: true
  },

  // --- MENSWEAR ---
  {
    id: 'prod-m-01',
    name: 'French Linen Mandarin Collar Shirt',
    category: 'Shirts',
    department: 'Men',
    price: 2899,
    originalPrice: 3499,
    discountPercent: 17,
    shortDescription: 'Relaxed breathable linen shirt with clean band collar and real mother-of-pearl buttons.',
    description: 'Crafted from premium Normandy flax linen that grows softer and more characterful with every laundering. Features a tailored band collar, single-needle stitching throughout, and a back box pleat for effortless shoulder mobility.',
    details: {
      fabric: '100% Certified French Normandy Linen',
      fit: 'Relaxed modern fit.',
      care: 'Machine wash cool on delicate. Iron warm or wear naturally rumpled.',
      origin: 'Tailored in Tirupur, India.',
      modelHeight: "6'1\" (185 cm)",
      modelWearingSize: 'L'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Natural Flax', hex: '#DED6C7' },
      { name: 'Deep Indigo', hex: '#212B38' },
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    images: [
      '/src/assets/images/category_men_collection_1790578925997.jpg',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviewCount: 53,
    isNew: true,
    isBestSeller: true,
    isTrending: true
  },
  {
    id: 'prod-m-02',
    name: 'Supima Heavyweight Minimalist Tee',
    category: 'T-Shirts',
    department: 'Men',
    price: 1499,
    originalPrice: 1799,
    discountPercent: 17,
    shortDescription: '260 GSM combed American Supima cotton t-shirt with seamless rib collar.',
    description: 'The quintessential luxury t-shirt. Woven from 100% extra-long staple Supima cotton at 260 GSM for a substantial, non-transparent drape that holds its shape wash after wash. Finished with blind stitching at hems.',
    details: {
      fabric: '100% American Grown Supima Cotton (260 GSM Heavyweight)',
      fit: 'Boxy relaxed fit with drop shoulders.',
      care: 'Machine wash cold with like colors. Tumble dry low.',
      origin: 'Knitted and stitched in Coimbatore, India.',
      modelHeight: "6'0\" (183 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#141414' },
      { name: 'Chalk White', hex: '#F7F6F2' },
      { name: 'Mineral Olive', hex: '#4A5043' },
      { name: 'Sand Dune', hex: '#D0C6B5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.9,
    reviewCount: 118,
    isBestSeller: true
  },
  {
    id: 'prod-m-03',
    name: 'Tailored Pleated Wool-Blend Trousers',
    category: 'Jeans',
    department: 'Men',
    price: 3999,
    originalPrice: 4999,
    discountPercent: 20,
    shortDescription: 'Modern tapered trouser with double forward pleats and extended tab waistband.',
    description: 'Constructed from a breathable tropical wool blend with natural stretch. Features side adjusters in place of belt loops for clean sartorial elegance, deep coin pockets, and half-lined legs for smooth stride.',
    details: {
      fabric: '60% Merino Wool, 38% Polyester, 2% Lycra',
      fit: 'Relaxed thigh with sharp gentle taper below knee.',
      care: 'Dry clean recommended.',
      origin: 'Master-tailored in Bengaluru, India.',
      modelHeight: "6'2\" (188 cm)",
      modelWearingSize: 'L'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal Melange', hex: '#36373A' },
      { name: 'Dark Navy', hex: '#1C2430' },
      { name: 'Rich Taupe', hex: '#8C8275' }
    ],
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 37,
    isBestSeller: true,
    isSpecialOffer: true
  },
  {
    id: 'prod-m-04',
    name: 'Structured Oversized Denim Chore Jacket',
    category: 'Jackets',
    department: 'Men',
    price: 4899,
    originalPrice: 5999,
    discountPercent: 18,
    shortDescription: 'Utilitarian worker jacket in 14oz raw selvedge cotton with antiqued brass buttons.',
    description: 'Inspired by early 20th century French workwear and modernized with minimalist proportions. Features 3 roomy patch pockets, internal chest pocket, unlined clean binding seams, and custom debossed atelier metal buttons.',
    details: {
      fabric: '100% Raw Selvedge Cotton Twill (14 oz)',
      fit: 'Oversized boxy workwear cut.',
      care: 'Machine wash cold; hang dry. Indigo may transfer initially.',
      origin: 'Crafted in Ahmedabad, India.',
      modelHeight: "6'1\" (185 cm)",
      modelWearingSize: 'L'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1A293D' },
      { name: 'Washed Charcoal', hex: '#2D2D2E' },
      { name: 'Desert Khaki', hex: '#A89984' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 29,
    isTrending: true
  },
  {
    id: 'prod-m-05',
    name: 'Classic Selvedge Straight-Leg Jeans',
    category: 'Jeans',
    department: 'Men',
    price: 3499,
    originalPrice: 4299,
    discountPercent: 19,
    shortDescription: 'Medium-weight red-line selvedge denim woven on shuttle looms with a timeless mid-rise.',
    description: 'Designed for daily durability and timeless style. The red-line selvedge ticker is visible on the cuff. Features copper rivets, button fly, and genuine vegetable-tanned leather back patch.',
    details: {
      fabric: '100% Cotton Selvedge Denim (12.5 oz)',
      fit: 'Straight fit with comfortable mid-rise.',
      care: 'Wash cold inside out. Air dry flat.',
      origin: 'Loomed in Gujarat, India.',
      modelHeight: "6'0\" (183 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Dark Indigo Rinse', hex: '#223046' },
      { name: 'Vintage Stone Wash', hex: '#586E84' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 20,
    rating: 4.7,
    reviewCount: 44,
    isBestSeller: true
  },
  {
    id: 'prod-m-06',
    name: 'Atelier Relaxed Twill Resort Shirt',
    category: 'Shirts',
    department: 'Men',
    price: 2499,
    originalPrice: 2999,
    discountPercent: 17,
    shortDescription: 'Camp collar short sleeve shirt in silk-soft modal twill with subtle chest pocket.',
    description: 'Effortless warm-weather tailoring. The open camp collar and silky flowing modal twill keep you exceptionally cool. Straight hem with side slits looks immaculate over tailored shorts or linen trousers.',
    details: {
      fabric: '100% Lenzing™ Modal Twill',
      fit: 'Relaxed camp-collar cut.',
      care: 'Machine wash cold on gentle cycle. Warm iron.',
      origin: 'Ethically crafted in Bengaluru, India.',
      modelHeight: "6'1\" (185 cm)",
      modelWearingSize: 'L'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream Sand', hex: '#EDE8DF' },
      { name: 'Olive Leaf', hex: '#4B533E' },
      { name: 'Midnight Navy', hex: '#1C2636' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.8,
    reviewCount: 23,
    isNew: true
  },
  {
    id: 'prod-m-07',
    name: 'Merino Wool Ribbed Knit Cardigan',
    category: 'Jackets',
    department: 'Men',
    price: 4299,
    originalPrice: 5499,
    discountPercent: 22,
    shortDescription: 'Chunky 7-gauge merino knit with shawl collar and genuine horn buttons.',
    description: 'Substantial tactile luxury. Spun from 100% extra-fine Australian Merino wool that provides cozy insulation without any scratchiness. Features saddle shoulders and deep ribbed welt pockets.',
    details: {
      fabric: '100% Extra-fine Merino Wool (7 gauge)',
      fit: 'Relaxed cardigan silhouette.',
      care: 'Hand wash cold using wool detergent. Dry flat.',
      origin: 'Knit in Ludhiana, India.',
      modelHeight: "6'2\" (188 cm)",
      modelWearingSize: 'L'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Heather', hex: '#313236' },
      { name: 'Oatmeal Tweed', hex: '#C7BDB1' },
      { name: 'Forest Pine', hex: '#2A3B30' }
    ],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 21,
    isSpecialOffer: true
  },

  // --- KIDS COLLECTION ---
  {
    id: 'prod-k-01',
    name: 'Organic Slub Cotton Henley Set',
    category: 'Kids',
    department: 'Kids',
    price: 1899,
    originalPrice: 2299,
    discountPercent: 17,
    shortDescription: 'Two-piece loungewear set in breathable organic cotton waffle knit.',
    description: 'Crafted with ultra-gentle certified organic cotton designed for active play and sensitive skin. Non-toxic dyes, tagless neck labels, and comfortable elasticized waist with functional cotton drawstring.',
    details: {
      fabric: '100% GOTS Certified Organic Cotton Slub Waffle',
      fit: 'Comfortable play-ready fit.',
      care: 'Machine wash warm with mild baby-safe detergent.',
      origin: 'Consciously made in Tirupur, India.',
      modelHeight: "3'6\" (106 cm)",
      modelWearingSize: 'M'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Oat', hex: '#DED7CD' },
      { name: 'Muted Sage', hex: '#A8B5A2' },
      { name: 'Dusty Rose', hex: '#C99E96' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewCount: 34,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-k-02',
    name: 'Kids Relaxed Linen Overalls',
    category: 'Kids',
    department: 'Kids',
    price: 2199,
    originalPrice: 2699,
    discountPercent: 19,
    shortDescription: 'Classic dungarees crafted from washed soft linen with adjustable button straps.',
    description: 'Charming, durable, and naturally breathable. Pre-washed for cloud-like softness from day one. Adjustable button closures on the shoulder straps ensure extended wear as your child grows.',
    details: {
      fabric: '100% Pure Washed Flax Linen',
      fit: 'Roomy unisex silhouette with adjustable straps.',
      care: 'Machine wash cold; tumble dry low or air dry.',
      origin: 'Hand-sewn in Bengaluru, India.',
      modelHeight: "3'9\" (114 cm)",
      modelWearingSize: 'L'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Desert Sand', hex: '#D6C7B2' },
      { name: 'Denim Chambray', hex: '#6D8299' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 19,
    isTrending: true
  },
  {
    id: 'prod-k-03',
    name: 'Mini Atelier Soft Knit Cardigan',
    category: 'Kids',
    department: 'Kids',
    price: 2499,
    originalPrice: 2999,
    discountPercent: 17,
    shortDescription: 'Soft cotton-wool blend knit jacket with wooden buttons.',
    description: 'A cozy everyday essential. Blended with organic cotton and ethically harvested fine wool that offers gentle warmth without itchy fibers. Finished with sustainable wooden buttons and roomy front pockets.',
    details: {
      fabric: '70% Organic Cotton, 30% Fine Merino Wool',
      fit: 'Relaxed easy-on layering fit.',
      care: 'Hand wash cool; lay flat to dry.',
      origin: 'Knit in Himachal Pradesh, India.',
      modelHeight: "3'4\" (102 cm)",
      modelWearingSize: 'S'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Milk White', hex: '#F7F6F0' },
      { name: 'Caramel Brown', hex: '#9E7448' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviewCount: 15,
    isSpecialOffer: true
  },

  // --- ACCESSORIES ---
  {
    id: 'prod-a-01',
    name: 'Hand-Rolled Silk Mulberry Twill Scarf',
    category: 'Accessories',
    department: 'Unisex',
    price: 1999,
    originalPrice: 2499,
    discountPercent: 20,
    shortDescription: '90x90cm printed silk twill square with artisan hand-rolled edges.',
    description: 'An artful finishing flourish. Hand-printed using azo-free eco pigments on rich 16-momme silk twill, completed by master artisans with traditional rolled and hand-stitched edges.',
    details: {
      fabric: '100% Pure Mulberry Silk Twill (16 Momme)',
      fit: '90 cm x 90 cm square.',
      care: 'Dry clean or gentle hand wash cold with silk detergent.',
      origin: 'Hand-rolled in Varanasi, India.',
      modelHeight: 'N/A',
      modelWearingSize: 'One Size'
    },
    sizes: ['S', 'M'],
    colors: [
      { name: 'Atelier Monochrome', hex: '#212121' },
      { name: 'Terracotta & Ochre', hex: '#9C5838' }
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 28,
    isBestSeller: true
  },
  {
    id: 'prod-a-02',
    name: 'Italian Calfskin Minimalist Belt',
    category: 'Accessories',
    department: 'Men',
    price: 1899,
    originalPrice: 2299,
    discountPercent: 17,
    shortDescription: '30mm full-grain vegetable-tanned leather belt with brushed palladium buckle.',
    description: 'Formed from single-strip vegetable-tanned Italian calf leather that develops a magnificent personalized patina over years of wear. Hand-beveled and burnished edges.',
    details: {
      fabric: '100% Full-Grain Vegetable-Tanned Tuscan Calf Leather',
      fit: '30 mm width with 5 adjustment holes.',
      care: 'Condition periodically with leather balm.',
      origin: 'Handmade in Kanpur, India with Italian hides.',
      modelHeight: 'N/A',
      modelWearingSize: 'M (34-36)'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Chestnut Brown', hex: '#5E3821' },
      { name: 'Obsidian Black', hex: '#1A1A1A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.8,
    reviewCount: 33,
    isNew: true
  },
  {
    id: 'prod-a-03',
    name: 'Atelier Structured Mini Tote in Sand',
    category: 'Accessories',
    department: 'Women',
    price: 3999,
    originalPrice: 4999,
    discountPercent: 20,
    shortDescription: 'Architectural canvas and leather daily tote with detachable shoulder strap.',
    description: 'Crisp Japanese cotton canvas reinforced with smooth tan leather trim. Includes a secure internal zip pouch, magnetic clasp closure, and protective brass feet on the base.',
    details: {
      fabric: 'Heavy Cotton Duck Canvas & Full-Grain Cowhide Trim',
      fit: '28 cm H x 24 cm W x 12 cm D.',
      care: 'Spot clean canvas with damp cloth. Protect leather from excess water.',
      origin: 'Handcrafted in Bengaluru, India.',
      modelHeight: "5'9\" (175 cm)",
      modelWearingSize: 'One Size'
    },
    sizes: ['M'],
    colors: [
      { name: 'Sand & Tan Leather', hex: '#CBB296' },
      { name: 'Black & Noir', hex: '#1C1C1E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 41,
    isTrending: true,
    isBestSeller: true
  },
  {
    id: 'prod-w-09',
    name: 'Hand-Pleated Tiered Maxi Dress',
    category: 'Dresses',
    department: 'Women',
    price: 4999,
    originalPrice: 5999,
    discountPercent: 17,
    shortDescription: 'Voluminous tiered maxi dress in airy cotton-silk blend with hand-gathered pleating.',
    description: 'A celebration of gentle volume and effortless summer ease. Gathered tiers fall from a modest square neckline, with slender self-tie straps at the shoulders for an adaptable fit.',
    details: {
      fabric: '70% Organic Cotton, 30% Chanderi Silk',
      fit: 'Fluid relaxed maxi length.',
      care: 'Hand wash cool with delicate detergent; hang dry.',
      origin: 'Hand-pleated in Chanderi, Madhya Pradesh.',
      modelHeight: "5'9\" (175 cm)",
      modelWearingSize: 'S'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sunlit Ochre', hex: '#D29B49' },
      { name: 'Chalk Bone', hex: '#EDE8DE' },
      { name: 'Midnight Charcoal', hex: '#212124' }
    ],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 10,
    rating: 4.8,
    reviewCount: 22,
    isTrending: true
  }
];

export const CATEGORIES: { label: string; value: string; count: number }[] = [
  { label: 'All Collection', value: 'All', count: PRODUCTS.length },
  { label: 'Men', value: 'Men', count: PRODUCTS.filter(p => p.department === 'Men' || p.category === 'Men').length },
  { label: 'Women', value: 'Women', count: PRODUCTS.filter(p => p.department === 'Women' || p.category === 'Women').length },
  { label: 'Kids', value: 'Kids', count: PRODUCTS.filter(p => p.department === 'Kids').length },
  { label: 'T-Shirts', value: 'T-Shirts', count: PRODUCTS.filter(p => p.category === 'T-Shirts').length },
  { label: 'Shirts', value: 'Shirts', count: PRODUCTS.filter(p => p.category === 'Shirts').length },
  { label: 'Jeans & Trousers', value: 'Jeans', count: PRODUCTS.filter(p => p.category === 'Jeans').length },
  { label: 'Dresses', value: 'Dresses', count: PRODUCTS.filter(p => p.category === 'Dresses').length },
  { label: 'Tops & Knits', value: 'Tops', count: PRODUCTS.filter(p => p.category === 'Tops').length },
  { label: 'Jackets & Outerwear', value: 'Jackets', count: PRODUCTS.filter(p => p.category === 'Jackets').length },
  { label: 'Accessories', value: 'Accessories', count: PRODUCTS.filter(p => p.category === 'Accessories').length }
];

export const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const AVAILABLE_COLORS = [
  { name: 'White & Cream', hex: '#FFFFFF', border: true },
  { name: 'Noir Black', hex: '#1C1C1E' },
  { name: 'Sand & Beige', hex: '#DED6C7' },
  { name: 'Navy & Indigo', hex: '#212B38' },
  { name: 'Olive & Sage', hex: '#4A5043' },
  { name: 'Terracotta', hex: '#A35D49' },
  { name: 'Camel Tan', hex: '#C29B72' },
  { name: 'Charcoal Grey', hex: '#36373A' }
];

export const COUPONS: Record<string, { percent?: number; amount?: number; label: string; minSpend: number }> = {
  'VELORA10': { percent: 10, label: '10% off your entire order', minSpend: 1500 },
  'FIRSTBUY': { amount: 500, label: '₹500 welcome discount', minSpend: 2500 },
  'ATELIER20': { percent: 20, label: '20% off orders above ₹5,000', minSpend: 5000 }
};
