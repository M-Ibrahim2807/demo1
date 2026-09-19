import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartProvider, useCart } from '@/lib/cart';
import { categories, menuItems, type MenuItem } from '@/data/menu';
import { submitOrder, type Order } from '@/lib/supabase';

type Page = 'home' | 'menu' | 'order' | 'story' | 'visit';

function getPage(): Page {
  const path = window.location.pathname.replace('/', '');
  return (['menu', 'order', 'story', 'visit'] as Page[]).includes(path as Page) ? (path as Page) : 'home';
}

function App() {
  const [page, setPage] = useState<Page>(getPage);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPage(getPage());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (next: Page) => {
    window.history.pushState({}, '', next === 'home' ? '/' : `/${next}`);
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'menu', label: 'Menu' },
    { key: 'order', label: 'Order Online' },
    { key: 'story', label: 'Our Story' },
    { key: 'visit', label: 'Visit' },
  ];

  return (
    <CartProvider>
      <div className="site-shell">
        <Header page={page} navItems={navItems} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && (
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key)}>
                {item.label}
                <ChevronRight size={16} />
              </button>
            ))}
          </nav>
        )}

        {page === 'home' && <Home navigate={navigate} />}
        {page === 'menu' && <MenuPage navigate={navigate} />}
        {page === 'order' && <OrderPage />}
        {page === 'story' && <StoryPage navigate={navigate} />}
        {page === 'visit' && <VisitPage />}

        <Footer navigate={navigate} />
        <CartBar navigate={navigate} />
      </div>
    </CartProvider>
  );
}

function Header({
  page,
  navItems,
  navigate,
  menuOpen,
  setMenuOpen,
}: {
  page: Page;
  navItems: { key: Page; label: string }[];
  navigate: (p: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate('home')} aria-label="El Alebrije home">
        <span className="brand-mark">EA</span>
        <span className="brand-text">
          <strong>El Alebrije</strong>
          <small>Oaxacan Streetfood</small>
        </span>
      </button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.key} className={page === item.key ? 'active' : ''} onClick={() => navigate(item.key)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="order-pill" onClick={() => navigate('order')}>
          <ShoppingBag size={15} /> Order Online
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>
    </header>
  );
}

const images = {
  hero: 'https://images.pexels.com/photos/4958521/pexels-photo-4958521.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  tacos: 'https://images.pexels.com/photos/27827766/pexels-photo-27827766.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  plate: 'https://images.pexels.com/photos/4958526/pexels-photo-4958526.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  table: 'https://images.pexels.com/photos/33614213/pexels-photo-33614213.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
  garnish: 'https://images.pexels.com/photos/4958775/pexels-photo-4958775.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
};

