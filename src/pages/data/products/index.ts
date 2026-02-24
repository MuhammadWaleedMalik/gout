// data/products/index.ts
import { Finding } from '../../../types/findings';

// Image arrays for each category
const pearlImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_37-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_36-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172140_49-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_20-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_7-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172140_52-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_14-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_12-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/1000173711-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_24-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251128_172139_33-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251126_104445_5-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251126_104445_2-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251126_104445_8-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_38-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-21-at-13.04.43_603fa083-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-24-at-15.18.47_76b9a3a5-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2024/07/bpbs01-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-24-at-15.18.46_bdd3e9af-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2022/01/20220118_080049-300x254.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2022/01/20220118_080142-300x287.jpg"
];

const rockImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260206_090718-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/Kingsley-42-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260130_105221-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_105836-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_104956-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_110332-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_105818-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_105853-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_105625-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_105012-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/IMG_20260129_145646-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/IMG_20260129_150122-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260129_150216-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/IMG_20260129_145948-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/IMG_20260129_145735-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195846_28-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195846_33-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195845_8-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-26-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195846_27-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251029_202311_44-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-24-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-25-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-20-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-18-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195846_18-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195845_12-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20251030_195846_42-300x225.jpg"
];

const birthstoneImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/IMG_20260129_145646-Photoroom-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-09-at-16.24.39_b3393471-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2017/11/product_i_m_img_0567_7-300x319.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_171728_6-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251113_223843_13-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_19-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251122_125450_2-300x225.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_16-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_25-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_27-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_31-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120330_6-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_20-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120330_11-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251116_120331_14-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251118_155353_4-300x217.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251118_155353_1-300x219.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251118_155353_2-300x196.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251118_155353_3-300x182.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251118_104337_2-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251118_104337_1-300x225.jpg"
];

const findingsImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2024/10/sscl1-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2024/02/IMG-20240207-WA0041-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2024/02/IMG-20240207-WA0026-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/4mm-wide-gold-blade-chain.png",
  "https://bronnrocks.co.za/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-09-at-08.46.02_979d6623-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250830_085603_26-300x225.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/gold-blade-chain.png",
  "https://bronnrocks.co.za/wp-content/uploads/2015/05/Kingsley-38-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250925_104223_3-300x225.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-11.18.07_a6b6364a-300x400.jpg"
];

const jewelleryImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2024/10/sscl1-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2024/02/IMG-20240207-WA0041-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2024/02/IMG-20240207-WA0026-300x300.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/4mm-wide-gold-blade-chain.png",
  "https://bronnrocks.co.za/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-09-at-08.46.02_979d6623-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250830_085603_26-300x225.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/gold-blade-chain.png",
  "https://bronnrocks.co.za/wp-content/uploads/2015/05/Kingsley-38-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250925_104223_3-300x225.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-11.18.07_a6b6364a-300x400.jpg"
];

const beadStringsImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/4mm-wide-gold-blade-chain.png",
  "https://bronnrocks.co.za/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-09-at-08.46.02_979d6623-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250830_085603_26-300x225.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/gold-blade-chain.png",
  "https://bronnrocks.co.za/wp-content/uploads/2015/05/Kingsley-38-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250925_104223_3-300x225.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-11.18.07_a6b6364a-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-02-at-10.21.15_1773a110-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-37-300x300.png"
];

const beadsImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-11.18.07_a6b6364a-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-02-at-10.21.15_1773a110-300x400.jpg",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-37-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/IMG_20260125_100622-Photoroom-Photoroom-600x600-1-300x300.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250725_131639_7-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Kingsley-36-300x300.png",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250706_143605_24-300x400.webp"
];

const otherImages = [
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250706_143605_24-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250724_200617_28-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250701_151736_18-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250701_152042_20-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250812_150855_18-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250811_190729_11-600x800-1-300x400.webp",
  "https://bronnrocks.co.za/wp-content/uploads/2026/01/Photoroom-20250707_091802_6-600x800-1-300x400.webp"
];

