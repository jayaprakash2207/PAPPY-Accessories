import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp, FaInstagram, FaFacebook, FaYoutube,
  FaStar, FaPlay, FaMapMarkerAlt, FaClock, FaPhone,
  FaArrowRight, FaCamera, FaBolt, FaHeart,
  FaChevronRight, FaShoppingBag, FaTimes, FaMinus, FaPlus,
  FaBars, FaSearch, FaFilter, FaStore, FaHome,
} from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

const WA_NUMBER = '919876543210';

/* ─── PRODUCT CATALOG ────────────────────────────────────────── */
const PRODUCTS = [
  // BRIDAL SETS
  { id: 'p01', title: 'Royal Kundan Bridal Set',         category: 'Bridal Sets',  price: 12999, mrp: 18999, image: '/images/pappy-jewel-3.jpg',  badge: 'BESTSELLER', rating: 4.9, reviews: 186, isNew: false, desc: 'Exquisite kundan bridal set with matching earrings and maang tikka. Handcrafted with premium kundan stones set in gold-polished brass. Complete bridal look in one set.',     material: 'Gold Plated Kundan',  occasion: 'Wedding' },
  { id: 'p02', title: 'CZ Diamond Bridal Choker',        category: 'Bridal Sets',  price:  9499, mrp: 13999, image: '/images/shop-bridal-a.jpg',   badge: 'HOT',        rating: 4.8, reviews: 143, isNew: false, desc: 'Stunning CZ diamond-studded bridal choker set with matching jhumka earrings. A regal combination for your wedding day that catches every eye in the room.',              material: 'CZ Stone Gold Plated', occasion: 'Wedding' },
  { id: 'p03', title: 'Antique Temple Necklace Set',     category: 'Bridal Sets',  price:  7999, mrp: 11499, image: '/images/pappy-jewel-4.jpg',  badge: 'NEW',        rating: 4.7, reviews:  98, isNew: true,  desc: 'Traditional antique temple necklace set inspired by South Indian craftsmanship. Features intricate deity motifs and rich gold finish for a timeless bridal look.',       material: 'Antique Gold Plated', occasion: 'Wedding' },
  { id: 'p04', title: 'Lakshmi Gold Bridal Set',         category: 'Bridal Sets',  price: 15999, mrp: 22999, image: '/images/pappy-jewel-1.jpg',  badge: null,         rating: 5.0, reviews: 214, isNew: false, desc: 'Magnificent Lakshmi-inspired bridal set with heavy gold plating and intricate stonework. The ultimate heirloom-grade set for a truly royal wedding.',                     material: 'Heavy Gold Plated',   occasion: 'Wedding' },
  // NECKLACES
  { id: 'p05', title: 'Gold Layered Chain Necklace',     category: 'Necklaces',    price:  3299, mrp:  4999, image: '/images/shop-neck-a.jpg',    badge: 'TRENDING',   rating: 4.6, reviews:  89, isNew: false, desc: 'Elegant layered gold chain necklace with delicate links. Perfect for pairing with sarees, salwar suits, or western outfits. Versatile styling piece.',               material: 'Gold Plated Brass',   occasion: 'Festive' },
  { id: 'p06', title: 'Pearl Pendant Gold Necklace',     category: 'Necklaces',    price:  2499, mrp:  3499, image: '/images/necklace-2.jpg',     badge: 'NEW',        rating: 4.5, reviews:  67, isNew: true,  desc: 'Graceful pearl pendant necklace with gold-plated chain. The lustrous pearl centerpiece adds an elegant touch to any traditional or fusion ensemble.',                  material: 'Pearl & Gold Plated', occasion: 'Festive' },
  { id: 'p07', title: 'Kundan Choker Necklace',          category: 'Necklaces',    price:  4799, mrp:  6999, image: '/images/shop-jewel-a.jpg',   badge: null,         rating: 4.7, reviews: 112, isNew: false, desc: 'Opulent kundan choker necklace with vibrant stone setting and rich gold border. Perfect for festive occasions, sangeet, and mehndi ceremonies.',                      material: 'Kundan Stone',        occasion: 'Festive' },
  { id: 'p08', title: 'Long Antique Gold Chain',         category: 'Necklaces',    price:  5499, mrp:  7999, image: '/images/necklace-1.jpg',     badge: 'SALE',       rating: 4.8, reviews:  76, isNew: false, desc: 'Majestic long antique gold chain with intricate handcrafted links. Drapes beautifully over traditional attire and adds a regal dimension to any festive look.',        material: 'Antique Gold Plated', occasion: 'Festive' },
  // EARRINGS
  { id: 'p09', title: 'Traditional Jhumka Earrings',     category: 'Earrings',     price:  1999, mrp:  2999, image: '/images/earrings-1.jpg',     badge: 'BESTSELLER', rating: 4.9, reviews: 234, isNew: false, desc: 'Classic South Indian jhumka earrings with intricate filigree work and delicate hanging bells. These timeless earrings complement every traditional outfit beautifully.',  material: 'Gold Plated Brass',   occasion: 'Daily & Festive' },
  { id: 'p10', title: 'Crystal Drop Earrings',           category: 'Earrings',     price:  1499, mrp:  2199, image: '/images/earrings-2.jpg',     badge: 'HOT',        rating: 4.7, reviews: 156, isNew: false, desc: 'Sparkling crystal drop earrings that catch the light beautifully. Perfect for evening events, receptions, and festive gatherings. Lightweight and comfortable.',           material: 'Crystal & Silver Plated', occasion: 'Party & Reception' },
  { id: 'p11', title: 'CZ Stone Stud Earrings',          category: 'Earrings',     price:  1299, mrp:  1799, image: '/images/shop-ear-a.jpg',     badge: 'NEW',        rating: 4.6, reviews:  89, isNew: true,  desc: 'Elegant CZ stone stud earrings in a classic four-prong setting. Simple yet stunning pieces that elevate any look from casual to formal with effortless grace.',           material: 'CZ Stone Gold Plated', occasion: 'Daily & Party' },
  { id: 'p12', title: 'Gold Hook Drop Earrings',         category: 'Earrings',     price:   899, mrp:  1299, image: '/images/shop-ear-b.jpg',     badge: null,         rating: 4.5, reviews:  67, isNew: false, desc: 'Sleek gold hook drop earrings with a polished finish. These versatile earrings work perfectly for both everyday wear and special occasions. Easy hook closure.',          material: 'Gold Plated',         occasion: 'Daily Wear' },
  // BANGLES
  { id: 'p13', title: 'Gold Bangles Set of 4',           category: 'Bangles',      price:  3499, mrp:  4999, image: '/images/bangles-1.jpg',     badge: null,         rating: 4.8, reviews: 178, isNew: false, desc: 'Premium set of 4 gold bangles with a radiant finish. Stack them together or wear individually. Each bangle features a subtle textured pattern for added elegance.',        material: 'Gold Plated Brass',   occasion: 'Festive & Wedding' },
  { id: 'p14', title: 'Antique Kada Bangle',             category: 'Bangles',      price:  2799, mrp:  3999, image: '/images/bangles-2.jpg',     badge: 'TRENDING',   rating: 4.7, reviews: 134, isNew: false, desc: 'Bold antique finish kada bangle with engraved traditional motifs. This statement piece commands attention and pairs beautifully with ethnic wear for festive occasions.',  material: 'Antique Gold Plated', occasion: 'Festive' },
  { id: 'p15', title: 'Stone-Studded Bangles Set',       category: 'Bangles',      price:  1999, mrp:  2999, image: '/images/shop-jewel-d.jpg',  badge: 'SALE',       rating: 4.5, reviews:  92, isNew: false, desc: 'Vibrant stone-studded bangles set with a mix of colorful gemstones and gold setting. Perfect for adding a pop of color to festive outfits. Sold as a set of 2.',         material: 'Stone & Gold Plated', occasion: 'Festive' },
  // BEAUTY
  { id: 'p16', title: 'Luxury Bridal Makeup Kit',        category: 'Beauty',       price:  3999, mrp:  5499, image: '/images/shop-beauty-a.jpg', badge: 'NEW',        rating: 4.8, reviews: 167, isNew: true,  desc: 'Comprehensive luxury bridal makeup kit with premium quality products. Includes foundation, contouring palette, eyeshadow, lipstick, and setting spray. Long-lasting formula.',  material: 'Premium Cosmetics',  occasion: 'Bridal' },
  { id: 'p17', title: 'Lip & Glow Essential Set',        category: 'Beauty',       price:  1499, mrp:  1999, image: '/images/shop-beauty-b.jpg', badge: 'HOT',        rating: 4.6, reviews: 145, isNew: false, desc: 'Must-have lip and glow set featuring richly pigmented lip colors and a stunning highlighter. Achieve a radiant, dewy finish with just a few swipes.',                         material: 'Premium Cosmetics',  occasion: 'Daily & Party' },
  { id: 'p18', title: 'Radiance Skincare Bundle',        category: 'Beauty',       price:  2199, mrp:  2999, image: '/images/shop-beauty-c.jpg', badge: null,         rating: 4.7, reviews:  98, isNew: false, desc: 'Complete radiance skincare bundle with gentle cleanser, vitamin C serum, and hydrating moisturizer. Designed for the modern Indian woman who wants glowing, healthy skin.',  material: 'Natural Ingredients', occasion: 'Daily Care' },
  // DAILY WEAR
  { id: 'p19', title: 'Minimalist Gold Necklace',        category: 'Daily Wear',   price:  1799, mrp:  2499, image: '/images/shop-fashion-a.jpg',badge: 'NEW',        rating: 4.5, reviews:  78, isNew: true,  desc: 'Sleek minimalist gold necklace with a delicate chain and small pendant. Perfect for everyday wear and goes beautifully with both western and traditional outfits.',          material: 'Gold Plated',        occasion: 'Daily Wear' },
  { id: 'p20', title: 'Daily Glam Jewelry Set',          category: 'Daily Wear',   price:  1499, mrp:  1999, image: '/images/shop-fashion-b.jpg',badge: 'TRENDING',   rating: 4.7, reviews: 112, isNew: false, desc: 'Chic daily wear jewelry set with a delicate necklace and matching earrings. Light, comfortable, and stylish — designed for the woman who loves looking effortlessly put-together.', material: 'Gold Plated',       occasion: 'Daily Wear' },
];

