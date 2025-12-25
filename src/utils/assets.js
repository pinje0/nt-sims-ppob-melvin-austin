// Mapping berdasarkan service_code dari API
const SERVICE_ICONS = {
  PBB: "/img/services/pbb.png",
  PLN: "/img/services/listrik.png",
  PDAM: "/img/services/pdam.png",
  PULSA: "/img/services/pulsa.png",
  PGN: "/img/services/pgn.png",
  MUSIK: "/img/services/musik.png",
  TV: "/img/services/tv.png",
  PAKET_DATA: "/img/services/paket-data.png",
  VOUCHER_GAME: "/img/services/voucher-game.png",
  VOUCHER_MAKANAN: "/img/services/voucher-makanan.png",
  QURBAN: "/img/services/qurban.png",
  ZAKAT: "/img/services/zakat.png",
};

// Mapping berdasarkan banner_name dari API
const BANNER_IMAGES = {
  "Banner 1": "/img/banners/banner-1.png",
  "Banner 2": "/img/banners/banner-2.png",
  "Banner 3": "/img/banners/banner-3.png",
  "Banner 4": "/img/banners/banner-4.png",
  "Banner 5": "/img/banners/banner-5.png",
  // Fallback
  "Banner 6": "/img/banners/banner-1.png",
};

export const getServiceIcon = (code) => SERVICE_ICONS[code] || "/img/services/pbb.png";
export const getBannerImage = (name) => BANNER_IMAGES[name] || "/img/banners/banner-1.png";
