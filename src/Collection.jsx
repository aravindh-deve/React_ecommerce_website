import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
  FiSearch
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Collection.css";

function Collection() {

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
          id: product.id || product.name
        });
      }

      localStorage.setItem("luxe-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    }
  };

  const [activeCollection, setActiveCollection] = useState("All");

  const collections = [
    "All",
    "New Arrivals",
    "Essentials",
    "Street Style",
    "Luxury",
    "Summer"
  ];

  const products = [
    {
      id: 1,
      name: "Urban Classic Jacket",
      collection: "Street Style",
      price: 149,
      oldPrice: 199,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900"
    },
    {
      id: 2,
      name: "Luxury Minimal Watch",
      collection: "Luxury",
      price: 299,
      oldPrice: 399,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900"
    },
    {
      id: 3,
      name: "Premium Summer Dress",
      collection: "Summer",
      price: 129,
      oldPrice: 169,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900"
    },
    {
      id: 4,
      name: "Classic Leather Bag",
      collection: "Essentials",
      price: 189,
      oldPrice: 249,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900"
    },
    {
      id: 5,
      name: "Premium Sneakers",
      collection: "New Arrivals",
      price: 139,
      oldPrice: 179,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
    },
    {
      id: 6,
      name: "Modern Street Hoodie",
      collection: "Street Style",
      price: 99,
      oldPrice: 129,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900"
    },
    {
      id: 7,
      name: "Elegant Black Heels",
      collection: "Luxury",
      price: 159,
      oldPrice: 219,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900"
    },
    {
      id: 8,
      name: "Summer Sunglasses",
      collection: "Summer",
      price: 79,
      oldPrice: 109,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900"
    }
  ];

  const filteredProducts =
    activeCollection === "All"
      ? products
      : products.filter(
          (product) => product.collection === activeCollection
        );

  return (
    <div className="collection-page">

      {/* HEADER */}

      <header className="collection-header">

        <div className="collection-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a className="active-collection" href="/collection">
            Collections
          </a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="collection-actions">

          <button>
            <FiSearch />
          </button>

          <button>
            <FiHeart />
          </button>

          <button
            className="collection-bag"
            onClick={() => (window.location.href = "/cart")}
            type="button"
          >
            <FiShoppingBag />
            <span>{cartCount}</span>
          </button>

        </div>

      </header>


      {/* HERO */}

      <section className="collection-hero">

        <div className="collection-glow glow-one"></div>
        <div className="collection-glow glow-two"></div>

        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{
            delay: 4500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          className="collection-hero-swiper"
        >

          <SwiperSlide>

            <div className="collection-hero-content">

              <div className="collection-hero-text">

                <span className="collection-label">
                  CURATED COLLECTION
                </span>

                <h1>
                  Define Your
                  <br />
                  <span>Signature Style.</span>
                </h1>

                <p>
                  Explore carefully curated collections
                  designed for modern lifestyles and
                  effortless elegance.
                </p>

                <button className="collection-primary-btn">
                  Explore Collection
                  <FiArrowRight />
                </button>

              </div>

              <div className="collection-hero-image">

                <div className="collection-floating-card">

                  <FiTrendingUp />

                  <div>
                    <strong>NEW</strong>
                    <small>Season Collection</small>
                  </div>

                </div>

                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80"
                  alt="Editorial collection"
                />

              </div>

            </div>

          </SwiperSlide>


          <SwiperSlide>

            <div className="collection-hero-content">

              <div className="collection-hero-text">

                <span className="collection-label">
                  NEW SEASON
                </span>

                <h1>
                  Curated For
                  <br />
                  <span>Every Moment.</span>
                </h1>

                <p>
                  Discover timeless essentials,
                  bold streetwear and luxurious
                  statement pieces.
                </p>

                <button className="collection-primary-btn">
                  Shop New Season
                  <FiArrowRight />
                </button>

              </div>

              <div className="collection-hero-image">

                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&auto=format&fit=crop&q=80"
                  alt="New season collection"
                />

              </div>

            </div>

          </SwiperSlide>

        </Swiper>

      </section>


      {/* COLLECTION CARDS */}

      <section className="featured-collections">

        <div className="collection-section-heading">

          <div>
            <span>EXPLORE OUR WORLD</span>
            <h2>Featured Collections</h2>
          </div>

          <button>
            View All
            <FiArrowRight />
          </button>

        </div>


        <div className="collection-card-grid">

          <div className="collection-card large-card">

            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000"
              alt="New Arrivals"
            />

            <div className="collection-overlay">

              <span>01</span>

              <h3>
                New
                <br />
                Arrivals
              </h3>

              <button>
                Explore
                <FiArrowRight />
              </button>

            </div>

          </div>


          <div className="collection-card">

            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=900"
              alt="Essentials"
            />

            <div className="collection-overlay">

              <span>02</span>

              <h3>
                Everyday
                <br />
                Essentials
              </h3>

              <button>
                Explore
                <FiArrowRight />
              </button>

            </div>

          </div>


          <div className="collection-card">

            <img
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900"
              alt="Street Style"
            />

            <div className="collection-overlay">

              <span>03</span>

              <h3>
                Street
                <br />
                Style
              </h3>

              <button>
                Explore
                <FiArrowRight />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="collection-products">

        <div className="collection-section-heading">

          <div>
            <span>CURATED FOR YOU</span>
            <h2>Shop Collections</h2>
          </div>

        </div>


        <div className="collection-filters">

          {collections.map((collection) => (

            <button
              key={collection}
              className={
                activeCollection === collection
                  ? "collection-filter-active"
                  : ""
              }
              onClick={() =>
                setActiveCollection(collection)
              }
            >
              {collection}
            </button>

          ))}

        </div>


        <div className="collection-product-grid">

          {filteredProducts.map((product) => (

            <div
              className="collection-product-card"
              key={product.id}
            >

              <div className="collection-product-image">

                <span className="new-badge">
                  NEW
                </span>

                <button className="collection-heart">
                  <FiHeart />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <button className="collection-add-cart" type="button" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>

              </div>


              <div className="collection-product-info">

                <div className="collection-rating">

                  <FiStar />

                  <strong>
                    {product.rating}
                  </strong>

                  <span>
                    ★★★★★
                  </span>

                </div>

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.collection}
                </p>

                <div className="collection-price">

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


      {/* SWIPER COLLECTION */}

      <section className="collection-slider-section">

        <div className="collection-section-heading">

          <div>
            <span>THE LUXE EDIT</span>
            <h2>Editor's Picks</h2>
          </div>

        </div>


        <Swiper
          modules={[Autoplay]}
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

              <div className="editor-card">

                <div className="editor-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span>
                    EDITOR'S PICK
                  </span>

                </div>

                <div className="editor-info">

                  <h3>
                    {product.name}
                  </h3>

                  <strong>
                    ${product.price}
                  </strong>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </section>


      {/* CTA */}

      <section className="collection-cta">

        <div>

          <span>CREATE YOUR STYLE</span>

          <h2>
            Your wardrobe.
            <br />
            <strong>Your story.</strong>
          </h2>

          <p>
            Find pieces that feel uniquely yours.
          </p>

          <button>
            Discover More
            <FiArrowRight />
          </button>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="collection-footer">

        <div className="collection-footer-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <p>
          Premium fashion for modern living.
        </p>

        <div className="collection-footer-links">

          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="/collection">Collections</a>
          <a href="#">Contact</a>

        </div>

        <small>
          © 2026 Stackly. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default Collection;