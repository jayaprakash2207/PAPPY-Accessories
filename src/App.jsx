import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp, FaInstagram, FaFacebook, FaYoutube,
  FaStar, FaPlay, FaMapMarkerAlt, FaClock, FaPhone,
  FaArrowRight, FaCamera, FaBolt, FaHeart,
  FaChevronRight, FaShoppingBag, FaTimes, FaMinus, FaPlus, FaBars,
} from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

const WA_NUMBER = '919876543210';

const floatingParticles = [
  { top: '10%', left: '6%',  size: 8,  delay: 0   },
  { top: '17%', left: '84%', size: 10, delay: 0.8 },
  { top: '44%', left: '9%',  size: 6,  delay: 1.4 },
  { top: '60%', left: '90%', size: 12, delay: 0.5 },
  { top: '76%', left: '20%', size: 7,  delay: 1.1 },
  { top: '30%', left: '56%', size: 9,  delay: 1.7 },
  { top: '55%', left: '45%', size: 5,  delay: 2.1 },
  { top: '88%', left: '70%', size: 8,  delay: 0.3 },
];

const HERO_IMG = '/images/hero-bridal.jpg';

const navLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Showcase',    href: '#showcase'    },
  { label: 'Try-On',      href: '#ai-try-on'   },
  { label: 'Reviews',     href: '#reviews'     },
  { label: 'Location',    href: '#location'    },
];

/* ─── PRODUCT DATA ───────────────────────────────────────────── */
const newArrivals = [
  { id: 'na1', title: 'Antique Kundan Bridal Set',  category: 'New Arrival',   badge: 'NEW',  price: '₹7,499',  numericPrice: 7499,  image: '/images/pappy-jewel-3.jpg', desc: 'Exquisite antique kundan bridal set with intricate gold detailing. Perfect for wedding ceremonies and receptions. Handcrafted with premium quality stones.' },
  { id: 'na2', title: 'Crystal Drop Earrings',      category: 'Limited Drop',  badge: 'HOT',  price: '₹2,299',  numericPrice: 2299,  image: '/images/earrings-2.jpg',    desc: 'Stunning crystal drop earrings with premium silver-tone finish. Catches light beautifully for evening events and celebrations.' },
  { id: 'na3', title: 'Gloss Beauty Essentials',    category: 'Beauty Edit',   badge: 'EDIT', price: '₹1,299',  numericPrice: 1299,  image: '/images/beauty-1.jpg',      desc: 'Premium gloss beauty kit with luxury formulations. Includes lip gloss, setting powder, and highlighter for a radiant bridal finish.' },
  { id: 'na4', title: 'Statement Gold Bangles',     category: "Editor's Pick", badge: 'PICK', price: '₹1,999',  numericPrice: 1999,  image: '/images/bangles-2.jpg',     desc: 'Bold statement bangles in rich gold finish. Stack them beautifully for a festive or bridal look that commands attention.' },
];

const collections = [
  { title: 'Bridal Collection',  image: '/images/pappy-jewel-4.jpg', desc: 'Heirloom-grade sets for your wedding day.'        },
  { title: 'Daily Wear',         image: '/images/fashion-1.jpg',     desc: 'Elegant everyday pieces with a quiet glow.'       },
  { title: 'Premium Necklaces',  image: '/images/necklace-2.jpg',    desc: 'Layered luxury with sculpted golden detail.'      },
  { title: 'Earrings',           image: '/images/earrings-1.jpg',    desc: 'Refined silhouettes that frame every look.'       },
  { title: 'Cosmetics',          image: '/images/beauty-2.jpg',      desc: 'Luxury beauty essentials with a polished finish.' },
  { title: 'Bangles',            image: '/images/bangles-1.jpg',     desc: 'Radiant stacks that move with effortless grace.'  },
];

