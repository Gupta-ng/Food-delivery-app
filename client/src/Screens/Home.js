// client/src/screens/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Pizza', 'Burger', 'Pasta'];
const featuredFoods = [
  {
    name: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    price: '₹299',
    category: 'Pizza',
  },
  {
    name: 'Veg Burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    price: '₹149',
    category: 'Burger',
  },
  {
    name: 'Pasta Alfredo',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // Updated to a working image
    price: '₹249',
    category: 'Pasta',
  },
];

// Sample restaurants/cafes data
const places = [
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // New tested image
    cuisine: 'Italian, Pizza',
  },
  {
    id: 'burger-hub',
    name: 'Burger Hub',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    cuisine: 'American, Burgers',
  },
  {
    id: 'cafe-delight',
    name: 'Cafe Delight',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    cuisine: 'Cafe, Snacks',
  },
];

// Hero background images for slider
const heroImages = [
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504674900247-1b1c7c8e1b1c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=1200&q=80',
];

const Home = () => {
  const username = localStorage.getItem('username');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredFoods = selectedCategory === 'All'
    ? featuredFoods
    : featuredFoods.filter(food => food.category === selectedCategory);

  const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroImages.length);
  const prevHero = () => setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Smooth scroll to featured foods
  const scrollToFoods = () => {
    document.getElementById('featured-foods').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Animated Hero Section with animated background overlay and slider */}
      <div style={{
        position: 'relative',
        minHeight: '60vh',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Crossfade Images */}
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0}}>
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Food Hero"
              onError={e => {e.target.onerror=null;e.target.src='https://via.placeholder.com/1200x600?text=Image+Not+Found';}}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: heroIndex === idx ? 1 : 0,
                transition: 'opacity 0.7s cubic-bezier(.4,2,.6,1)',
                zIndex: heroIndex === idx ? 2 : 0,
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
        {/* Arrow controls */}
        <button onClick={prevHero} style={{position:'absolute',left:20,top:'50%',transform:'translateY(-50%)',zIndex:3,background:'rgba(0,0,0,0.3)',border:'none',borderRadius:'50%',width:40,height:40,color:'#fff',fontSize:'2rem',cursor:'pointer'}} aria-label="Previous image">{'<'}</button>
        <button onClick={nextHero} style={{position:'absolute',right:20,top:'50%',transform:'translateY(-50%)',zIndex:3,background:'rgba(0,0,0,0.3)',border:'none',borderRadius:'50%',width:40,height:40,color:'#fff',fontSize:'2rem',cursor:'pointer'}} aria-label="Next image">{'>'}</button>
        {/* Animated overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          <div className="animated-bg-gradient"></div>
        </div>
        <div style={{
          background: 'rgba(40,167,69,0.7)',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          textAlign: 'center',
          zIndex: 3,
        }}>
          <h1 className="animated-headline" style={{fontWeight:'bold',fontSize:'3rem'}}>Delicious Food Delivered Fast</h1>
          <p style={{fontSize:'1.3rem'}}>Order your favorite meals and get them delivered to your doorstep!</p>
          <button className="btn btn-light btn-lg mt-3" onClick={scrollToFoods}>See Featured Foods</button>
          <Link to="/menu" className="btn btn-success btn-lg mt-3 ms-2">Order Now</Link>
        </div>
      </div>

      {/* Tagline Section */}
      <div className="container text-center mt-4">
        <h4 className="text-secondary">Fresh, Fast, and Flavorful – Your favorite meals delivered with love!</h4>
      </div>

      {/* Category Filter Dropdown & Search Bar */}
      <div className="container text-center mt-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        <select
          className="form-select w-auto d-inline-block"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{minWidth:'180px'}}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          className="form-control w-auto d-inline-block"
          style={{maxWidth:'250px'}}
          placeholder="Search food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-success" onClick={scrollToFoods}>Search</button>
      </div>

      {/* Featured Foods Section */}
      <div className="container mt-5" id="featured-foods">
        <h2 className="mb-4 text-success">Featured Foods</h2>
        <div className="row">
          {filteredFoods.filter(food => food.name.toLowerCase().includes(search.toLowerCase())).map((food, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm food-card">
                <img src={food.image} className="card-img-top" alt={food.name} style={{height:'200px',objectFit:'cover'}} onError={e => {e.target.onerror=null;e.target.src='https://via.placeholder.com/400x200?text=Image+Not+Found';}} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{food.name}</h5>
                    <p className="card-text text-success" style={{fontWeight:'bold'}}>{food.price}</p>
                  </div>
                  <button className="btn btn-success mt-2 w-100" onClick={() => alert(`${food.name} added to cart!`)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurants & Cafes Section */}
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Restaurants & Cafes</h2>
        <div className="row">
          {places.map((place, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm restro-card">
                <img src={place.image} className="card-img-top" alt={place.name} style={{height:'180px',objectFit:'cover'}} onError={e => {e.target.onerror=null;e.target.src='https://via.placeholder.com/400x180?text=Image+Not+Found';}} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{place.name}</h5>
                    <p className="card-text text-muted">{place.cuisine}</p>
                  </div>
                  <Link to={`/menu/${place.id}`} className="btn btn-outline-primary mt-2 w-100">Order Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mt-5 mb-5">
        <h3 className="mb-4 text-primary">What Our Customers Say</h3>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <p>"Amazing food and super quick delivery! Highly recommend Foodie."</p>
              <span className="text-success">- Priya S.</span>
              <div className="mt-2">
                {[...Array(5)].map((_,i) => <span key={i} style={{color:'#ffc107',fontSize:'1.2rem'}}>★</span>)}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <p>"Great variety and always fresh. My go-to for ordering food online."</p>
              <span className="text-success">- Rahul K.</span>
              <div className="mt-2">
                {[...Array(5)].map((_,i) => <span key={i} style={{color:'#ffc107',fontSize:'1.2rem'}}>★</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-light text-center py-3 mt-auto">
        <span className="text-muted">&copy; {new Date().getFullYear()} Foodie. All rights reserved.</span>
      </footer>

      {/* Styles for animation and cards */}
      <style>{`
        .animated-headline {
          animation: fadeInDown 1.2s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animated-bg-gradient {
          width: 100vw;
          height: 100vh;
          background: radial-gradient(circle at 20% 40%, rgba(40,167,69,0.15) 0%, transparent 70%),
                      radial-gradient(circle at 80% 60%, rgba(40,167,69,0.12) 0%, transparent 70%),
                      linear-gradient(120deg, rgba(40,167,69,0.08) 0%, transparent 100%);
          animation: moveBg 8s linear infinite alternate;
          position: absolute;
          top: 0; left: 0;
        }
        @keyframes moveBg {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(1.1) translateY(-20px); opacity: 0.95; }
        }
        .food-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(40,167,69,0.15);
          transition: all 0.2s;
        }
        .restro-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(0,123,255,0.15);
          transition: all 0.2s;
        }
        .btn.active {
          background-color: #28a745;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Home;