const CATEGORIES = ['All', 'Bridal Sets', 'Necklaces', 'Earrings', 'Bangles', 'Beauty', 'Daily Wear'];

const floatingParticles = [
  { top: '10%', left: '6%',  size: 8,  delay: 0   },
  { top: '17%', left: '84%', size: 10, delay: 0.8 },
  { top: '44%', left: '9%',  size: 6,  delay: 1.4 },
  { top: '60%', left: '90%', size: 12, delay: 0.5 },
  { top: '76%', left: '20%', size: 7,  delay: 1.1 },
  { top: '30%', left: '56%', size: 9,  delay: 1.7 },
];

const HERO_IMG = '/images/hero-bridal.jpg';

const homeCollections = [
  { title: 'Bridal Sets',  desc: 'Heirloom-grade wedding sets',       image: '/images/pappy-jewel-4.jpg',  cat: 'Bridal Sets'  },
  { title: 'Necklaces',    desc: 'Layered luxury with gold detail',    image: '/images/necklace-2.jpg',     cat: 'Necklaces'    },
  { title: 'Earrings',     desc: 'Refined silhouettes for every look', image: '/images/earrings-1.jpg',     cat: 'Earrings'     },
  { title: 'Bangles',      desc: 'Radiant stacks that shine',          image: '/images/bangles-1.jpg',      cat: 'Bangles'      },
  { title: 'Beauty',       desc: 'Luxury cosmetics & skincare',        image: '/images/shop-beauty-a.jpg',  cat: 'Beauty'       },
  { title: 'Daily Wear',   desc: 'Elegant everyday classics',          image: '/images/shop-fashion-b.jpg', cat: 'Daily Wear'   },
];

