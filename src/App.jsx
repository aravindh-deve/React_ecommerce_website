import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiHeart,
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiStar
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./App.css";

function App() {

  const [headerSearch, setHeaderSearch] = useState("");

  const handleHomeSearch = () => {
    const query = headerSearch.trim();

    if (query) {
      window.location.href = `/category?search=${encodeURIComponent(query)}`;
    }
  };

  const [cartCount, setCartCount] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("luxe-cart") || "[]");
      return cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("luxe-cart") || "[]");
        const total = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const addToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("luxe-cart") || "[]");
      const price = Number(String(product.price).replace(/[^0-9.]/g, "")) || 0;
      const existingItem = cart.find((item) => item.name === product.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
          price,
          id: product.id || product.name
        });
      }

      localStorage.setItem("luxe-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    }
  };

  const categories = [
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"
    },
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
      name: "Watches",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=600"
    },
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Sneakers",
      price: "$129",
      oldPrice: "$169",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
    },
    {
      id: 2,
      name: "Luxury Watch",
      price: "$249",
      oldPrice: "$299",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700"
    },
    {
      id: 3,
      name: "Classic Jacket",
      price: "$179",
      oldPrice: "$220",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"
    },
    {
      id: 4,
      name: "Modern Sunglasses",
      price: "$89",
      oldPrice: "$120",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700"
    },
    {
      id: 5,
      name: "Leather Bag",
      price: "$199",
      oldPrice: "$249",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"
    }
  ];

  const newProducts = [
    {
      name: "Urban Hoodie",
      price: "$99",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700"
    },
    {
      name: "White Sneakers",
      price: "$119",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700"
    },
    {
      name: "Elegant Handbag",
      price: "$159",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700"
    },
    {
      name: "Classic Shirt",
      price: "$79",
      image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=700"
    }
  ];

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">

        <div className="logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="/collection">Collections</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="header-actions">

          <div className="header-search" role="search">
            <input
              type="search"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleHomeSearch();
                }
              }}
              placeholder="Search products"
              aria-label="Search products"
            />
          </div>

          <button
            onClick={() => (window.location.href = "/login")}
            type="button"
          >
            <FiUser />
          </button>

          <button
            className="bag"
            onClick={() => (window.location.href = "/cart")}
            type="button"
          >
            <FiShoppingBag />
            <span>{cartCount}</span>
          </button>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="hero" id="home">

        <div className="hero-blur blur-one"></div>
        <div className="hero-blur blur-two"></div>

        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          loop
          className="hero-swiper"
        >

          <SwiperSlide>

            <div className="hero-content">

              <div className="hero-text">

                <span className="small-title">
                  NEW COLLECTION 2026
                </span>

                <h1>
                  Elevate Your
                  <br />
                  <span>Everyday Style.</span>
                </h1>

                <p>
                  Discover premium fashion crafted for those
                  who appreciate timeless style and modern luxury.
                </p>

                <div className="hero-buttons">

                  <button
                    className="primary-btn"
                    onClick={() => (window.location.href = "/collection")}
                    type="button"
                  >
                    Shop Collection
                    <FiArrowRight />
                  </button>

                  <button
                    className="glass-btn"
                    onClick={() => (window.location.href = "/collection")}
                    type="button"
                  >
                    Explore
                  </button>

                </div>

              </div>

              <div className="hero-image">

                <div className="floating-card">
                  <FiStar />
                  <div>
                    <strong>4.9/5</strong>
                    <small>Customer Rating</small>
                  </div>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000"
                  alt="Fashion"
                />

              </div>

            </div>

          </SwiperSlide>


          <SwiperSlide>

            <div className="hero-content">

              <div className="hero-text">

                <span className="small-title">
                  PREMIUM COLLECTION
                </span>

                <h1>
                  Designed For
                  <br />
                  <span>Modern Living.</span>
                </h1>

                <p>
                  Premium essentials designed to make
                  every moment feel extraordinary.
                </p>

                <button className="primary-btn">
                  Discover Now
                  <FiArrowRight />
                </button>

              </div>

              <div className="hero-image">

                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
                  alt="Fashion collection"
                />

              </div>

            </div>

          </SwiperSlide>

        </Swiper>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="section" id="categories">

        <div className="section-heading">

          <div>
            <span>EXPLORE</span>
            <h2>Shop By Category</h2>
          </div>

          <button className="view-btn">
            View All <FiArrowRight />
          </button>

        </div>

        <div className="category-grid">

          {categories.map((category, index) => (

            <div className="category-card" key={index}>

              <img src={category.image} alt={category.name} />

              <div className="category-overlay">

                <h3>{category.name}</h3>

                <button>
                  Shop Now <FiArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= TRENDING ================= */}

      <section className="section trending-section" id="trending">

        <div className="section-heading">

          <div>
            <span>CURATED FOR YOU</span>
            <h2>Trending Now</h2>
          </div>

          <div className="swiper-buttons">
            <button className="trend-prev">←</button>
            <button className="trend-next">→</button>
          </div>

        </div>


        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".trend-prev",
            nextEl: ".trend-next"
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            600: {
              slidesPerView: 2
            },
            900: {
              slidesPerView: 3
            },
            1200: {
              slidesPerView: 4
            }
          }}
        >

          {products.map(product => (

            <SwiperSlide key={product.id}>

              <div className="product-card">

                <div className="product-image">

                  <span className="discount">
                    SALE
                  </span>

                  <button className="wishlist">
                    <FiHeart />
                  </button>

                  <img src={product.image} alt={product.name} />

                  <button className="quick-add" type="button" onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>

                </div>

                <div className="product-info">

                  <div className="rating">
                    <FiStar />
                    {product.rating}
                  </div>

                  <h3>{product.name}</h3>

                  <div className="price">

                    <strong>{product.price}</strong>

                    <del>{product.oldPrice}</del>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </section>


      {/* ================= PROMO ================= */}

      <section className="promo-section">

        <div className="promo-glow"></div>

        <div className="promo-content">

          <span>LIMITED TIME OFFER</span>

          <h2>
            Luxury Looks.
            <br />
            <strong>Better Prices.</strong>
          </h2>

          <p>
            Get up to 40% off selected premium collections.
          </p>

          <button
            className="primary-btn"
            onClick={() => (window.location.href = "/category")}
            type="button"
          >
            Shop The Sale
            <FiArrowRight />
          </button>

        </div>

        <div className="promo-image">

          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000"
            alt="Sale"
          />

        </div>

      </section>


      {/* ================= NEW ARRIVALS ================= */}

      <section className="section" id="new">

        <div className="section-heading">

          <div>
            <span>JUST DROPPED</span>
            <h2>New Arrivals</h2>
          </div>

          <button className="view-btn">
            Explore All <FiArrowRight />
          </button>

        </div>


        <div className="new-grid">

          {newProducts.map((product, index) => (

            <div className="new-card" key={index}>

              <div className="new-image">

                <span>NEW</span>

                <button>
                  <FiHeart />
                </button>

                <img src={product.image} alt={product.name} />

              </div>

              <div className="new-info">

                <h3>{product.name}</h3>

                <strong>{product.price}</strong>

                <button className="add-btn" type="button" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features-section">

        <div className="feature-card">

          <div className="feature-icon">
            <FiTruck />
          </div>

          <div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders over $100</p>
          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            <FiShield />
          </div>

          <div>
            <h3>Secure Payment</h3>
            <p>100% secure payment processing</p>
          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            <FiRefreshCw />
          </div>

          <div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free returns</p>
          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            <FiHeadphones />
          </div>

          <div>
            <h3>24/7 Support</h3>
            <p>We're always here to help</p>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <p>
          Premium fashion for modern living.
        </p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#categories">Shop</a>
          <a href="#trending">Trending</a>
          <a href="#new">New Arrivals</a>
          <a href="mailto:support@luxe.com">Contact</a>
        </div>

        <small>
          © 2026 Stackly. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default App;