// Helper function to create products with proper IDs
const createProductsForCategory = (
  category: string, 
  startId: number, 
  count: number, 
  imageArray: string[]
): Finding[] => {
  const categoryTitles: Record<string, string[]> = {
    findings: ["Stone", "Pebble", "Crystal", "Rock", "Mineral", "Gem", "Fragment", "Specimen", "Finding", "Component"],
    jewellery: ["Necklace", "Bracelet", "Earrings", "Ring", "Pendant", "Brooch", "Anklet", "Tiara", "Bangle", "Choker"],
    beadStrings: ["Bead Strand", "Bead String", "Bead Chain", "Bead Rope", "Bead Garland", "Bead Collection", "Bead Set", "Bead Strands"],
    pearlStrings: ["Pearl Strand", "Pearl Necklace", "Pearl Rope", "Pearl Chain", "Pearl Garland", "Pearl Collection", "Pearl Set"],
    beads: ["Seed Beads", "Faceted Beads", "Pony Beads", "Bugle Beads", "Crystal Beads", "Wood Beads", "Glass Beads", "Gemstone Beads"],
    rocks: ["Crystal", "Geode", "Mineral", "Specimen", "Slab", "Cluster", "Carving", "Stone", "Rock", "Quartz"],
    other: ["Tool", "Supply", "Material", "Accessory", "Component", "Equipment", "Kit", "Set", "Package", "Bundle"],
    birthstones: ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise", "Citrine", "Zircon"]
  };

  const adjectives = ["Beautiful", "Natural", "Polished", "Raw", "Rare", "Unique", "Vintage", "Modern", "Elegant", "Rustic", "Classic", "Premium", "Luxury", "Handmade"];
  
  const products: Finding[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const adj = adjectives[i % adjectives.length];
    const titleWord = categoryTitles[category]?.[i % categoryTitles[category].length] || category;
    const imageIndex = i % imageArray.length;
    const basePrice = category === 'jewellery' ? 49.99 + (i * 5) : 
                     category === 'pearlStrings' ? 39.99 + (i * 4) :
                     category === 'birthstones' ? 59.99 + (i * 6) : 
                     19.99 + (i * 2.5);
    
    products.push({
      id,
      title: `${adj} ${titleWord} #${id}`,
      description: `A ${adj.toLowerCase()} ${titleWord.toLowerCase()} from our ${category} collection. Perfect for jewelry making and creative projects. Each piece is carefully selected for quality and beauty.`,
      price: `$${basePrice.toFixed(2)}`,
      image: imageArray[imageIndex],
      category
    });
  }
  
  return products;
};

// Generate all products (400 products total - 50 for each of 8 categories)
const generatedProducts: Finding[] = [
  ...createProductsForCategory('findings', 1, 50, findingsImages),
  ...createProductsForCategory('jewellery', 51, 50, jewelleryImages),
  ...createProductsForCategory('beadStrings', 101, 50, beadStringsImages),
  ...createProductsForCategory('pearlStrings', 151, 50, pearlImages),
  ...createProductsForCategory('beads', 201, 50, beadsImages),
  ...createProductsForCategory('rocks', 251, 50, rockImages),
  ...createProductsForCategory('other', 301, 50, otherImages),
  ...createProductsForCategory('birthstones', 351, 50, birthstoneImages),
];

// Export the complete products array
export const allProducts: Finding[] = generatedProducts;

// Helper to get products by category
export const getProductsByCategory = (category: string): Finding[] => {
  return allProducts.filter(product => product.category === category);
};

// Helper to get product by ID
export const getProductById = (id: number): Finding | undefined => {
  return allProducts.find(product => product.id === id);
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  const categories = allProducts.map(product => product.category);
  return Array.from(new Set(categories));
};

// Get first few products from each category for display
export const getFeaturedProducts = (countPerCategory: number = 3): Finding[] => {
  const categories = getAllCategories();
  const featured: Finding[] = [];
  
  categories.forEach(category => {
    const categoryProducts = getProductsByCategory(category);
    featured.push(...categoryProducts.slice(0, countPerCategory));
  });
  
  return featured;
};