function Home({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-bg">
          <img src={images.hero} alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Houston · Oaxaca</p>
          <h1>
            Oaxaca <em>in Houston</em>
          </h1>
          <p className="hero-sub">
            Handmade tortillas, Oaxacan quesillo brought in directly from Mexico, and the famous tlayuda with
            chapulines — authentic Oaxacan streetfood, right here in the city.
          </p>
          <div className="hero-actions">
            <button className="btn btn-dark" onClick={() => navigate('menu')}>
              View Menu
            </button>
            <button className="btn btn-light" onClick={() => navigate('order')}>
              Order Online <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="info-strip">
        <a href="tel:8325303421" className="info-item">
          <Phone size={16} />
          <span>832-530-3421</span>
        </a>
        <div className="info-divider" />
        <div className="info-item">
          <MapPin size={16} />
          <span>4816 N Shepherd Dr, Houston, TX 77018</span>
        </div>
        <div className="info-divider" />
        <div className="info-item">
          <Clock3 size={16} />
          <span>Now at Farmboy Brewing Co.</span>
        </div>
      </section>

      <section className="intro-section">
        <div className="intro-image">
          <img src={images.plate} alt="Oaxacan dish" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Our Food</p>
          <h2>
            From our handmade tortillas to the Oaxacan quesillo brought in directly from Mexico.
          </h2>
          <p className="intro-text">
            You will enjoy every bite of our authentic Oaxacan streetfood right here in Houston. Try out the famous
            tlayuda with chapulines or the picaditas with our homemade salsas and experience the delicious Oaxacan
            cuisine.
          </p>
          <button className="text-link" onClick={() => navigate('menu')}>
            Explore the menu <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="feature-banner">
        <div className="feature-banner-content">
          <p className="eyebrow eyebrow-light">Don't Miss</p>
          <h2>
            Try the <em>tlayuda</em> with chapulines
          </h2>
          <button className="btn btn-light" onClick={() => navigate('order')}>
            Order Now <ArrowRight size={16} />
          </button>
        </div>
        <img src={images.table} alt="Colorful tacos" />
      </section>

      <section className="visit-teaser">
        <div>
          <p className="eyebrow">Come See Us</p>
          <h2>
            Pull up a chair. <em>We saved you a spot.</em>
          </h2>
          <p className="intro-text">
            We're at Farmboy Brewing Co. on N Shepherd. Bring your people and your appetite.
          </p>
          <button className="text-link" onClick={() => navigate('visit')}>
            Hours & location <ArrowRight size={15} />
          </button>
        </div>
        <div className="visit-teaser-img">
          <img src={images.tacos} alt="Fresh tacos" />
        </div>
      </section>
    </main>
  );
}