const trendingProducts = [
  { id: 'tp1', title: 'Temple Lakshmi Necklace', price: '₹5,499',  numericPrice: 5499, tag: 'Bestseller', image: '/images/pappy-jewel-1.jpg', desc: 'Divine temple Lakshmi necklace with traditional South Indian gold craftsmanship. A timeless heirloom piece every bride treasures.' },
  { id: 'tp2', title: 'CZ Ruby Bridal Set',      price: '₹8,999',  numericPrice: 8999, tag: 'Trending',   image: '/images/pappy-jewel-2.jpg', desc: 'Complete CZ ruby bridal set with necklace, earrings, and maang tikka. Perfectly matched for your most important day.' },
  { id: 'tp3', title: 'Gold Chain Necklace',     price: '₹3,299',  numericPrice: 3299, tag: 'Hot Pick',   image: '/images/necklace-1.jpg',    desc: 'Elegant gold chain necklace with premium polished finish. Versatile enough for daily wear to the most special occasions.' },
  { id: 'tp4', title: 'Evening Glow Cosmetics',  price: '₹899',    numericPrice: 899,  tag: 'Beauty',     image: '/images/portrait-1.jpg',    desc: 'Evening glow cosmetics set for a radiant, lit-from-within look. Long-lasting formula perfect for all skin tones.' },
];

const bridalShowcase = [
  '/images/bridal-3.jpg',
  '/images/jewelry-1.jpg',
  '/images/pappy-jewel-2.jpg',
  '/images/fashion-2.jpg',
];

const festivalCollections = [
  { id: 'fc1', title: 'Diwali Glow',    badge: '✦ Festival',  price: '₹4,999',  numericPrice: 4999,  image: '/images/bridal-2.jpg',      desc: 'Gold & kundan sets for festive nights. Radiant pieces that truly celebrate the spirit of Diwali.'        },
  { id: 'fc2', title: 'Wedding Season', badge: '✦ Bridal',    price: '₹12,999', numericPrice: 12999, image: '/images/pappy-jewel-4.jpg', desc: 'Complete bridal sets with an heirloom feel. Curated for the most important day of your life.'             },
  { id: 'fc3', title: 'Pongal Classics',badge: '✦ Tradition', price: '₹3,499',  numericPrice: 3499,  image: '/images/bangles-1.jpg',     desc: 'Temple-inspired bangles and stacks for Pongal and traditional celebrations. Crafted with precision.'       },
  { id: 'fc4', title: 'New Year Glam',  badge: '✦ Party',     price: '₹5,999',  numericPrice: 5999,  image: '/images/necklace-2.jpg',    desc: 'Statement pieces for celebration looks. Make every moment unforgettable with these glamorous styles.'     },
];

const beautyProducts = [
  { id: 'bp1', title: 'Luxury Lip & Glow Set',  sub: 'Makeup Edit',   price: '₹1,499', numericPrice: 1499, image: '/images/beauty-1.jpg',  desc: 'Premium lip and glow set with long-lasting luxury formula. Rich pigments for a polished, flawless finish.'  },
  { id: 'bp2', title: 'Glow Skin Essentials',   sub: 'Skincare',      price: '₹2,199', numericPrice: 2199, image: '/images/beauty-2.jpg',  desc: 'Radiance-boosting skincare essentials. A curated collection designed for the complete bridal beauty routine.' },
  { id: 'bp3', title: 'Bridal Cosmetics Kit',   sub: 'Bridal Beauty', price: '₹3,999', numericPrice: 3999, image: '/images/fashion-2.jpg', desc: 'Complete bridal cosmetics kit with everything needed for flawless, photo-ready wedding day makeup.'           },
];

const reels = [
  { title: 'Bridal glow edit',      tag: 'Trending', image: '/images/pappy-jewel-3.jpg' },
  { title: 'Everyday elegance',     tag: 'Style',    image: '/images/fashion-1.jpg'     },
  { title: 'Gold statement layers', tag: 'Luxury',   image: '/images/bridal-3.jpg'      },
];

