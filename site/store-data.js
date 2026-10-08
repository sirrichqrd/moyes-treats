/* Moye's Treats — Store Data Layer (localStorage + catalog.json sync) */
const StoreData = (() => {
  const LS_KEY = 'moyes_catalog_v2';
  const DEFAULT_CATALOG = {
    contact: {
      phone: "08123456789",
      displayPhone: "0812 345 6789",
      instagram: "moyestreats",
      tiktok: "moyestreats",
      location: "Minna, Niger State"
    },
    deliveryFees: {
      "Tunga": 1000,
      "Bosco": 1000,
      "GRA": 1200,
      "Kpakungu": 1000,
      "F-Layout": 1200,
      "Dutsen Kura": 1500,
      "Bosso": 1500
    },
    smallChopsPrices: {
      "Samosa": 150,
      "Spring Roll": 150,
      "Puff Puff": 100,
      "Beef": 250,
      "Chicken": 350
    },
    combos: [
      { name: "Mini Box", price: 3000, bestValue: false, items: { "Samosa": 4, "Spring Roll": 4, "Puff Puff": 6 } },
      { name: "Party Box", price: 6500, bestValue: true, items: { "Samosa": 8, "Spring Roll": 8, "Puff Puff": 12, "Beef": 4 } },
      { name: "Luxe Box", price: 11500, bestValue: false, items: { "Samosa": 12, "Spring Roll": 12, "Puff Puff": 20, "Chicken": 6, "Beef": 6 } }
    ],
    promotions: {
      announcement: { enabled: true, text: "🎉 Free delivery on orders above ₦15,000 in Minna — Order now on WhatsApp! 🍰" },
      banner: { enabled: true, title: "Weekend Treat Drop!", subtitle: "Get 10% off all parfaits and cake loaves this weekend.", bg: "grape", code: "MOYE10", discountPercent: 10, image: "" }
    },
    ads: [
      { id: "ad1", active: true, title: "Valentine Parfait Special", text: "Limited strawberry & cream parfait — pre-order now!", image: "https://images.unsplash.com/photo-1488477181946-64290103bbd6?w=400", ctaLabel: "Order Now", action: "whatsapp", url: "" },
      { id: "ad2", active: true, title: "Build Your Small Chops Box", text: "Mix samosa, spring rolls, puff puff & more from ₦3,000", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400", ctaLabel: "Build Box", action: "smallchops", url: "" }
    ],
    testimonials: [
      { name: "Aisha M.", text: "The parfait was absolutely divine! Creamy, fresh, and perfectly layered. My go-to treat spot in Minna.", rating: 5, avatar: "A" },
      { name: "John O.", text: "Ordered the banana bread for my family and it disappeared in minutes. So moist and flavorful!", rating: 5, avatar: "J" },
      { name: "Fatima L.", text: "Best small chops in town! The spring rolls were crispy and the beef was perfectly spiced.", rating: 5, avatar: "F" },
      { name: "David K.", text: "Great service and fast delivery. The Greek yoghurt is thick and tangy exactly how I like it.", rating: 5, avatar: "D" }
    ],
    categories: [
      {
        id: "parfait",
        name: "Yoghurt Parfait",
        icon: "🍨",
        subtitle: "Layered goodness",
        desc: "Creamy Greek yoghurt layered with granola, fruits and honey — assembled fresh daily.",
        note: "Best consumed within 24 hours. Keep refrigerated.",
        images: ["https://images.unsplash.com/photo-1488477181946-64290103bbd6?w=600", "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600"],
        video: "",
        featured: true,
        featuredLabel: "Bestseller",
        sold: 250,
        items: [
          { name: "Small Cup (300ml)", price: 3500, salePrice: 0, available: true },
          { name: "Medium Cup (500ml)", price: 5000, salePrice: 4500, available: true },
          { name: "Large Bowl (750ml)", price: 7000, salePrice: 0, available: true }
        ]
      },
      {
        id: "banana-bread",
        name: "Banana Bread",
        icon: "🍌",
        subtitle: "Moist & fluffy",
        desc: "Rich, moist banana bread baked with ripe bananas, nuts and a hint of cinnamon.",
        note: "",
        images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600", "https://images.unsplash.com/photo-1586444248908-6d84134724a5?w=600"],
        video: "",
        featured: true,
        featuredLabel: "Trending",
        sold: 180,
        items: [
          { name: "Mini Loaf", price: 2500, salePrice: 0, available: true },
          { name: "Medium Loaf", price: 4000, salePrice: 3500, available: true },
          { name: "Large Loaf", price: 6000, salePrice: 0, available: true }
        ]
      },
      {
        id: "cake-loaf",
        name: "Cake Loaf",
        icon: "🍰",
        subtitle: "Buttery soft",
        desc: "Vanilla and chocolate swirl loaf, buttery and perfect for tea time.",
        note: "",
        images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"],
        video: "",
        featured: true,
        featuredLabel: "",
        sold: 120,
        items: [
          { name: "Small", price: 3000, salePrice: 0, available: true },
          { name: "Medium", price: 5000, salePrice: 0, available: true }
        ]
      },
      {
        id: "brownies",
        name: "Fudgy Brownies",
        icon: "🍫",
        subtitle: "Chocolate overload",
        desc: "Dense, fudgy chocolate brownies with crackly top.",
        note: "",
        images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"],
        video: "",
        featured: false,
        featuredLabel: "",
        sold: 90,
        items: [
          { name: "Box of 4", price: 4000, salePrice: 0, available: true },
          { name: "Box of 8", price: 7000, salePrice: 6000, available: true }
        ]
      },
      {
        id: "greek-yoghurt",
        name: "Greek Yoghurt",
        icon: "🥛",
        subtitle: "Thick & tangy",
        desc: "Thick, creamy Greek yoghurt — unsweetened, protein-rich.",
        note: "",
        images: ["https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600"],
        video: "",
        featured: false,
        featuredLabel: "",
        sold: 70,
        items: [
          { name: "500ml", price: 3000, salePrice: 0, available: true },
          { name: "1 Litre", price: 5500, salePrice: 0, available: true }
        ]
      }
    ]
  };

  let _cat = null;
  async function init() {
    try {
      const local = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      if (local) _cat = local;
    } catch(e) {}
    try {
      const res = await fetch('./catalog.json?ts=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const remote = await res.json();
        if (remote && remote.categories) {
          _cat = remote;
          try { localStorage.setItem(LS_KEY, JSON.stringify(remote)); } catch(e) {}
        }
      }
    } catch(e) {}
    if (!_cat) _cat = JSON.parse(JSON.stringify(DEFAULT_CATALOG));
    return _cat;
  }
  function get() { return _cat; }
  function save(cat) {
    _cat = cat;
    try { localStorage.setItem(LS_KEY, JSON.stringify(cat)); return true; } catch(e) { return false; }
  }
  function exportJSON() { return JSON.stringify(_cat, null, 2); }
  function exportData() { return exportJSON(); }
  function exportCatalog() { return exportJSON(); }
  function reset() { localStorage.removeItem(LS_KEY); _cat = JSON.parse(JSON.stringify(DEFAULT_CATALOG)); save(_cat); }
  function importData(text) {
    const obj = JSON.parse(text);
    if (!obj.categories) throw new Error('Invalid catalog');
    save(obj);
  }

  // Make legacy aliases available
  window.StoreData = { init, get, save, export: exportJSON, exportData, exportCatalog, reset, import: importData };
  return { init, get, save, export: exportJSON, exportData, exportCatalog, reset, import: importData };
})();
