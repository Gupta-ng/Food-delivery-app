import { useState, useEffect, useReducer } from "react";

const FOODS = [
  { _id:"1", name:"Margherita Pizza", image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", price:299, category:"Pizza", rating:4.8, time:"25 min", tag:"Bestseller", restaurant:"Pizza Palace" },
  { _id:"2", name:"Farmhouse Pizza", image:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", price:349, category:"Pizza", rating:4.6, time:"30 min", tag:"New", restaurant:"Pizza Palace" },
  { _id:"3", name:"Classic Burger", image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", price:149, category:"Burger", rating:4.5, time:"20 min", tag:"Popular", restaurant:"Burger Hub" },
  { _id:"4", name:"Cheese Burger", image:"https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80", price:179, category:"Burger", rating:4.7, time:"20 min", tag:"Spicy", restaurant:"Burger Hub" },
  { _id:"5", name:"Pasta Alfredo", image:"https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80", price:249, category:"Pasta", rating:4.4, time:"35 min", tag:"Creamy", restaurant:"Cafe Delight" },
  { _id:"6", name:"Cold Brew Coffee", image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", price:99, category:"Drinks", rating:4.9, time:"10 min", tag:"Fresh", restaurant:"Cafe Delight" },
  { _id:"7", name:"Pepperoni Pizza", image:"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80", price:379, category:"Pizza", rating:4.7, time:"30 min", tag:"Hot", restaurant:"Pizza Palace" },
  { _id:"8", name:"Pasta Arrabbiata", image:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80", price:229, category:"Pasta", rating:4.3, time:"30 min", tag:"Spicy", restaurant:"Cafe Delight" },
];

const RESTAURANTS = [
  { id:"pizza-palace", name:"Pizza Palace", image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", cuisine:"Italian · Pizza", rating:4.8, time:"25–35 min", minOrder:199 },
  { id:"burger-hub", name:"Burger Hub", image:"https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80", cuisine:"American · Burgers", rating:4.6, time:"20–30 min", minOrder:149 },
  { id:"cafe-delight", name:"Cafe Delight", image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&q=80", cuisine:"Cafe · Snacks · Drinks", rating:4.7, time:"15–25 min", minOrder:99 },
];

const SLIDES = [
  { img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=80", tag:"Today's Special", headline:"Handcrafted", highlight:"Flavours", sub:"Every dish made with love, delivered to your door." },
  { img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80", tag:"Fan Favourite", headline:"Juicy", highlight:"Burgers", sub:"Stack it your way with our secret sauce lineup." },
  { img:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=80", tag:"Cafe Series", headline:"Slow-Brewed", highlight:"Coffee", sub:"Artisan cold brews and light bites, made fresh." },
];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const ex = state.find(i => i._id === action.item._id);
      if (ex) return state.map(i => i._id === action.item._id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE": return state.filter(i => i._id !== action.id);
    case "UPDATE_QTY": return action.qty < 1 ? state.filter(i => i._id !== action.id) : state.map(i => i._id === action.id ? { ...i, qty: action.qty } : i);
    case "CLEAR": return [];
    default: return state;
  }
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --cream: #faf7f2; --warm: #f5efe6; --dark: #1c1812; --brown: #6b4c2a;
    --accent: #c8813a; --accent2: #e8a45a; --muted: #9e8e7e; --border: #ede8e0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--dark); }
  .foodie-nav { background: var(--cream); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
  .foodie-nav-inner { max-width: 980px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .foodie-logo { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 22px; color: var(--dark); cursor: pointer; }
  .foodie-logo span { color: var(--accent); }
  .foodie-nav-links { display: flex; gap: 4px; align-items: center; }
  .fnl { padding: 7px 15px; border-radius: 30px; border: none; background: none; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--muted); font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .fnl:hover, .fnl.active { background: var(--warm); color: var(--dark); }
  .fcart-btn { display: flex; align-items: center; gap: 7px; padding: 9px 20px; background: var(--dark); color: #faf7f2; border: none; border-radius: 30px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif; position: relative; transition: background .2s; }
  .fcart-btn:hover { background: #2e2820; }
  .fcart-badge { position: absolute; top: -5px; right: -5px; background: var(--accent); color: #fff; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .fhero { background: var(--dark); min-height: 440px; display: flex; align-items: stretch; overflow: hidden; }
  .fhero-left { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 64px 48px; position: relative; z-index: 2; }
  .fhero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(200,129,58,.15); color: var(--accent2); font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid rgba(200,129,58,.2); width: fit-content; }
  .fhero-h { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: #faf7f2; line-height: 1.05; margin-bottom: 16px; letter-spacing: -1.5px; }
  .fhero-h span { color: var(--accent2); font-style: italic; }
  .fhero-sub { font-size: 15px; color: rgba(250,247,242,.6); margin-bottom: 32px; font-weight: 300; max-width: 380px; line-height: 1.7; }
  .fhero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
  .fbtn-pri { padding: 13px 28px; background: var(--accent); color: #fff; border: none; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .fbtn-pri:hover { background: var(--accent2); }
  .fbtn-sec { padding: 13px 28px; background: transparent; color: rgba(250,247,242,.8); border: 1px solid rgba(250,247,242,.2); border-radius: 30px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .fbtn-sec:hover { border-color: rgba(250,247,242,.5); color: #faf7f2; }
  .fhero-stats { display: flex; gap: 28px; }
  .fhero-stat-n { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #faf7f2; }
  .fhero-stat-l { font-size: 11px; color: rgba(250,247,242,.5); text-transform: uppercase; letter-spacing: .8px; }
  .fhero-right { width: 44%; position: relative; overflow: hidden; }
  .fhero-img { width: 100%; height: 100%; object-fit: cover; opacity: .7; filter: sepia(20%); display: block; }
  .fhero-dots { position: absolute; bottom: 28px; right: 28px; display: flex; gap: 6px; }
  .fhdot { width: 6px; height: 6px; border-radius: 50%; background: rgba(250,247,242,.3); cursor: pointer; border: none; transition: all .2s; }
  .fhdot.active { background: var(--accent2); width: 18px; border-radius: 3px; }
  .fsection { max-width: 980px; margin: 0 auto; padding: 56px 24px; }
  .fsec-label { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .fsec-h { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: var(--dark); margin-bottom: 6px; line-height: 1.2; letter-spacing: -.5px; }
  .fsec-sub { font-size: 14px; color: var(--muted); margin-bottom: 36px; }
  .fdivider { width: 48px; height: 3px; background: var(--accent); border-radius: 2px; margin-bottom: 32px; }
  .fgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
  .fcard { background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); transition: transform .25s, box-shadow .25s; cursor: pointer; }
  .fcard:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(107,76,42,.12); }
  .fcard-img-wrap { position: relative; height: 190px; overflow: hidden; background: #f0ebe3; }
  .fcard-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; display: block; }
  .fcard:hover .fcard-img { transform: scale(1.06); }
  .fcard-tag { position: absolute; top: 12px; left: 12px; background: var(--dark); color: var(--accent2); font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 12px; letter-spacing: .5px; text-transform: uppercase; }
  .fcard-body { padding: 16px 18px 18px; }
  .fcard-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
  .fcard-meta { font-size: 12px; color: var(--muted); margin-bottom: 14px; }
  .fcard-footer { display: flex; justify-content: space-between; align-items: center; }
  .fprice { font-size: 19px; font-weight: 700; color: var(--accent); font-family: 'Playfair Display', serif; }
  .fadd-btn { padding: 8px 16px; background: var(--dark); color: #faf7f2; border: none; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .fadd-btn:hover { background: var(--accent); }
  .fbg-warm { background: var(--warm); }
  .frcard { display: flex; background: #fff; border-radius: 18px; overflow: hidden; border: 1px solid var(--border); cursor: pointer; transition: transform .2s, box-shadow .2s; }
  .frcard:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(107,76,42,.1); }
  .frcard-img { width: 110px; height: 100px; object-fit: cover; flex-shrink: 0; display: block; }
  .frcard-info { padding: 14px 16px; }
  .frcard-name { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 3px; }
  .frcard-cuis { font-size: 12px; color: var(--muted); margin-bottom: 8px; }
  .frpill { background: var(--warm); color: var(--brown); padding: 3px 9px; border-radius: 10px; font-size: 11px; font-weight: 500; }
  .fhow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
  .fhow-card { background: #fff; border-radius: 18px; padding: 28px 24px; border: 1px solid var(--border); position: relative; overflow: hidden; }
  .fhow-num { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: var(--border); position: absolute; top: 10px; right: 16px; line-height: 1; }
  .fhow-icon { width: 44px; height: 44px; background: var(--warm); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 14px; }
  .fhow-t { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--dark); }
  .fhow-s { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .ffilter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; align-items: center; }
  .ffpill { padding: 8px 18px; border-radius: 24px; border: 1px solid var(--border); background: #fff; cursor: pointer; font-size: 13px; font-weight: 500; transition: all .18s; font-family: 'DM Sans', sans-serif; color: var(--muted); }
  .ffpill:hover, .ffpill.active { background: var(--dark); color: #faf7f2; border-color: var(--dark); }
  .fsearch-i { flex: 1; max-width: 300px; padding: 9px 16px; border-radius: 24px; border: 1px solid var(--border); font-size: 13px; outline: none; background: #fff; font-family: 'DM Sans', sans-serif; }
  .fsearch-i:focus { border-color: var(--accent); }
  .fcart-page { max-width: 760px; margin: 0 auto; padding: 40px 24px; }
  .fci { display: flex; gap: 16px; background: #fff; border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border); align-items: center; }
  .fci-img { width: 72px; height: 60px; object-fit: cover; border-radius: 12px; flex-shrink: 0; }
  .fqb { background: var(--warm); border: none; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; color: var(--dark); transition: background .15s; }
  .fqb:hover { background: var(--border); }
  .fsummary-box { background: #fff; border-radius: 16px; padding: 22px; border: 1px solid var(--border); }
  .fsum-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: var(--muted); }
  .fsum-total { border-top: 1px solid var(--border); padding-top: 14px; display: flex; justify-content: space-between; font-weight: 700; font-size: 18px; font-family: 'Playfair Display', serif; color: var(--dark); }
  .fcheckout-btn { width: 100%; background: var(--dark); color: #faf7f2; border: none; border-radius: 30px; padding: 15px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 16px; font-family: 'DM Sans', sans-serif; transition: background .2s; }
  .fcheckout-btn:hover { background: #2e2820; }
  .fform-page { max-width: 420px; margin: 40px auto; padding: 0 24px; }
  .fform-card { background: #fff; border-radius: 24px; padding: 40px; border: 1px solid var(--border); }
  .ff-input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border); font-size: 14px; margin-bottom: 14px; outline: none; transition: border-color .2s; background: var(--cream); font-family: 'DM Sans', sans-serif; }
  .ff-input:focus { border-color: var(--accent); }
  .ff-btn { width: 100%; background: var(--dark); color: #faf7f2; border: none; border-radius: 30px; padding: 14px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s; }
  .ff-btn:hover { background: #2e2820; }
  .ftoast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--dark); color: #faf7f2; padding: 12px 24px; border-radius: 30px; font-size: 13px; font-weight: 600; z-index: 9999; box-shadow: 0 8px 32px rgba(28,24,18,.3); white-space: nowrap; animation: fslideUp .3s ease; }
  @keyframes fslideUp { from { opacity: 0; transform: translate(-50%, 16px); } to { opacity: 1; transform: translate(-50%, 0); } }
  .ffooter { background: var(--dark); color: rgba(250,247,242,.5); padding: 48px 24px 32px; }
  .ffooter-inner { max-width: 980px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 32px; }
  .ffooter-bot { max-width: 980px; margin: 32px auto 0; border-top: 1px solid rgba(250,247,242,.08); padding-top: 20px; text-align: center; font-size: 12px; color: rgba(250,247,242,.25); }
  .fempty { text-align: center; padding: 60px 24px; color: var(--muted); }
  .ftest-card { background: var(--cream); border-radius: 16px; padding: 22px; border: 1px solid var(--border); }
  @media (max-width: 700px) {
    .fhero { flex-direction: column; }
    .fhero-left { padding: 36px 24px; }
    .fhero-h { font-size: 34px; }
    .fhero-right { width: 100%; height: 200px; }
    .foodie-nav-links .fnl:not(.fcart-btn) { display: none; }
  }
`;

export default function FoodieApp() {
  const [page, setPage] = useState("home");
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [user, setUser] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [menuSearch, setMenuSearch] = useState("");
  const [menuCat, setMenuCat] = useState("All");
  const [menuRestro, setMenuRestro] = useState(null);
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg, warn = false) => {
    setToast({ msg, warn });
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
    showToast(`${item.name} added to cart`);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const goMenu = (restroId = null) => {
    setMenuRestro(restroId);
    setMenuCat("All");
    setMenuSearch("");
    setPage("menu");
  };

  const slide = SLIDES[heroIdx];
  const categories = ["All", ...new Set(FOODS.map(f => f.category))];
  const displayFoods = FOODS
    .filter(f => !menuRestro || f.restaurant === RESTAURANTS.find(r => r.id === menuRestro)?.name)
    .filter(f => menuCat === "All" || f.category === menuCat)
    .filter(f => f.name.toLowerCase().includes(menuSearch.toLowerCase()));

  const FoodCard = ({ food }) => (
    <div className="fcard">
      <div className="fcard-img-wrap">
        <img src={food.image} alt={food.name} className="fcard-img"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=60"; }} />
        <span className="fcard-tag">{food.tag}</span>
      </div>
      <div className="fcard-body">
        <div className="fcard-name">{food.name}</div>
        <div className="fcard-meta">
          <span style={{ color: "#d4a053" }}>★</span> {food.rating} &nbsp;·&nbsp; ⏱ {food.time} &nbsp;·&nbsp; {food.restaurant}
        </div>
        <div className="fcard-footer">
          <span className="fprice">₹{food.price}</span>
          <button className="fadd-btn" onClick={e => { e.stopPropagation(); addToCart(food); }}>+ Add</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div>
        {/* Navbar */}
        <nav className="foodie-nav">
          <div className="foodie-nav-inner">
            <div className="foodie-logo" onClick={() => setPage("home")}><span>✦</span> Foodie</div>
            <div className="foodie-nav-links">
              {[["Home","home"],["Menu","menu"]].map(([n,p]) => (
                <button key={p} className={`fnl${page===p?" active":""}`} onClick={() => p==="menu"?goMenu():setPage(p)}>{n}</button>
              ))}
              {user ? (
                <>
                  <span className="fnl" style={{color:"var(--muted)"}}>👤 {user.name}</span>
                  <button className="fnl" onClick={() => { setUser(null); showToast("Logged out"); }}>Logout</button>
                </>
              ) : (
                <>
                  <button className={`fnl${page==="login"?" active":""}`} onClick={() => setPage("login")}>Login</button>
                  <button className={`fnl${page==="register"?" active":""}`} onClick={() => setPage("register")}>Register</button>
                </>
              )}
              <button className="fcart-btn" onClick={() => setPage("cart")}>
                🛒 Cart {cartCount > 0 && <span className="fcart-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </nav>

        {/* HOME */}
        {page === "home" && (
          <>
            <div className="fhero">
              <div className="fhero-left">
                <div className="fhero-tag">✦ {slide.tag}</div>
                <h1 className="fhero-h">{slide.headline}<br /><span>{slide.highlight}</span></h1>
                <p className="fhero-sub">{slide.sub}</p>
                <div className="fhero-btns">
                  <button className="fbtn-pri" onClick={() => goMenu()}>Order Now</button>
                  <button className="fbtn-sec" onClick={() => goMenu()}>See Menu</button>
                </div>
                <div className="fhero-stats">
                  {[["50+","Items"],["4.8★","Rating"],["30min","Delivery"]].map(([n,l]) => (
                    <div key={l}>
                      <div className="fhero-stat-n">{n}</div>
                      <div className="fhero-stat-l">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fhero-right">
                <img src={slide.img} alt="hero" className="fhero-img"
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=60"; }} />
                <div className="fhero-dots">
                  {SLIDES.map((_, i) => (
                    <button key={i} className={`fhdot${heroIdx===i?" active":""}`} onClick={() => setHeroIdx(i)} />
                  ))}
                </div>
              </div>
            </div>

            <div className="fbg-warm">
              <div className="fsection">
                <div className="fsec-label">Simple process</div>
                <div className="fsec-h">How Foodie works</div>
                <div className="fdivider" />
                <div className="fhow-grid">
                  {[["📍","01","Choose Location","Enter your address, discover nearby restaurants"],
                    ["🍽️","02","Pick Your Food","Browse menus, filter by cuisine, add favourites"],
                    ["🚴","03","Fast Delivery","Track your order live — delivered hot, every time"]
                  ].map(([icon,num,t,s]) => (
                    <div key={num} className="fhow-card">
                      <div className="fhow-num">{num}</div>
                      <div className="fhow-icon">{icon}</div>
                      <div className="fhow-t">{t}</div>
                      <div className="fhow-s">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fsection">
              <div className="fsec-label">This week's picks</div>
              <div className="fsec-h">Featured dishes</div>
              <p className="fsec-sub">Freshly prepared, highly rated</p>
              <div className="fgrid">
                {FOODS.slice(0, 6).map(f => <FoodCard key={f._id} food={f} />)}
              </div>
              <div style={{textAlign:"center",marginTop:32}}>
                <button className="fbtn-pri" onClick={() => goMenu()}>View full menu →</button>
              </div>
            </div>

            <div className="fbg-warm">
              <div className="fsection">
                <div className="fsec-label">Places to order from</div>
                <div className="fsec-h">Our restaurants</div>
                <p className="fsec-sub">Top-rated partners ready to deliver</p>
                <div className="fgrid">
                  {RESTAURANTS.map(r => (
                    <div key={r.id} className="frcard" onClick={() => goMenu(r.id)}>
                      <img src={r.image} alt={r.name} className="frcard-img"
                        onError={e => { e.target.src = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=60"; }} />
                      <div className="frcard-info">
                        <div className="frcard-name">{r.name}</div>
                        <div className="frcard-cuis">{r.cuisine}</div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          {["★ "+r.rating, "⏱ "+r.time, "Min ₹"+r.minOrder].map(v => (
                            <span key={v} className="frpill">{v}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fsection">
              <div className="fsec-label">Reviews</div>
              <div className="fsec-h">What people say</div>
              <p className="fsec-sub">Real stories from real customers</p>
              <div className="fgrid">
                {[{n:"Priya S.",t:"Food arrives hot every time. The packaging is beautiful. Foodie is the only app I use.",s:5},
                  {n:"Rahul K.",t:"Ordered Margherita at midnight — perfect. Genuinely the best home delivery experience.",s:5},
                  {n:"Ananya M.",t:"Cold brew coffee + Pasta Alfredo under 25 minutes. I'm completely hooked.",s:4}
                ].map(({n,t,s}) => (
                  <div key={n} className="ftest-card">
                    <div style={{color:"#d4a053",fontSize:15,marginBottom:10,letterSpacing:2}}>{"★".repeat(s)}</div>
                    <p style={{fontSize:14,color:"var(--dark)",lineHeight:1.7,marginBottom:12,fontStyle:"italic"}}>"{t}"</p>
                    <div style={{fontSize:12,fontWeight:600,color:"var(--accent)",letterSpacing:".5px"}}>— {n}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* MENU */}
        {page === "menu" && (
          <div className="fsection">
            <div className="fsec-label">{menuRestro ? RESTAURANTS.find(r=>r.id===menuRestro)?.name : "Full menu"}</div>
            <div className="fsec-h">{menuRestro ? "Menu — "+RESTAURANTS.find(r=>r.id===menuRestro)?.name : "All dishes"}</div>
            <div className="fdivider" />
            <div className="ffilter-row">
              <input className="fsearch-i" placeholder="Search dishes..." value={menuSearch} onChange={e=>setMenuSearch(e.target.value)} />
              {categories.map(c => (
                <button key={c} className={`ffpill${menuCat===c?" active":""}`} onClick={() => setMenuCat(c)}>{c}</button>
              ))}
              {menuRestro && <button className="ffpill" style={{color:"var(--muted)"}} onClick={() => setMenuRestro(null)}>✕ Clear</button>}
            </div>
            {displayFoods.length === 0 ? (
              <div className="fempty">
                <div style={{fontSize:48,marginBottom:12}}>🍽️</div>
                <div style={{fontSize:17,fontWeight:600,color:"var(--dark)"}}>Nothing found</div>
                <div style={{fontSize:13,marginTop:6}}>Try another search or category</div>
              </div>
            ) : (
              <div className="fgrid">{displayFoods.map(f => <FoodCard key={f._id} food={f} />)}</div>
            )}
          </div>
        )}

        {/* CART */}
        {page === "cart" && (
          <div className="fcart-page">
            {orderPlaced ? (
              <div className="fempty" style={{paddingTop:60}}>
                <div style={{fontSize:64,marginBottom:16}}>✦</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"var(--dark)",marginBottom:10}}>Order placed!</div>
                <div style={{fontSize:14,color:"var(--muted)",marginBottom:28}}>Estimated delivery: 30 minutes</div>
                <button className="fbtn-pri" onClick={() => { setOrderPlaced(false); setPage("home"); }}>Back to home</button>
              </div>
            ) : (
              <>
                <div className="fsec-label">Your order</div>
                <div className="fsec-h">{cartCount > 0 ? cartCount+" item"+(cartCount>1?"s":"")+" in cart" : "Your cart"}</div>
                <div className="fdivider" />
                {cart.length === 0 ? (
                  <div className="fempty">
                    <div style={{fontSize:48,marginBottom:14}}>🛒</div>
                    <div style={{fontSize:17,fontWeight:600,color:"var(--dark)",marginBottom:8}}>Nothing here yet</div>
                    <div style={{fontSize:13,marginBottom:24}}>Add something delicious</div>
                    <button className="fbtn-pri" onClick={() => goMenu()}>Browse menu</button>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item._id} className="fci">
                        <img src={item.image} alt={item.name} className="fci-img"
                          onError={e => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=60"; }} />
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600,fontSize:14,color:"var(--dark)"}}>{item.name}</div>
                          <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>₹{item.price} each</div>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <button className="fqb" onClick={() => dispatch({type:"UPDATE_QTY",id:item._id,qty:item.qty-1})}>−</button>
                          <span style={{fontWeight:700,fontSize:14,minWidth:20,textAlign:"center",color:"var(--dark)"}}>{item.qty}</span>
                          <button className="fqb" onClick={() => dispatch({type:"UPDATE_QTY",id:item._id,qty:item.qty+1})}>+</button>
                          <span style={{fontWeight:700,fontSize:14,minWidth:52,textAlign:"right",color:"var(--dark)"}}>₹{item.price*item.qty}</span>
                          <button style={{background:"none",border:"none",color:"var(--border)",cursor:"pointer",fontSize:18,marginLeft:4}} onClick={() => dispatch({type:"REMOVE",id:item._id})}>✕</button>
                        </div>
                      </div>
                    ))}
                    <div className="fsummary-box" style={{marginTop:8}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"var(--dark)",marginBottom:16}}>Order summary</div>
                      {[["Subtotal","₹"+cartTotal],["Delivery fee","₹40"],["Tax (5%)","₹"+Math.round(cartTotal*.05)]].map(([k,v]) => (
                        <div key={k} className="fsum-row"><span>{k}</span><span>{v}</span></div>
                      ))}
                      <div className="fsum-total"><span>Total</span><span style={{color:"var(--accent)"}}>₹{cartTotal+40+Math.round(cartTotal*.05)}</span></div>
                      <button className="fcheckout-btn" onClick={() => {
                        if (!user) { showToast("Please login first", true); setPage("login"); return; }
                        dispatch({ type: "CLEAR" }); setOrderPlaced(true);
                      }}>Place Order →</button>
                      {!user && <p style={{textAlign:"center",fontSize:11,color:"var(--muted)",marginTop:8}}>Login required to checkout</p>}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* AUTH */}
        {(page === "login" || page === "register") && (
          <div className="fform-page">
            <div className="fform-card">
              <div className="fsec-label">{page==="login"?"Welcome back":"Create account"}</div>
              <div className="fsec-h" style={{marginBottom:6}}>{page==="login"?"Sign in ✦":"Join Foodie ✦"}</div>
              <div className="fdivider" />
              {page === "register" && (
                <input className="ff-input" placeholder="Full name" value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})} />
              )}
              <input className="ff-input" type="email" placeholder="Email address" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} />
              <input className="ff-input" type="password" placeholder="Password" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} />
              <button className="ff-btn" onClick={() => {
                if (page === "login") {
                  setUser({ name: authForm.email.split("@")[0], email: authForm.email });
                  showToast("Welcome back!");
                } else {
                  setUser({ name: authForm.name, email: authForm.email });
                  showToast("Welcome, "+authForm.name+"!");
                }
                setAuthForm({ name:"", email:"", password:"" });
                setPage("home");
              }}>{page==="login"?"Sign In →":"Create Account →"}</button>
              <p style={{textAlign:"center",marginTop:16,fontSize:13,color:"var(--muted)"}}>
                {page==="login"?"Don't have an account? ":"Already have an account? "}
                <span style={{color:"var(--accent)",cursor:"pointer",fontWeight:600}} onClick={() => setPage(page==="login"?"register":"login")}>
                  {page==="login"?"Register":"Sign In"}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="ffooter">
          <div className="ffooter-inner">
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:24,color:"#faf7f2",marginBottom:10}}>
                <span style={{color:"var(--accent2)"}}>✦</span> Foodie
              </div>
              <p style={{fontSize:13,color:"rgba(250,247,242,.4)",lineHeight:1.8}}>Delivering happiness,<br/>one meal at a time.</p>
            </div>
            {[["Quick Links",[["Home",()=>setPage("home")],["Menu",()=>goMenu()],["Cart",()=>setPage("cart")]]],
              ["Account",[["Login",()=>setPage("login")],["Register",()=>setPage("register")]]]
            ].map(([title,links]) => (
              <div key={title}>
                <div style={{fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"rgba(250,247,242,.3)",marginBottom:14}}>{title}</div>
                {links.map(([n,fn]) => (
                  <div key={n} style={{fontSize:13,color:"rgba(250,247,242,.4)",cursor:"pointer",marginBottom:8,transition:"color .2s"}} onClick={fn}>{n}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="ffooter-bot">© {new Date().getFullYear()} Foodie · All rights reserved</div>
        </footer>

        {toast && (
          <div className="ftoast" style={toast.warn ? {background:"var(--accent)"} : {}}>
            {toast.warn ? "⚠ " : "✓ "}{toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