const tryOnLooks = [
  { label: 'Traditional Bridal', shade: 'Rose Gold', image: '/images/pappy-jewel-1.jpg' },
  { label: 'Reception Glam',     shade: 'Champagne', image: '/images/portrait-1.jpg'    },
  { label: 'Minimal Luxe',       shade: 'Soft Gold', image: '/images/fashion-2.jpg'     },
];

const tryOnJewelryMockups = [
  { title: 'Antique Temple Set', image: '/images/pappy-jewel-4.jpg' },
  { title: 'CZ Bridal Choker',   image: '/images/necklace-1.jpg'    },
  { title: 'Gold Bangle Stack',  image: '/images/bangles-2.jpg'     },
];

const aiRecommendations = [
  'Kundan bridal set for silk sarees',
  'Champagne earrings for evening events',
  'Soft-glow cosmetics for wedding photos',
  'Temple bangles for festive styling',
  'Statement necklace for receptions',
];

const galleryItems = [
  '/images/pappy-store-wide.jpg',
  '/images/pappy-store-display.jpg',
  '/images/pappy-store-front.jpg',
  '/images/pappy-store-sign.jpg',
  '/images/pappy-jewel-1.jpg',
  '/images/earrings-1.jpg',
];

const instagramFeed = [
  { tag: '@pappyaccessories', title: 'Bridal collection drop', image: '/images/pappy-jewel-3.jpg' },
  { tag: '@pappyaccessories', title: 'Gold details up close',  image: '/images/jewelry-1.jpg'     },
  { tag: '@pappyaccessories', title: 'Beauty edit drops',      image: '/images/beauty-1.jpg'      },
];

const testimonials = [
  { name: 'Aishwarya R.', role: 'Bridal Customer',  stars: 5, quote: 'The bridal collection felt handpicked for a luxury wedding wardrobe. Every piece was exquisite and perfectly crafted.'              },
  { name: 'Nandhini S.',  role: 'Regular Shopper',  stars: 5, quote: 'Premium finish, beautiful packaging, and a boutique experience throughout. PAPPY is my go-to for all special occasions.'         },
  { name: 'Priya M.',     role: 'Festival Shopper', stars: 5, quote: 'The bangles and earrings made my festive look feel effortlessly elevated. The quality is genuinely unmatched at this price.'     },
];

const googleReviews = [
  { name: 'Meena S.',  rating: '5.0', text: 'Elegant selection and highly responsive WhatsApp support. Delivered on time for my wedding.'    },
  { name: 'Sana K.',   rating: '5.0', text: 'The bridal styling felt deeply premium and very thoughtful. Loved every single piece I ordered.' },
  { name: 'Aparna V.', rating: '4.9', text: 'Beautiful packaging, luxury feel, and stunning festive pieces. Will definitely order again.'     },
];

/* ─── ANIMATION VARIANTS ─────────────────────────────────────── */
const stagger = (delay = 0.07) => ({
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * delay, duration: 0.65, ease: 'easeOut' } }),
});