const bridalShowcase = ['/images/bridal-3.jpg', '/images/jewelry-1.jpg', '/images/pappy-jewel-2.jpg', '/images/fashion-2.jpg'];

const festivalCollections = [
  { title: 'Diwali Glow',    badge: '✦ Festival',  image: '/images/bridal-2.jpg',     desc: 'Gold & kundan for festive nights.'          },
  { title: 'Wedding Season', badge: '✦ Bridal',    image: '/images/pappy-jewel-4.jpg',desc: 'Complete bridal sets with heirloom feel.'   },
  { title: 'Pongal Classics',badge: '✦ Tradition', image: '/images/bangles-1.jpg',    desc: 'Temple-inspired stacks and sets.'           },
  { title: 'New Year Glam',  badge: '✦ Party',     image: '/images/necklace-2.jpg',   desc: 'Statement pieces for celebration looks.'    },
];

const galleryItems = [
  '/images/pappy-store-wide.jpg', '/images/pappy-store-display.jpg',
  '/images/pappy-store-front.jpg', '/images/pappy-store-sign.jpg',
  '/images/pappy-jewel-1.jpg',    '/images/earrings-1.jpg',
];

const instagramFeed = [
  { tag: '@pappyaccessories', title: 'Bridal collection drop', image: '/images/pappy-jewel-3.jpg' },
  { tag: '@pappyaccessories', title: 'Gold details up close',  image: '/images/jewelry-1.jpg'     },
  { tag: '@pappyaccessories', title: 'Beauty edit drops',      image: '/images/shop-beauty-b.jpg' },
];

const testimonials = [
  { name: 'Aishwarya R.', role: 'Bridal Customer',  stars: 5, quote: 'The bridal collection felt handpicked for a luxury wedding wardrobe. Every piece was exquisite and perfectly crafted.'           },
  { name: 'Nandhini S.',  role: 'Regular Shopper',  stars: 5, quote: 'Premium finish, beautiful packaging, and a boutique experience throughout. PAPPY is my go-to for all special occasions.'      },
  { name: 'Priya M.',     role: 'Festival Shopper', stars: 5, quote: 'The bangles and earrings made my festive look feel effortlessly elevated. Quality genuinely unmatched at this price.'          },
];

/* ─── ANIMATION HELPERS ──────────────────────────────────────── */
const stagger = (delay = 0.07) => ({
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * delay, duration: 0.65, ease: 'easeOut' } }),
});

/* ─── HELPER COMPONENTS ──────────────────────────────────────── */
function Stars({ count = 5, size = '0.75rem' }) {
  return (
    <span style={{ display: 'inline-flex', gap: '0.1rem', color: 'var(--gold)', fontSize: size }}>
      {[1,2,3,4,5].map(i => <FaStar key={i} style={{ opacity: i <= count ? 1 : 0.22 }} />)}
    </span>
  );
}

