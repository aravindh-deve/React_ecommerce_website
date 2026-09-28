import React, { useEffect, useState } from "react";
import {
  FiHeart,
  FiShoppingBag,
  FiSearch,
  FiArrowRight,
  FiStar,
  FiTrendingUp,
  FiClock
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Trending.css";

function Trending() {

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
      const existingItem = cart.find((item) => item.name === product.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
          id: product.id || product.name,
          price: Number(product.price)
        });
      }

      localStorage.setItem("luxe-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    }
  };

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Fashion",
    "Shoes",
    "Watches",
    "Accessories",
    "Beauty"
  ];

  const products = [
    {
      id: 1,
      name: "Premium Street Sneakers",
      category: "Shoes",
      price: 129,
      oldPrice: 169,
      rating: 4.9,
      reviews: 328,
      trend: "+42%",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    },
    {
      id: 2,
      name: "Luxury Chronograph",
      category: "Watches",
      price: 249,
      oldPrice: 319,
      rating: 4.8,
      reviews: 245,
      trend: "+38%",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800"
    },
    {
      id: 3,
      name: "Oversized Premium Jacket",
      category: "Fashion",
      price: 179,
      oldPrice: 229,
      rating: 4.7,
      reviews: 189,
      trend: "+35%",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
    },
    {
      id: 4,
      name: "Minimalist Sunglasses",
      category: "Accessories",
      price: 89,
      oldPrice: 119,
      rating: 4.8,
      reviews: 412,
      trend: "+31%",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"
    },
    {
      id: 5,
      name: "Luxury Leather Bag",
      category: "Accessories",
      price: 199,
      oldPrice: 259,
      rating: 4.9,
      reviews: 376,
      trend: "+29%",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    },
    {
      id: 6,
      name: "Essential Urban Hoodie",
      category: "Fashion",
      price: 99,
      oldPrice: 129,
      rating: 4.6,
      reviews: 214,
      trend: "+27%",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800"
    },
    {
      id: 7,
      name: "Elegant Heels",
      category: "Shoes",
      price: 119,
      oldPrice: 159,
      rating: 4.7,
      reviews: 164,
      trend: "+24%",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
    },
    {
      id: 8,
      name: "Signature Perfume",
      category: "Beauty",
      price: 79,
      oldPrice: 99,
      rating: 4.8,
      reviews: 291,
      trend: "+22%",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
    }
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <div className="trending-page">

      {/* ================= HEADER ================= */}

      <header className="trending-header">

        <div className="trending-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a className="active-link" href="/trending">
            Trending
          </a>
          <a href="/collection">Collections</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="trending-actions">

          <button>
            <FiSearch />
          </button>

          <button>
            <FiHeart />
          </button>

          <button
            className="trend-bag"
            onClick={() => (window.location.href = "/cart")}
            type="button"
          >
            <FiShoppingBag />
            <span>{cartCount}</span>
          </button>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="trending-hero">

        <div className="trend-glow trend-glow-one"></div>
        <div className="trend-glow trend-glow-two"></div>

        <Swiper
          modules={[
            Autoplay,
            Pagination,
            Navigation
          ]}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          className="trend-hero-swiper"
        >

          <SwiperSlide>

            <div className="trend-hero-content">

              <div className="trend-hero-text">

                <div className="trend-label">
                  <FiTrendingUp />
                  TRENDING NOW
                </div>

                <h1>
                  What's
                  <br />
                  <span>Trending.</span>
                </h1>

                <p>
                  Discover the styles everyone's talking about.
                  Explore our most wanted products of the season.
                </p>

                <button className="trend-primary-btn">
                  Explore Trending
                  <FiArrowRight />
                </button>

              </div>

              <div className="trend-hero-image">

                <div className="trend-floating-card">

                  <FiTrendingUp />

                  <div>
                    <strong>+42%</strong>
                    <small>Trending This Week</small>
                  </div>

                </div>

                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1100&auto=format&fit=crop&q=80"
                  alt="Trending fashion editorial"
                />

              </div>

            </div>

          </SwiperSlide>


          <SwiperSlide>

            <div className="trend-hero-content">

              <div className="trend-hero-text">

                <div className="trend-label">
                  <FiStar />
                  MOST WANTED
                </div>

                <h1>
                  Made For
                  <br />
                  <span>Your Style.</span>
                </h1>

                <p>
                  From everyday essentials to statement pieces,
                  discover what shoppers love right now.
                </p>

                <button className="trend-primary-btn">
                  Shop Now
                  <FiArrowRight />
                </button>

              </div>

              <div className="trend-hero-image">

                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1100&auto=format&fit=crop&q=80"
                  alt="Premium trending collection"
                />

              </div>

            </div>

          </SwiperSlide>

        </Swiper>

      </section>


      {/* ================= TRENDING STATS ================= */}

      <section className="trend-stats">

        <div className="trend-stat-card">

          <FiTrendingUp />

          <div>
            <strong>2.5K+</strong>
            <span>Trending Products</span>
          </div>

        </div>

        <div className="trend-stat-card">

          <FiStar />

          <div>
            <strong>4.9/5</strong>
            <span>Average Rating</span>
          </div>

        </div>

        <div className="trend-stat-card">

          <FiShoppingBag />

          <div>
            <strong>18K+</strong>
            <span>Orders This Month</span>
          </div>

        </div>

        <div className="trend-stat-card">

          <FiClock />

          <div>
            <strong>24/7</strong>
            <span>New Trends</span>
          </div>

        </div>

      </section>


      {/* ================= TRENDING PRODUCTS ================= */}

      <section className="trending-products">

        <div className="trend-section-heading">

          <div>

            <span>POPULAR RIGHT NOW</span>

            <h2>
              Trending Products
            </h2>

          </div>

          <button className="trend-view-btn">
            View All
            <FiArrowRight />
          </button>

        </div>


        {/* FILTER */}

        <div className="trend-filter">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "trend-filter-active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* PRODUCT GRID */}

        <div className="trending-grid">

          {filteredProducts.map((product) => (

            <div
              className="trending-product-card"
              key={product.id}
            >

              <div className="trending-product-image">

                <div className="trend-badge">
                  <FiTrendingUp />
                  {product.trend}
                </div>

                <button className="trend-heart">
                  <FiHeart />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <button className="trend-add-cart" type="button" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>

              </div>


              <div className="trending-product-info">

                <div className="trend-rating">

                  <FiStar />

                  <strong>
                    {product.rating}
                  </strong>

                  <span>
                    ({product.reviews})
                  </span>

                </div>


                <h3>
                  {product.name}
                </h3>


                <p>
                  {product.category}
                </p>


                <div className="trend-price">

                  <strong>
                    ${product.price}
                  </strong>

                  <del>
                    ${product.oldPrice}
                  </del>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= FLASH SALE ================= */}

      <section className="flash-sale">

        <div className="flash-glow"></div>

        <div className="flash-content">

          <div className="flash-icon">
            ⚡
          </div>

          <span>
            LIMITED TIME
          </span>

          <h2>
            Flash Sale
          </h2>

          <p>
            Trending styles. Exclusive prices.
          </p>

          <button className="flash-btn">
            Shop Sale
            <FiArrowRight />
          </button>

        </div>


        <div className="countdown">

          <div>
            <strong>08</strong>
            <span>Hours</span>
          </div>

          <b>:</b>

          <div>
            <strong>42</strong>
            <span>Minutes</span>
          </div>

          <b>:</b>

          <div>
            <strong>18</strong>
            <span>Seconds</span>
          </div>

        </div>

      </section>


      {/* ================= TOP TRENDING SWIPER ================= */}

      <section className="top-trending">

        <div className="trend-section-heading">

          <div>

            <span>THE HOT LIST</span>

            <h2>
              Top Trending
            </h2>

          </div>

        </div>


        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".top-prev",
            nextEl: ".top-next"
          }}
          autoplay={{
            delay: 3000,
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

          {products.slice(0, 6).map((product) => (

            <SwiperSlide key={product.id}>

              <div className="top-trend-card">

                <div className="top-rank">
                  #{product.id}
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="top-card-info">

                  <div>

                    <h3>
                      {product.name}
                    </h3>

                    <span>
                      {product.category}
                    </span>

                  </div>

                  <strong>
                    ${product.price}
                  </strong>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

        <div className="top-navigation">

          <button className="top-prev">
            ←
          </button>

          <button className="top-next">
            →
          </button>

        </div>

      </section>


      {/* ================= NEWSLETTER ================= */}

      <section className="trend-newsletter">

        <div>

          <span>
            NEVER MISS A TREND
          </span>

          <h2>
            Stay ahead of
            <br />
            <strong>the curve.</strong>
          </h2>

        </div>

        <div className="trend-email">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            Subscribe
            <FiArrowRight />
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="trend-footer">

        <div className="trend-footer-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <p>
          Premium fashion for modern living.
        </p>

        <div className="trend-footer-links">

          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="#">Contact</a>

        </div>

        <small>
          © 2026 Stackly. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default Trending;