/* ─── HELPERS ────────────────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => <FaStar key={i} />)}
    </div>
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

/* ─── CART SIDEBAR ───────────────────────────────────────────── */
function CartSidebar({ cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount }) {
  const checkoutWhatsApp = () => {
    if (!cart.length) return;
    const lines = cart.map(i => `• ${i.title} x${i.qty} — ₹${(i.numericPrice * i.qty).toLocaleString('en-IN')}`).join('\n');
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
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
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
                <button className="button button-secondary" style={{ marginTop: '1.2rem', width: '100%' }} onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-info">
                        <strong>{item.title}</strong>
                        <span className="cart-item-price">{item.price}</span>
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
function ProductModal({ product, onClose, onAddToCart }) {
  const buyNow = () => {
    const msg = encodeURIComponent(
      `Hi PAPPY Accessories! 👋\n\nI'm interested in:\n*${product.title}*\nPrice: ${product.price}\n\nCould you please confirm availability and payment details? Thank you!`
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
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            style={{ x: '-50%', y: '-50%' }}
            role="dialog"
            aria-modal="true"
          >
            <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
            <div className="modal-grid">
              <div className="modal-img-side">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="modal-info-side">
                {(product.badge || product.tag || product.sub) && (
                  <span className="product-badge">{product.badge || product.tag || product.sub}{product.category ? ` · ${product.category}` : ''}</span>
                )}
                <h2 className="modal-title">{product.title}</h2>
                <div className="modal-price">{product.price}</div>
                <div className="modal-stars">
                  {[1,2,3,4,5].map(i => <FaStar key={i} />)}
                  <span>Premium Quality</span>
                </div>
                <p className="modal-desc">{product.desc}</p>
                <div className="modal-actions">
                  <button className="button button-primary" onClick={() => { onAddToCart(product); onClose(); }}>
                    <FaShoppingBag /> Add to Cart
                  </button>
                  <button className="button button-secondary" onClick={buyNow}>
                    <FaWhatsapp /> Buy Now
                  </button>
                </div>
                <div className="modal-trust">
                  <span>✦ Free delivery above ₹1,999</span>
                  <span>✦ Secure WhatsApp ordering</span>
                  <span>✦ Easy returns within 7 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart]                   = useState([]);
  const [cartOpen, setCartOpen]           = useState(false);
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

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, delta) =>
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );

  const cartTotal = cart.reduce((sum, i) => sum + i.numericPrice * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="page-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />

      <div className="particle-field" aria-hidden="true">
        {floatingParticles.map((p, i) => (
          <motion.span
            className="particle" key={i}
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
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
        <div className="brand">
          <div className="brand-mark">P</div>
          <div>
            <strong>PAPPY Accessories</strong>
            <span>Luxury Bridal &amp; Fashion Boutique</span>
          </div>
        </div>
        <nav>
          {navLinks.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="navbar-right">
          <button className="nav-cart-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
            <FaShoppingBag />
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>
          <a className="nav-cta" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer">
            <FaWhatsapp /> Order Now
          </a>
          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Menu">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="mobile-nav-wa" onClick={() => setMobileMenuOpen(false)}>
              <FaWhatsapp /> Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ══ HERO ══ */}
        <section className="hero" id="top">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Chennai luxury fashion boutique
            </div>
            <h1>Luxury<br /><span className="gold-text">Bridal</span> &amp;<br />Fashion</h1>
            <motion.div className="hero-luxury-line" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
              {['Bridal jewelry', 'Gold accents', 'Instagram boutique', 'Cinematic styling'].map(t => (
                <span className="hero-pill" key={t}>{t}</span>
              ))}
            </motion.div>
            <p className="hero-sub">Elegant collections crafted for every occasion — weddings, festivals, and everyday luxury.</p>
            <div className="hero-actions">
              <motion.a className="button button-primary" href="#collections" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FaHeart /> Shop Collections
              </motion.a>
              <motion.button className="button button-secondary" onClick={() => setCartOpen(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FaShoppingBag /> View Cart {cartCount > 0 && `(${cartCount})`}
              </motion.button>
            </div>
            <div className="hero-divider" />
            <div className="hero-stats">
              {[
                { label: 'Shop Online',    sub: 'Browse & add to cart'          },
                { label: 'Fast Ordering',  sub: 'WhatsApp checkout in seconds'  },
                { label: 'Virtual Try-On', sub: 'See the look before you order' },
              ].map(s => (
                <div className="hero-stat" key={s.label}>
                  <strong>{s.label}</strong>
                  <span>{s.sub}</span>
                </div>
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
                <div className="hero-mini-card" key={c.label}>
                  <strong>{c.label}</strong>
                  <span>{c.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="luxury-divider" />

        {/* ══ NEW ARRIVALS ══ */}
        <section className="section" id="new-arrivals">
          <div className="section-header-row">
            <SectionTitle eyebrow="New Arrivals" title="Fresh drops with cinematic presentation" text="A runway of new products styled like a premium editor's edit." />
            <a className="button button-ghost" href="#collections" style={{ flexShrink: 0 }}>View all <FaChevronRight style={{ fontSize: '0.7rem' }} /></a>
          </div>
          <div className="carousel-row carousel-row-lg">
            {newArrivals.map((item, i) => (
              <motion.article
                className="product-card product-card-wide" key={item.id}
                initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.06 }}
                onClick={() => setSelectedProduct(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="product-meta">
                  <span className="product-badge">{item.badge} · {item.category}</span>
                  <strong>{item.title}</strong>
                  <div className="product-price">{item.price}</div>
                  <div className="product-card-actions">
                    <button className="btn-sm btn-gold" onClick={e => { e.stopPropagation(); addToCart(item); }}><FaShoppingBag /> Add to Cart</button>
                    <button className="btn-sm btn-outline" onClick={e => { e.stopPropagation(); setSelectedProduct(item); }}>View</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ FEATURED COLLECTIONS ══ */}
        <section className="section" id="collections">
          <SectionTitle eyebrow="Featured Collections" title="Six luxurious edits for every ritual and celebration" text="A modern boutique lineup designed to feel rich, tactile, and elevated on every screen." />
          <div className="collection-grid">
            {collections.map((item, i) => (
              <motion.article
                className="collection-card" key={item.title}
                variants={stagger(0.07)} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.25 }} custom={i}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="card-explore">Explore <FaArrowRight style={{ fontSize: '0.7rem' }} /></span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ TRENDING BRIDAL SHOWCASE ══ */}
        <section className="section" id="showcase">
          <SectionTitle eyebrow="Trending Bridal Showcase" title="A cinematic gallery of bridal brilliance" text="Layered compositions and soft-glow framing create the feeling of an editorial bridal campaign." />
          <div className="showcase-grid">
            {bridalShowcase.map((image, i) => (
              <motion.figure
                className={`showcase-item showcase-${i + 1}`} key={image}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, delay: i * 0.09 }}
              >
                <img src={image} alt={`Bridal showcase ${i + 1}`} loading="lazy" />
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ══ TRENDING PRODUCTS ══ */}
        <section className="section" id="trending">
          <div className="section-header-row">
            <SectionTitle eyebrow="Trending Products" title="Luxury picks people are loving right now" />
            <button className="button button-ghost" onClick={() => setCartOpen(true)} style={{ flexShrink: 0 }}>
              <FaShoppingBag /> Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
          <div className="carousel-row carousel-row-lg">
            {trendingProducts.map((item, i) => (
              <motion.article
                className="product-card" key={item.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.06 }}
                onClick={() => setSelectedProduct(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="product-meta">
                  <span className="product-badge">{item.tag}</span>
                  <strong>{item.title}</strong>
                  <div className="product-price">{item.price}</div>
                  <div className="product-card-actions">
                    <button className="btn-sm btn-gold" onClick={e => { e.stopPropagation(); addToCart(item); }}><FaShoppingBag /> Add to Cart</button>
                    <button className="btn-sm btn-outline" onClick={e => { e.stopPropagation(); setSelectedProduct(item); }}>View</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ AI TRY-ON ══ */}
        <section className="section ai-section" id="ai-try-on">
          <div className="ai-section-bg" />
          <SectionTitle eyebrow="AI Try-On Feature" title="Try Before You Buy" text="A futuristic virtual try-on experience — upload, face-detect, preview jewelry in real time." />
          <div className="ai-grid">
            <motion.div className="ai-panel ai-upload-panel" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
              <div className="ai-panel-head">
                <div className="ai-panel-head-label"><FaBolt /> AI-Powered Styling</div>
                <strong>Drop your portrait for instant styling</strong>
              </div>
              <div className="upload-placeholder">
                <div className="upload-orb" />
                <div className="upload-icon-ring"><FiUpload /></div>
                <strong>Tap to upload photo</strong>
                <span>Front-facing portrait recommended</span>
                <div className="upload-tags">
                  <span className="upload-tag">JPG / PNG</span>
                  <span className="upload-tag">Face detect ready</span>
                </div>
              </div>
              <div>
                <div className="ai-panel-head-label" style={{ marginBottom: '0.6rem' }}><FaBolt /> AI Recommendations</div>
                <div className="ai-recs">
                  {aiRecommendations.map(r => (
                    <span className="ai-rec-tag" key={r}><span className="ai-rec-dot" /> {r}</span>
                  ))}
                </div>
              </div>
              <div className="ai-metrics">
                {[{ val: '98%', label: 'Style match' }, { val: '24h', label: 'Delivery guidance' }, { val: 'Live', label: 'WhatsApp support' }].map(m => (
                  <div className="ai-metric" key={m.label}>
                    <strong>{m.val}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="tryon-stack">
              <motion.div className="tryon-hero-panel" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
                <div className="tryon-screen">
                  <div className="face-detection-frame">
                    <img src="/images/portrait-1.jpg" alt="Virtual try-on preview" loading="lazy" />
                    <div className="face-ring face-ring-one" />
                    <div className="face-ring face-ring-two" />
                    <div className="face-ring face-ring-three" />
                    <div className="face-chip"><FaCamera style={{ marginRight: 4 }} />Face detected</div>
                    <div className="face-chip face-chip-right"><FaBolt style={{ marginRight: 4 }} />AI blend ready</div>
                  </div>
                  <div className="tryon-overlay-card">
                    <div className="tryon-overlay-label">Virtual Jewelry Preview</div>
                    <strong>See bridal layers on your look</strong>
                    <p>Preview jewelry tones, styling combos, and beauty pairings before you buy.</p>
                  </div>
                </div>
                <div className="tryon-preview-strip">
                  {tryOnJewelryMockups.map(item => (
                    <article className="tryon-preview-article" key={item.title}>
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="tryon-preview-info">
                        <strong>{item.title}</strong>
                        <span>Premium mockup</span>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
              <motion.div className="tryon-mini-panel" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: 0.1 }}>
                <div className="ai-panel-head">
                  <div className="ai-panel-head-label"><FaBolt /> AI Styling Outputs</div>
                  <strong>Luxury recommendations in real time</strong>
                </div>
                <div className="tryon-looks-grid">
                  {tryOnLooks.map(look => (
                    <div className="tryon-look-card" key={look.label}>
                      <img src={look.image} alt={look.label} loading="lazy" />
                      <div className="tryon-look-info">
                        <strong>{look.label}</strong>
                        <span>{look.shade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ FESTIVAL COLLECTIONS ══ */}
        <section className="section" id="festival-collections">
          <SectionTitle eyebrow="Festival Collections" title="Radiant sets for Diwali, weddings &amp; celebrations" text="Seasonal glamour with premium gold accents and rich festive styling." />
          <div className="collection-grid compact-grid">
            {festivalCollections.map((item, i) => (
              <motion.article
                className="collection-card" key={item.id}
                variants={stagger(0.07)} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.25 }} custom={i}
                onClick={() => setSelectedProduct(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="festival-badge">{item.badge}</div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <div className="product-price" style={{ marginBottom: '0.25rem' }}>{item.price}</div>
                  <span className="card-explore">Add to Cart <FaArrowRight style={{ fontSize: '0.7rem' }} /></span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ BEAUTY PRODUCTS ══ */}
        <section className="section" id="beauty-products">
          <SectionTitle eyebrow="Beauty Products" title="Cosmetics &amp; makeup with luxury presentation" text="A polished beauty edit to complete the bridal and accessory story." />
          <div className="carousel-row beauty-row">
            {beautyProducts.map((item, i) => (
              <motion.article
                className="product-card product-card-tall" key={item.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.07 }}
                onClick={() => setSelectedProduct(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="product-meta">
                  <span className="product-badge">{item.sub}</span>
                  <strong>{item.title}</strong>
                  <div className="product-price">{item.price}</div>
                  <div className="product-card-actions">
                    <button className="btn-sm btn-gold" onClick={e => { e.stopPropagation(); addToCart(item); }}><FaShoppingBag /> Add to Cart</button>
                    <button className="btn-sm btn-outline" onClick={e => { e.stopPropagation(); setSelectedProduct(item); }}>View</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ CUSTOMER GALLERY ══ */}
        <section className="section" id="customer-gallery">
          <SectionTitle eyebrow="Customer Gallery" title="Real-life styling moments from PAPPY shoppers" />
          <div className="gallery-grid">
            {galleryItems.map((image, i) => (
              <motion.figure
                className="gallery-item" key={image + i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.04 }}
              >
                <img src={image} alt={`Customer gallery ${i + 1}`} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>View look <FaArrowRight style={{ fontSize: '0.65rem', marginLeft: 4 }} /></span>
                </div>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ══ INSTAGRAM FEED ══ */}
        <section className="section" id="instagram-feed">
          <div className="section-header-row">
            <SectionTitle eyebrow="Instagram Feed" title="Boutique-style social snapshots" />
            <a className="button button-secondary" href="https://instagram.com" target="_blank" rel="noreferrer" style={{ flexShrink: 0 }}>
              <FaInstagram /> Follow us
            </a>
          </div>
          <div className="instagram-grid">
            {instagramFeed.map((item, i) => (
              <motion.article
                className="instagram-card" key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.07 }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="instagram-meta">
                  <span>{item.tag}</span>
                  <strong>{item.title}</strong>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ INSTAGRAM REELS STYLE ══ */}
        <section className="section reels-section">
          <SectionTitle eyebrow="Instagram Reels Style" title="Vertical previews designed like luxury social stories" text="Styled as premium reels cards to echo the brand's social-first, fashion-forward energy." />
          <div className="reels-strip">
            {reels.map((item, i) => (
              <motion.article
                className="reel-card" key={item.title}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="reel-play-btn"><FaPlay /></div>
                <div className="reel-label">
                  <span>{item.tag}</span>
                  <strong>{item.title}</strong>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ GOOGLE REVIEWS ══ */}
        <section className="section" id="google-reviews">
          <SectionTitle eyebrow="Google Reviews" title="Highly rated boutique experience" text="A polished review wall inspired by Google-style trust signals and luxury retail feedback." />
          <div className="google-reviews-grid">
            {googleReviews.map((item, i) => (
              <motion.article
                className="google-review-card" key={item.name}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: i * 0.07 }}
                whileHover={{ y: -5 }}
              >
                <div className="review-top">
                  <strong>{item.name}</strong>
                  <span className="review-rating"><FaStar /> {item.rating}</span>
                </div>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ CUSTOMER REVIEWS ══ */}
        <section className="section reviews-section" id="reviews">
          <SectionTitle eyebrow="Customer Reviews" title="Luxury testimonials from delighted shoppers" text="Elegant social proof that matches the premium tone of the PAPPY boutique." />
          <div className="testimonial-grid">
            {testimonials.map((review, i) => (
              <motion.article
                className="testimonial-card" key={review.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.09 }}
                whileHover={{ y: -6 }}
              >
                <Stars count={review.stars} />
                <p>"{review.quote}"</p>
                <strong>{review.name}</strong>
                <em>{review.role}</em>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ══ ABOUT BRAND ══ */}
        <section className="section about-section">
          <div className="about-card">
            <SectionTitle eyebrow="About Brand" title="PAPPY Accessories — a premium destination for bridal &amp; fashion elegance" text="Based in Chennai, we blend festive glamour, timeless detailing, and a boutique-grade shopping experience for weddings, celebrations, and everyday luxury." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
              {[
                { src: '/images/pappy-store-sign.jpg',    alt: 'PAPPY Accessories neon sign'      },
                { src: '/images/pappy-store-wide.jpg',    alt: 'PAPPY Accessories store front'    },
                { src: '/images/pappy-store-display.jpg', alt: 'PAPPY Accessories display window' },
              ].map(img => (
                <img key={img.src} src={img.src} alt={img.alt} style={{ borderRadius: '1.2rem', height: '11rem', objectFit: 'cover', width: '100%', border: '1px solid rgba(212,175,55,0.18)' }} />
              ))}
            </div>
            <blockquote className="about-quote">
              "Crafted to make every woman feel like royalty — whether it's her wedding day or a Tuesday afternoon."
            </blockquote>
            <div className="about-bullets">
              {[
                { label: 'Luxury feel',   desc: 'Black-gold styling and polished premium presentation'    },
                { label: 'Curated range', desc: 'Necklaces, bangles, earrings, cosmetics, and much more' },
                { label: 'Easy ordering', desc: 'Add to cart & checkout via WhatsApp in seconds'         },
              ].map(b => (
                <div className="about-bullet" key={b.label}>
                  <strong>{b.label}</strong>
                  <span>{b.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHATSAPP CTA BANNER ══ */}
        <motion.section
          className="cta-banner"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8 }}
        >
          <div>
            <span>Shop Online · Order via WhatsApp</span>
            <h2>Add to cart &amp; order in seconds</h2>
            <p>Browse the collection, add your favourite pieces to cart, and checkout directly through WhatsApp. Our team confirms your order instantly.</p>
          </div>
          <div className="cta-actions">
            <button className="button button-primary" onClick={() => setCartOpen(true)}>
              <FaShoppingBag /> View Cart {cartCount > 0 && `(${cartCount})`}
            </button>
            <a className="button button-secondary" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer">
              <FaWhatsapp /> Chat with Us
            </a>
          </div>
        </motion.section>

        {/* ══ STORE LOCATION ══ */}
        <section className="section" id="location">
          <SectionTitle eyebrow="Store Location" title="Visit the Chennai boutique" text="Come visit us in person or reach out via WhatsApp for personalised styling assistance." />
          <div className="map-shell">
            <iframe title="PAPPY Accessories — Chennai location" src="https://www.google.com/maps?q=Chennai,Tamil+Nadu&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="store-info-grid">
            {[
              { icon: <FaMapMarkerAlt />, label: 'Address',       info: '123 Anna Salai, T. Nagar\nChennai, Tamil Nadu 600017'     },
              { icon: <FaClock />,        label: 'Store Timings',  info: 'Mon – Sat: 10:00 AM – 8:30 PM\nSunday: 11:00 AM – 7:00 PM' },
              { icon: <FaPhone />,        label: 'Contact',        info: '+91 98765 43210\n+91 87654 32109'                           },
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

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>PAPPY Accessories</strong>
            <p>Luxury bridal and fashion accessories, crafted for Chennai elegance. Every piece is a celebration of femininity and artisanal craft.</p>
            <div className="footer-social">
              {[
                { href: 'https://instagram.com',             icon: <FaInstagram />, label: 'Instagram' },
                { href: `https://wa.me/${WA_NUMBER}`,        icon: <FaWhatsapp />,  label: 'WhatsApp'  },
                { href: 'https://facebook.com',              icon: <FaFacebook />,  label: 'Facebook'  },
                { href: 'https://youtube.com',               icon: <FaYoutube />,   label: 'YouTube'   },
              ].map(s => (
                <a className="footer-social-link" href={s.href} key={s.label} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Collections</h4>
            <div className="footer-col-links">
              {['Bridal Collection', 'Daily Wear', 'Premium Necklaces', 'Earrings', 'Bangles', 'Cosmetics'].map(l => (
                <a href="#collections" key={l}>{l}</a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <div className="footer-col-links">
              {['New Arrivals', 'Trending Products', 'Festival Collections', 'Beauty Products', 'AI Try-On', 'Customer Gallery'].map(l => (
                <a href="#" key={l}>{l}</a>
              ))}
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

      <motion.a
        className="sticky-whatsapp"
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <FaWhatsapp /> WhatsApp Us
      </motion.a>

      <CartSidebar
        cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen}
        removeFromCart={removeFromCart} updateQty={updateQty}
        cartTotal={cartTotal} cartCount={cartCount}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