function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className="section-title" style={{ textAlign: align }}>
      <span className="section-label"><span className="section-label-line" />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────── */
function ProductCard({ product, addToCart, toggleWishlist, wishlisted, openModal }) {
  const discount = product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  return (
    <article className="pc" onClick={() => openModal(product)}>
      <div className="pc-img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.badge && (
          <span className={`pc-badge pc-badge-${product.badge.toLowerCase().replace(' ', '-')}`}>{product.badge}</span>
        )}
        {discount > 0 && <span className="pc-discount">{discount}% OFF</span>}
        <button
          className={`pc-wish${wishlisted ? ' pc-wish-active' : ''}`}
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label="Wishlist"
        >
          <FaHeart />
        </button>
        <div className="pc-hover-actions">
          <button
            className="btn-sm btn-gold"
            onClick={e => { e.stopPropagation(); addToCart(product); }}
          >
            <FaShoppingBag /> Add to Cart
          </button>
          <button
            className="btn-sm btn-outline"
            onClick={e => { e.stopPropagation(); openModal(product); }}
          >
            View
          </button>
        </div>
      </div>
      <div className="pc-info">
        <span className="pc-cat">{product.category}</span>
        <h3 className="pc-title">{product.title}</h3>
        <div className="pc-rating">
          <Stars count={Math.round(product.rating)} />
          <span className="pc-review-count">({product.reviews})</span>
        </div>
        <div className="pc-price-row">
          <span className="pc-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.mrp > product.price && (
            <span className="pc-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── CART SIDEBAR ───────────────────────────────────────────── */