function MenuPage({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState('All');
  const { add } = useCart();
  const filtered = filter === 'All' ? menuItems : menuItems.filter((i) => i.category === filter);
  const grouped = categories.filter((c) => c !== 'All' && (filter === 'All' || filter === c));
  const popular = [menuItems.find((item) => item.id === 'tlayuda-chingona'), menuItems.find((item) => item.id === 'tacos-cochinita'), menuItems.find((item) => item.id === 'torta'), menuItems.find((item) => item.id === 'churros')].filter((item): item is MenuItem => Boolean(item));
  const recommendations = [menuItems.find((item) => item.id === 'tlayuda-mixta'), menuItems.find((item) => item.id === 'botana'), menuItems.find((item) => item.id === 'taquitos-mole'), menuItems.find((item) => item.id === 'quesadilla')].filter((item): item is MenuItem => Boolean(item));

  return (
    <main className="menu-page menu-experience">
      <section className="menu-banner">
        <img src="https://images.squarespace-cdn.com/content/v1/600605996f0b7e66aaa85e21/7cf03fac-3b0c-4acb-bb59-9d867a8d8b05/unnamed+%2817%29.jpg" alt="El Alebrije food truck" />
        <div className="menu-banner-overlay" />
        <div className="menu-banner-copy">
          <p className="eyebrow eyebrow-light">El Alebrije · Oaxacan Streetfood</p>
          <h1>Our Menu</h1>
          <p>Made by hand. Served with heart. Ready when you are.</p>
        </div>
      </section>

      <div className="menu-order-shell">
        <aside className="menu-sidebar">
          <label className="menu-search"><span>⌕</span><input placeholder="Search menu" /></label>
          <div className="sidebar-links">
            {['Popular', 'Grand Tasting', 'Recommendations', 'Midday', 'Tlayudas', 'Tacos', 'Antojitos'].map((item) => <button key={item} className={item === 'Popular' ? 'active' : ''}>{item}</button>)}
          </div>
          <div className="sidebar-note"><span>Open for pickup</span><strong>Wed–Sun</strong><small>4816 N Shepherd Dr<br />Houston, TX 77018</small></div>
        </aside>

        <div className="menu-content">
          <div className="menu-title-row"><div><p className="eyebrow">El Alebrije Oaxacan Streetfood</p><h2>El Alebrije Menu</h2><span className="open-status"><i /> Open now</span></div><button className="menu-more">More <ChevronDown size={14} /></button></div>
          <div className="menu-switches"><button className="selected">Pickup</button><button>Delivery</button><button><Clock3 size={13} /> Pickup location</button><button><Clock3 size={13} /> Pickup time</button><button><ShoppingBag size={13} /> Group order</button></div>

          <section className="menu-feature-section"><MenuSectionTitle title="Popular" action /><div className="popular-scroll">{popular.map((item, index) => <MenuPhotoCard key={item.id} item={item} image={index % 2 === 0 ? images.tacos : images.plate} />)}</div></section>
          <section className="menu-feature-section grand-tasting"><MenuSectionTitle title="Grand Tasting" /><div className="grand-tasting-card"><div><h3>Grand Tasting</h3><strong>$82.00</strong><p>A culinary landscape globally curated by Chef Quentin Love, your choice of three entrees from our amazing menu paired with a glass of wine or champagne plus our house made dessert & crafted lemonade.</p></div><button className="add-btn" onClick={() => { const item = menuItems.find((entry) => entry.id === 'botana'); if (item) add(item); }}><Plus size={15} /></button></div></section>
          <section className="menu-feature-section"><MenuSectionTitle title="Recommendations" /><div className="recommend-grid">{recommendations.map((item, index) => <MenuPhotoCard key={item.id} item={item} image={index % 2 === 0 ? images.table : images.garnish} compact />)}</div></section>
          {grouped.map((cat) => <section className="menu-feature-section menu-category-section" key={cat}><MenuSectionTitle title={cat} /><div className="menu-grid menu-grid-reference">{filtered.filter((item) => item.category === cat).map((item) => <MenuRow key={item.id} item={item} />)}</div></section>)}
        </div>
      </div>
    </main>
  );
}

function MenuSectionTitle({ title, action = false }: { title: string; action?: boolean }) {
  return <div className="menu-section-title"><h2>{title}</h2>{action && <div className="section-arrows"><button aria-label="Previous"><ArrowLeft size={13} /></button><button aria-label="Next"><ArrowRight size={13} /></button></div>}</div>;
}

function MenuPhotoCard({ item, image, compact = false }: { item: MenuItem; image: string; compact?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return <article className={compact ? 'menu-photo-card compact' : 'menu-photo-card'}>
    <div className="menu-photo-wrap"><img src={image} alt={item.name} /><button className={added ? 'photo-add added' : 'photo-add'} onClick={() => { add(item); setAdded(true); setTimeout(() => setAdded(false), 1000); }}>{added ? <Check size={14} /> : <Plus size={14} />}</button></div>
    <h3>{item.name}</h3><div className="photo-card-price">${item.price.toFixed(2)}</div><p>{item.description}</p>
  </article>;
}

function MenuRow({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className="menu-row">
      <div className="menu-row-info">
        <div className="menu-row-head">
          <h3>{item.name}</h3>
          {item.tags?.includes('veg') && <span className="veg-badge">V</span>}
        </div>
        <p>{item.description}</p>
      </div>
      <div className="menu-row-action">
        <span className="menu-price">${item.price.toFixed(2)}</span>
        <button
          className={added ? 'add-btn added' : 'add-btn'}
          onClick={() => {
            add(item);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
        >
          {added ? <Check size={15} /> : <Plus size={15} />}
        </button>
      </div>
    </div>
  );
}

function OrderPage() {
  const { lines, setQty, remove, clear, subtotal, count } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Order | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    setError(null);
    const { data, error: err } = await submitOrder({
      customer_name: name,
      customer_phone: phone,
      pickup_time: pickupTime,
      items: lines.map(({ id, ...rest }) => rest),
      subtotal,
      notes: notes || undefined,
    });
    setSubmitting(false);
    if (err || !data) {
      setError(err || 'Something went wrong. Please try again.');
      return;
    }
    setConfirmed(data);
    clear();
  };

  if (confirmed) {
    return (
      <main className="order-page">
        <div className="confirm-card">
          <div className="confirm-icon">
            <Check size={32} />
          </div>
          <p className="eyebrow">Order Confirmed</p>
          <h1>Gracias, {confirmed.customer_name.split(' ')[0]}!</h1>
          <p className="confirm-text">
            Your pickup order has been received. We'll have it ready for you at {confirmed.pickup_time}.
          </p>
          <div className="confirm-detail">
            <span>Order #{confirmed.id.slice(0, 8).toUpperCase()}</span>
            <span>Total: ${Number(confirmed.subtotal).toFixed(2)}</span>
          </div>
          <div className="confirm-items">
            {confirmed.items.map((item, i) => (
              <div key={i}>
                <span>
                  {item.quantity}× {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="order-page">
      <section className="page-header">
        <p className="eyebrow">Order Online</p>
        <h1>Build your order</h1>
        <p className="page-sub">Pickup at 4816 N Shepherd Dr. Add items from the menu below.</p>
      </section>

      <div className="order-layout">
        <div className="order-menu">
          <OrderMenuSection />
        </div>

        <aside className="cart-panel">
          <div className="cart-header">
            <h2>Your Order</h2>
            {count > 0 && <span className="cart-count">{count} items</span>}
          </div>

          {lines.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={32} />
              <p>Your cart is empty. Add some items to get started.</p>
            </div>
          ) : (
            <>
              <div className="cart-lines">
                {lines.map((line) => (
                  <div className="cart-line" key={line.id}>
                    <div className="cart-line-info">
                      <h4>{line.name}</h4>
                      <span>${line.price.toFixed(2)} each</span>
                    </div>
                    <div className="cart-line-controls">
                      <button onClick={() => setQty(line.id, line.quantity - 1)}>
                        <Minus size={13} />
                      </button>
                      <span>{line.quantity}</span>
                      <button onClick={() => setQty(line.id, line.quantity + 1)}>
                        <Plus size={13} />
                      </button>
                      <span className="cart-line-total">${(line.price * line.quantity).toFixed(2)}</span>
                      <button className="cart-remove" onClick={() => remove(line.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <form className="checkout-form" onSubmit={handleSubmit}>
                <label>
                  <span>Name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(832) 555-0100"
                  />
                </label>
                <label>
                  <span>Pickup time</span>
                  <select required value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
                    <option value="" disabled>
                      Select a time
                    </option>
                    <option>ASAP (20-30 min)</option>
                    <option>In 45 minutes</option>
                    <option>In 1 hour</option>
                    <option>In 1.5 hours</option>
                    <option>In 2 hours</option>
                  </select>
                </label>
                <label>
                  <span>Notes (optional)</span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Extra salsa, no onion, etc."
                    rows={2}
                  />
                </label>
                {error && <p className="form-error">{error}</p>}
                <button className="btn btn-dark btn-block" type="submit" disabled={submitting}>
                  {submitting ? 'Placing order...' : `Place Order · $${subtotal.toFixed(2)}`}
                </button>
              </form>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}

function OrderMenuSection() {
  const [filter, setFilter] = useState('All');
  const grouped = categories.filter((c) => c !== 'All' && (filter === 'All' || filter === c));
  const filtered = filter === 'All' ? menuItems : menuItems.filter((i) => i.category === filter);
  return (
    <>
      <div className="order-filters">
        {categories.map((cat) => (
          <button key={cat} className={filter === cat ? 'selected' : ''} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>
      {grouped.map((cat) => (
        <section className="menu-cat" key={cat}>
          <h2>{cat}</h2>
          <div className="menu-grid">
            {filtered
              .filter((i) => i.category === cat)
              .map((item) => (
                <MenuRow key={item.id} item={item} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}

function StoryPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main>
      <section className="page-header story-header">
        <p className="eyebrow">Our Story</p>
        <h1>
          From our <em>cocina</em> to yours
        </h1>
        <p className="page-sub">El Alebrije started with a family, a stack of warm tortillas, and a big dream for Houston.</p>
      </section>

      <section className="story-body">
        <div className="story-image">
          <img src={images.garnish} alt="Fresh garnishes" />
        </div>
        <div className="story-text">
          <p>
            Our kitchen is inspired by the markets and mezcalerías of Oaxaca, but our heart is right here in Houston.
            Every plate is made for passing around, talking over, and ordering one more thing for the table.
          </p>
          <p>
            From our handmade tortillas to the Oaxacan quesillo brought in directly from Mexico, we want you to
            enjoy every bite of our authentic Oaxacan streetfood. There's no dress code, no secret handshake — just
            come as you are.
          </p>
          <button className="text-link" onClick={() => navigate('menu')}>
            See the menu <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="values-row">
        <div>
          <span>01</span>
          <h3>Made by hand</h3>
          <p>Tortillas, salsas, and memories included.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Big on flavor</h3>
          <p>Smoky, bright, spicy, never boring.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Always familia</h3>
          <p>There's room at our table for you.</p>
        </div>
      </section>
    </main>
  );
}

function VisitPage() {
  return (
    <main>
      <section className="page-header">
        <p className="eyebrow">Visit Us</p>
        <h1>
          Come find <em>us</em>
        </h1>
        <p className="page-sub">Pull up a chair. We saved you a spot.</p>
      </section>

      <section className="visit-grid">
        <div className="visit-info">
          <div className="visit-block">
            <MapPin size={20} />
            <div>
              <h3>Location</h3>
              <p>4816 N Shepherd Dr</p>
              <p>Houston, TX 77018</p>
              <p className="visit-note">Now at Farmboy Brewing Co.</p>
            </div>
          </div>
          <div className="visit-block">
            <Clock3 size={20} />
            <div>
              <h3>Hours</h3>
              <p>Wed–Thu: 4–9 PM</p>
              <p>Fri–Sat: 4–10 PM</p>
              <p>Sun: 1–7 PM</p>
              <p>Mon–Tue: Closed</p>
            </div>
          </div>
          <div className="visit-block">
            <Phone size={20} />
            <div>
              <h3>Contact</h3>
              <a href="tel:8325303421">832-530-3421</a>
            </div>
          </div>
        </div>
        <div className="visit-map">
          <img src={images.hero} alt="El Alebrije food" />
        </div>
      </section>

      <section className="catering-section">
        <div>
          <p className="eyebrow">Planning a party?</p>
          <h2>
            Catering that <em>shows up</em>
          </h2>
          <p className="intro-text">
            From office lunches to backyard celebrations, we bring the Oaxacan streetfood energy to your event.
          </p>
          <a href="tel:8325303421" className="text-link">
            Call us to arrange <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="footer">
      <div className="footer-col">
        <span className="footer-logo">El Alebrije</span>
        <p>Oaxacan Streetfood in Houston</p>
        <div className="footer-social">
          <Instagram size={18} />
          <span>@elalebrijehtx</span>
        </div>
      </div>
      <div className="footer-col">
        <h4>Explore</h4>
        <button onClick={() => navigate('menu')}>Menu</button>
        <button onClick={() => navigate('order')}>Order Online</button>
        <button onClick={() => navigate('story')}>Our Story</button>
        <button onClick={() => navigate('visit')}>Visit</button>
      </div>
      <div className="footer-col">
        <h4>Visit</h4>
        <p>4816 N Shepherd Dr</p>
        <p>Houston, TX 77018</p>
        <a href="tel:8325303421">832-530-3421</a>
      </div>
    </footer>
  );
}

function CartBar({ navigate }: { navigate: (p: Page) => void }) {
  const { count, subtotal } = useCart();
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const onPop = () => setPage(getPage());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (count === 0 || page === 'order') return null;

  return (
    <button className="cart-bar" onClick={() => navigate('order')}>
      <span className="cart-bar-count">
        <ShoppingBag size={16} /> {count} {count === 1 ? 'item' : 'items'}
      </span>
      <span className="cart-bar-view">
        View order · ${subtotal.toFixed(2)} <ArrowRight size={16} />
      </span>
    </button>
  );
}

export default App;