function CartSidebar({ cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount }) {
  const checkoutWhatsApp = () => {
    if (!cart.length) return;
    const lines = cart.map(i => `• ${i.title} x${i.qty} — ₹${(i.price * i.qty).toLocaleString('en-IN')}`).join('\n');
    const msg = encodeURIComponent(
      `Hello PAPPY Accessories! 🛍️\n\nI'd like to place an order:\n\n${lines}\n\n*Total: ₹${cartTotal.toLocaleString('en-IN')}*\n\nKindly confirm availability and share payment details. Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };
  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="cart-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.div className="cart-sidebar" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
            <div className="cart-header">
              <div>
                <strong>Your Cart</strong>
                {cartCount > 0 && <span className="cart-header-count">{cartCount} item{cartCount > 1 ? 's' : ''}</span>}
              </div>
              <button className="cart-close-btn" onClick={() => setCartOpen(false)}><FaTimes /></button>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <FaShoppingBag />
                <strong>Your cart is empty</strong>
                <span>Browse our collections and add items to get started.</span>
                <button className="button button-secondary" style={{ marginTop: '1.2rem', width: '100%' }} onClick={() => setCartOpen(false)}>Continue Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-info">
                        <strong>{item.title}</strong>
                        <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                        <div className="cart-qty-row">
                          <div className="cart-qty-stepper">
                            <button onClick={() => updateQty(item.id, -1)}><FaMinus /></button>
                            <span>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)}><FaPlus /></button>
                          </div>
                          <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}><FaTimes /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total-row">
                    <span>Order Total</span>
                    <strong className="gold-text">₹{cartTotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <button className="button button-primary cart-checkout-btn" onClick={checkoutWhatsApp}>
                    <FaWhatsapp /> Checkout on WhatsApp
                  </button>
                  <p className="cart-footer-note">You'll be taken to WhatsApp with your full order summary pre-filled.</p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── PRODUCT MODAL ──────────────────────────────────────────── */
function ProductModal({ product, onClose, onAddToCart, wishlisted, toggleWishlist }) {
  const [qty, setQty] = useState(1);
  const discount = product && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;

  const buyNow = () => {
    const msg = encodeURIComponent(
      `Hi PAPPY Accessories! 👋\n\nI'm interested in:\n*${product.title}*\nQty: ${qty}\nPrice: ₹${(product.price * qty).toLocaleString('en-IN')}\n\nCould you confirm availability and payment details? Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="product-modal"
            initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.93 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            style={{ x: '-50%', y: '-50%' }}
          >
            <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
            <div className="modal-grid">
              <div className="modal-img-side">
                <img src={product.image} alt={product.title} />
                {discount > 0 && <span className="modal-discount-badge">{discount}% OFF</span>}
              </div>
              <div className="modal-info-side">
                <span className="pc-cat">{product.category}</span>
                {product.badge && <span className={`pc-badge pc-badge-${product.badge.toLowerCase().replace(' ', '-')}`} style={{ marginLeft: '0.5rem' }}>{product.badge}</span>}
                <h2 className="modal-title">{product.title}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <Stars count={Math.round(product.rating)} size="0.85rem" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="modal-price-row">
                  <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.mrp > product.price && <span className="modal-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>}
                  {discount > 0 && <span className="modal-save">Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}</span>}
                </div>
                <p className="modal-desc">{product.desc}</p>
                <div className="modal-meta">
                  <span><strong>Material:</strong> {product.material}</span>
                  <span><strong>Occasion:</strong> {product.occasion}</span>
                </div>
                <div className="modal-qty-row">
                  <span>Quantity</span>
                  <div className="modal-qty-stepper">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}><FaMinus /></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)}><FaPlus /></button>
                  </div>
                  <button
                    className={`modal-wish-btn${wishlisted ? ' active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <FaHeart /> {wishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                </div>
                <div className="modal-actions">
                  <button className="button button-primary" onClick={() => { onAddToCart({ ...product, qty }); onClose(); }}>
                    <FaShoppingBag /> Add to Cart — ₹{(product.price * qty).toLocaleString('en-IN')}
                  </button>
                  <button className="button button-secondary" onClick={buyNow}>
                    <FaWhatsapp /> Buy Now on WhatsApp
                  </button>
                </div>
                <div className="modal-trust">
                  <span>✦ Free delivery above ₹1,999</span>
                  <span>✦ Secure WhatsApp ordering</span>
                  <span>✦ Easy returns within 7 days</span>
                  <span>✦ 100% authentic products</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── SHOP VIEW ──────────────────────────────────────────────── */
function ShopView({ products, addToCart, toggleWishlist, wishlist, openModal }) {
  const [category, setCategory] = useState('All');
  const [sort, setSort]         = useState('popular');
  const [search, setSearch]     = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating')     return b.rating - a.rating;
      if (sort === 'new')        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviews - a.reviews;
    });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="shop-view">
      <div className="shop-hero-bar">
        <div>
          <h1 className="shop-hero-title">Our Collection</h1>
          <p className="shop-hero-sub">Handpicked luxury pieces for every occasion — bridal, festive & everyday.</p>
        </div>
        <div className="shop-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search jewellery, beauty..."
            value={search}
            onChange={e => { setSearch(e.target.value); setVisibleCount(12); }}
          />
          {search && <button onClick={() => setSearch('')}><FaTimes /></button>}
        </div>
      </div>

      <div className="shop-cats">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`shop-cat-btn${category === cat ? ' active' : ''}`}
            onClick={() => { setCategory(cat); setVisibleCount(12); }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop-bar">
        <span>{filtered.length} product{filtered.length !== 1 ? 's' : ''}{category !== 'All' ? ` in ${category}` : ''}</span>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="popular">Most Popular</option>
          <option value="new">Newest First</option>
          <option value="rating">Top Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {visible.length > 0 ? (
        <div className="shop-grid">
          {visible.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.45 }}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlisted={wishlist.has(product.id)}
                openModal={openModal}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <FaSearch />
          <strong>No products found</strong>
          <span>Try a different search term or category.</span>
          <button className="button button-secondary" style={{ marginTop: '1rem' }} onClick={() => { setSearch(''); setCategory('All'); }}>
            Clear Filters
          </button>
        </div>
      )}

      {visibleCount < filtered.length && (
        <motion.button
          className="load-more-btn"
          onClick={() => setVisibleCount(v => v + 8)}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        >
          Load More ({filtered.length - visibleCount} remaining)
        </motion.button>
      )}
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [view, setView]         = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY > 60) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToShop = (category) => {
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Cart */
  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + (product.qty || 1) } : i);
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty      = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  const cartTotal      = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount      = cart.reduce((sum, i) => sum + i.qty, 0);

  /* Wishlist */
  const toggleWishlist = (id) => setWishlist(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const navLinks = [
    { label: 'Home',      action: goHome },
    { label: 'Shop',      action: goToShop },
    { label: 'Showcase',  href: '#showcase' },
    { label: 'Reviews',   href: '#reviews' },
    { label: 'Location',  href: '#location' },
  ];

  return (
    <div className="page-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />

      <div className="particle-field" aria-hidden="true">
        {floatingParticles.map((p, i) => (
          <motion.span className="particle" key={i} style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            animate={{ y: [0, -16, 0], opacity: [0.3, 0.85, 0.3] }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      {/* ── NAVBAR ── */}
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <button className="brand" onClick={goHome} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="brand-mark">P</div>
          <div>
            <strong>PAPPY Accessories</strong>
            <span>Luxury Bridal &amp; Fashion Boutique</span>
          </div>
        </button>
        <nav>
          {navLinks.map(l =>
            l.action ? (
              <button key={l.label} className={`nav-text-btn${view === l.label.toLowerCase() ? ' nav-active' : ''}`} onClick={l.action}>{l.label}</button>
            ) : (
              <a key={l.label} href={l.href} onClick={() => view !== 'home' && goHome()}>{l.label}</a>
            )
          )}
        </nav>
        <div className="navbar-right">
          <button className="nav-cart-btn" onClick={() => { setWishlist(prev => prev); }} aria-label="Wishlist" style={{ position: 'relative' }}>
            <FaHeart style={{ color: wishlist.size > 0 ? '#e11d48' : undefined }} />
            {wishlist.size > 0 && <span className="nav-cart-badge" style={{ background: '#e11d48' }}>{wishlist.size}</span>}
          </button>
          <button className="nav-cart-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
            <FaShoppingBag />
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>
          <button className="nav-cta" onClick={goToShop} style={{ cursor: 'pointer', border: 'none' }}>
            <FaStore /> Shop Now
          </button>
          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Menu">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <button className="mobile-nav-item" onClick={() => { goHome(); setMobileMenuOpen(false); }}><FaHome /> Home</button>
            <button className="mobile-nav-item" onClick={() => { goToShop(); setMobileMenuOpen(false); }}><FaStore /> Shop All Products</button>
            {['#showcase', '#reviews', '#location'].map((href, i) => (
              <a key={href} href={href} className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>{['Showcase', 'Reviews', 'Location'][i]}</a>
            ))}
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="mobile-nav-item mobile-nav-wa" onClick={() => setMobileMenuOpen(false)}>
              <FaWhatsapp /> Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIEWS ── */}
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <HomeView
              products={PRODUCTS}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              openModal={setSelectedProduct}
              goToShop={goToShop}
              cartCount={cartCount}
              setCartOpen={setCartOpen}
            />
          </motion.div>
        ) : (
          <motion.div key="shop" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <main style={{ position: 'relative', zIndex: 1, width: 'min(1220px, calc(100% - 2rem))', margin: '0 auto' }}>
              <ShopView
                products={PRODUCTS}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
                openModal={setSelectedProduct}
              />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STICKY WHATSAPP ── */}
      <motion.a className="sticky-whatsapp" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.5 }}>
        <FaWhatsapp /> WhatsApp Us
      </motion.a>

      {/* ── OVERLAYS ── */}
      <CartSidebar cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen} removeFromCart={removeFromCart} updateQty={updateQty} cartTotal={cartTotal} cartCount={cartCount} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} wishlisted={selectedProduct && wishlist.has(selectedProduct.id)} toggleWishlist={toggleWishlist} />
    </div>
  );
}

/* ─── HOME VIEW ──────────────────────────────────────────────── */
function HomeView({ products, addToCart, toggleWishlist, wishlist, openModal, goToShop, cartCount, setCartOpen }) {
  const newArrivals  = products.filter(p => p.isNew).slice(0, 4);
  const trending     = products.filter(p => p.reviews > 100).slice(0, 4);
  const beautyProds  = products.filter(p => p.category === 'Beauty');

  return (
    <>
      <main style={{ position: 'relative', zIndex: 1, width: 'min(1220px, calc(100% - 2rem))', margin: '0 auto' }}>

        {/* ── HERO ── */}
        <section className="hero" id="top">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <div className="hero-eyebrow"><span className="hero-eyebrow-dot" /> Chennai luxury fashion boutique</div>
            <h1>Luxury<br /><span className="gold-text">Bridal</span> &amp;<br />Fashion</h1>
            <motion.div className="hero-luxury-line" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
              {['Bridal jewelry', 'Gold accents', '20 premium products', 'WhatsApp checkout'].map(t => (
                <span className="hero-pill" key={t}>{t}</span>
              ))}
            </motion.div>
            <p className="hero-sub">Browse 20 handpicked luxury pieces — bridal sets, necklaces, earrings, bangles &amp; beauty. Order in seconds via WhatsApp.</p>
            <div className="hero-actions">
              <motion.button className="button button-primary" onClick={goToShop} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FaStore /> Shop All Products
              </motion.button>
              <motion.button className="button button-secondary" onClick={() => setCartOpen(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FaShoppingBag /> View Cart {cartCount > 0 && `(${cartCount})`}
              </motion.button>
            </div>
            <div className="hero-divider" />
            <div className="hero-stats">
              {[
                { label: '20 Products',    sub: 'Jewelry, bangles & beauty' },
                { label: 'Fast Order',     sub: 'WhatsApp checkout'         },
                { label: 'Virtual Try-On', sub: 'See before you buy'        },
              ].map(s => (
                <div className="hero-stat" key={s.label}><strong>{s.label}</strong><span>{s.sub}</span></div>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero-panel" initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.05, ease: 'easeOut', delay: 0.1 }}>
            <div className="hero-image-card">
              <div className="hero-image-badge"><span className="hero-image-badge-dot" /> Live boutique</div>
              <img src={HERO_IMG} alt="Luxury bridal jewelry" loading="eager" />
            </div>
            <div className="hero-mini-grid">
              {[{ label: 'Curated', sub: 'Bridal essentials' }, { label: 'Premium', sub: 'Daily wear classics' }, { label: 'Luxury', sub: 'Beauty edits' }].map(c => (
                <div className="hero-mini-card" key={c.label}><strong>{c.label}</strong><span>{c.sub}</span></div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="luxury-divider" />

        {/* ── SHOP BY CATEGORY ── */}
        <section className="section">
          <div className="section-header-row">
            <SectionTitle eyebrow="Shop by Category" title="Browse our curated collections" />
            <button className="button button-ghost" onClick={goToShop} style={{ flexShrink: 0 }}>
              View All <FaChevronRight style={{ fontSize: '0.7rem' }} />
            </button>
          </div>
          <div className="collection-grid">
            {homeCollections.map((item, i) => (
              <motion.article
                className="collection-card" key={item.title}
                variants={stagger(0.07)} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.2 }} custom={i}
                onClick={() => goToShop(item.cat)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="card-explore">Shop Now <FaArrowRight style={{ fontSize: '0.7rem' }} /></span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── NEW ARRIVALS ── */}
        {newArrivals.length > 0 && (
          <section className="section">
            <div className="section-header-row">
              <SectionTitle eyebrow="New Arrivals" title="Fresh drops just landed" />
              <button className="button button-ghost" onClick={goToShop} style={{ flexShrink: 0 }}>View all</button>
            </div>
            <div className="home-product-grid">
              {newArrivals.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <ProductCard product={product} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlisted={wishlist.has(product.id)} openModal={openModal} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── BRIDAL SHOWCASE ── */}
        <section className="section" id="showcase">
          <SectionTitle eyebrow="Trending Bridal Showcase" title="A cinematic gallery of bridal brilliance" text="Layered compositions and soft-glow framing for an editorial bridal experience." />
          <div className="showcase-grid">
            {bridalShowcase.map((image, i) => (
              <motion.figure className={`showcase-item showcase-${i + 1}`} key={image}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, delay: i * 0.09 }}>
                <img src={image} alt={`Bridal showcase ${i + 1}`} loading="lazy" />
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ── TRENDING PRODUCTS ── */}
        <section className="section">
          <div className="section-header-row">
            <SectionTitle eyebrow="Trending Products" title="Luxury picks people are loving" />
            <button className="button button-ghost" onClick={goToShop} style={{ flexShrink: 0 }}>Shop All</button>
          </div>
          <div className="home-product-grid">
            {trending.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <ProductCard product={product} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlisted={wishlist.has(product.id)} openModal={openModal} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FESTIVAL COLLECTIONS ── */}
        <section className="section">
          <SectionTitle eyebrow="Festival Collections" title="Radiant sets for Diwali, weddings &amp; celebrations" text="Seasonal glamour with premium gold accents and rich festive styling." />
          <div className="collection-grid compact-grid">
            {festivalCollections.map((item, i) => (
              <motion.article className="collection-card" key={item.title}
                variants={stagger(0.07)} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.25 }} custom={i}
                onClick={goToShop}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="festival-badge">{item.badge}</div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="card-explore">Shop Now <FaArrowRight style={{ fontSize: '0.7rem' }} /></span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── BEAUTY PRODUCTS ── */}
        <section className="section">
          <div className="section-header-row">
            <SectionTitle eyebrow="Beauty Products" title="Cosmetics &amp; skincare with luxury presentation" />
            <button className="button button-ghost" onClick={goToShop} style={{ flexShrink: 0 }}>View Beauty</button>
          </div>
          <div className="home-product-grid home-product-grid-3">
            {beautyProds.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08 }}>
                <ProductCard product={product} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlisted={wishlist.has(product.id)} openModal={openModal} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CUSTOMER GALLERY ── */}
        <section className="section">
          <SectionTitle eyebrow="Customer Gallery" title="Real-life moments from PAPPY shoppers" />
          <div className="gallery-grid">
            {galleryItems.map((image, i) => (
              <motion.figure className="gallery-item" key={image + i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.04 }}>
                <img src={image} alt={`Gallery ${i + 1}`} loading="lazy" />
                <div className="gallery-item-overlay"><span>View look <FaArrowRight style={{ fontSize: '0.65rem', marginLeft: 4 }} /></span></div>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ── INSTAGRAM FEED ── */}
        <section className="section">
          <div className="section-header-row">
            <SectionTitle eyebrow="Instagram Feed" title="Boutique-style social snapshots" />
            <a className="button button-secondary" href="https://instagram.com" target="_blank" rel="noreferrer" style={{ flexShrink: 0 }}>
              <FaInstagram /> Follow us
            </a>
          </div>
          <div className="instagram-grid">
            {instagramFeed.map((item, i) => (
              <motion.article className="instagram-card" key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.07 }}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="instagram-meta"><span>{item.tag}</span><strong>{item.title}</strong></div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section reviews-section" id="reviews">
          <SectionTitle eyebrow="Customer Reviews" title="Luxury testimonials from delighted shoppers" text="Elegant social proof that matches the premium tone of the PAPPY boutique." />
          <div className="testimonial-grid">
            {testimonials.map((review, i) => (
              <motion.article className="testimonial-card" key={review.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.09 }}
                whileHover={{ y: -6 }}>
                <div className="testimonial-stars">{[1,2,3,4,5].map(i => <FaStar key={i} />)}</div>
                <p>"{review.quote}"</p>
                <strong>{review.name}</strong>
                <em>{review.role}</em>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="section about-section">
          <div className="about-card">
            <SectionTitle eyebrow="About Brand" title="PAPPY Accessories — Chennai's premium bridal &amp; fashion destination" text="Based in Chennai, we blend festive glamour, timeless detailing, and a boutique-grade shopping experience for weddings, celebrations, and everyday luxury." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
              {[
                { src: '/images/pappy-store-sign.jpg',    alt: 'PAPPY sign'    },
                { src: '/images/pappy-store-wide.jpg',    alt: 'PAPPY store'   },
                { src: '/images/pappy-store-display.jpg', alt: 'PAPPY display' },
              ].map(img => (
                <img key={img.src} src={img.src} alt={img.alt} style={{ borderRadius: '1.2rem', height: '11rem', objectFit: 'cover', width: '100%', border: '1px solid rgba(212,175,55,0.18)' }} />
              ))}
            </div>
            <blockquote className="about-quote">"Crafted to make every woman feel like royalty — whether it's her wedding day or a Tuesday afternoon."</blockquote>
            <div className="about-bullets">
              {[
                { label: 'Luxury feel',   desc: 'Black-gold styling and polished premium presentation'    },
                { label: '20 Products',   desc: 'Bridal sets, necklaces, bangles, earrings & beauty'     },
                { label: 'Easy ordering', desc: 'Add to cart & checkout via WhatsApp in seconds'         },
              ].map(b => (
                <div className="about-bullet" key={b.label}><strong>{b.label}</strong><span>{b.desc}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <motion.section className="cta-banner"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8 }}>
          <div>
            <span>Shop Online · Order via WhatsApp</span>
            <h2>Browse 20 products &amp; order in seconds</h2>
            <p>Add your favourite pieces to cart and checkout directly through WhatsApp. Our team confirms your order instantly.</p>
          </div>
          <div className="cta-actions">
            <button className="button button-primary" onClick={goToShop}><FaStore /> Shop Now</button>
            <a className="button button-secondary" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"><FaWhatsapp /> Chat with Us</a>
          </div>
        </motion.section>

        {/* ── STORE LOCATION ── */}
        <section className="section" id="location">
          <SectionTitle eyebrow="Store Location" title="Visit the Chennai boutique" text="Come visit us in person or reach out via WhatsApp for personalised styling assistance." />
          <div className="map-shell">
            <iframe title="PAPPY location" src="https://www.google.com/maps?q=Chennai,Tamil+Nadu&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="store-info-grid">
            {[
              { icon: <FaMapMarkerAlt />, label: 'Address',       info: '123 Anna Salai, T. Nagar\nChennai, Tamil Nadu 600017'      },
              { icon: <FaClock />,        label: 'Store Timings',  info: 'Mon – Sat: 10:00 AM – 8:30 PM\nSunday: 11:00 AM – 7:00 PM' },
              { icon: <FaPhone />,        label: 'Contact',        info: '+91 98765 43210\n+91 87654 32109'                            },
            ].map(s => (
              <div className="store-info-card" key={s.label}>
                <div className="si-icon">{s.icon}</div>
                <strong>{s.label}</strong>
                <span style={{ whiteSpace: 'pre-line' }}>{s.info}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>PAPPY Accessories</strong>
            <p>Luxury bridal and fashion accessories, crafted for Chennai elegance. Every piece is a celebration of femininity and artisanal craft.</p>
            <div className="footer-social">
              {[
                { href: 'https://instagram.com',          icon: <FaInstagram />, label: 'Instagram' },
                { href: `https://wa.me/${WA_NUMBER}`,     icon: <FaWhatsapp />,  label: 'WhatsApp'  },
                { href: 'https://facebook.com',           icon: <FaFacebook />,  label: 'Facebook'  },
                { href: 'https://youtube.com',            icon: <FaYoutube />,   label: 'YouTube'   },
              ].map(s => (
                <a className="footer-social-link" href={s.href} key={s.label} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Collections</h4>
            <div className="footer-col-links">
              {CATEGORIES.filter(c => c !== 'All').map(c => <a href="#" key={c}>{c}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Info</h4>
            <div className="footer-col-links">
              {['About PAPPY', 'Our Story', 'Testimonials', 'AI Try-On', 'Festival Collections', 'Blog'].map(l => <a href="#" key={l}>{l}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-col-links">
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"><FaWhatsapp style={{ marginRight: 5 }} /> +91 98765 43210</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram style={{ marginRight: 5 }} /> @pappyaccessories</a>
              <a href="#location"><FaMapMarkerAlt style={{ marginRight: 5 }} /> T. Nagar, Chennai</a>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}><FaClock style={{ marginRight: 5 }} /> 10 AM – 8:30 PM</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PAPPY Accessories. All rights reserved.</span>
          <span>Crafted with love for Chennai's finest fashion boutique.</span>
        </div>
      </footer>
    </>
  );
}
