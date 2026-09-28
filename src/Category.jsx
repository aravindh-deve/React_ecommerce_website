import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiArrowRight,
  FiSliders,
  FiStar
} from "react-icons/fi";

import "./Category.css";

function Category() {

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

  const categories = [
    {
      id: 1,
      name: "Men's Fashion",
      count: "120+ Products",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
    },
    {
      id: 2,
      name: "Women's Fashion",
      count: "180+ Products",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
    },
    {
      id: 3,
      name: "Shoes",
      count: "90+ Products",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
    },
    {
      id: 4,
      name: "Watches",
      count: "75+ Products",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800"
    },
    {
      id: 5,
      name: "Accessories",
      count: "110+ Products",
      image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=800"
    },
    {
      id: 6,
      name: "Beauty",
      count: "95+ Products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
    }
  ];


  const products = [
    {
      id: 1,
      name: "Premium Sneakers",
      category: "Shoes",
      price: 129,
      oldPrice: 169,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
    },
    {
      id: 2,
      name: "Luxury Watch",
      category: "Watches",
      price: 249,
      oldPrice: 299,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700"
    },
    {
      id: 3,
      name: "Classic Jacket",
      category: "Men's Fashion",
      price: 179,
      oldPrice: 220,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"
    },
    {
      id: 4,
      name: "Modern Sunglasses",
      category: "Accessories",
      price: 89,
      oldPrice: 120,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700"
    },
    {
      id: 5,
      name: "Elegant Handbag",
      category: "Women's Fashion",
      price: 159,
      oldPrice: 199,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700"
    },
    {
      id: 6,
      name: "Urban Hoodie",
      category: "Men's Fashion",
      price: 99,
      oldPrice: 129,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700"
    },
    {
      id: 7,
      name: "Classic Heels",
      category: "Women's Fashion",
      price: 119,
      oldPrice: 149,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700"
    },
    {
      id: 8,
      name: "Premium Perfume",
      category: "Beauty",
      price: 79,
      oldPrice: 99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=700"
    }
  ];


  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");


  let filteredProducts = products.filter((product) => {

    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;

  });


  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }


  return (

    <div className="category-page">


      {/* HEADER */}

      <header className="category-header">

        <div className="category-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>


        <nav>
          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="/collection">Collections</a>
          <a href="/contact">Contact</a>
        </nav>


        <div className="category-actions">

          <button>
            <FiSearch />
          </button>

          <button>
            <FiHeart />
          </button>

          <button
            className="bag-icon"
            onClick={() => (window.location.href = "/cart")}
            type="button"
          >
            <FiShoppingBag />
            <span>{cartCount}</span>
          </button>

        </div>

      </header>



      {/* PAGE HERO */}

      <section className="category-hero">

        <div className="category-glow glow-left"></div>
        <div className="category-glow glow-right"></div>


        <div className="breadcrumb">
          Home <span>/</span> Categories
        </div>


        <h1>
          Explore Our
          <span> Collections</span>
        </h1>


        <p>
          Discover carefully curated collections designed
          for modern lifestyles and timeless style.
        </p>

      </section>



      {/* CATEGORY CARDS */}

      <section className="category-section">

        <div className="section-title">

          <div>
            <span>SHOP BY STYLE</span>
            <h2>Browse Categories</h2>
          </div>

        </div>


        <div className="category-cards">

          {categories.map((category) => (

            <div
              className="large-category-card"
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.name)
              }
            >

              <img
                src={category.image}
                alt={category.name}
              />


              <div className="category-card-overlay">

                <div>

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.count}
                  </p>

                </div>


                <button>
                  <FiArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>



      {/* PRODUCT SECTION */}

      <section className="products-section">


        <div className="product-top">

          <div>

            <span>DISCOVER MORE</span>

            <h2>
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h2>

          </div>


          <div className="product-controls">

            <div className="search-box">

              <FiSearch />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <div className="sort-box">

              <FiSliders />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >

                <option value="default">
                  Sort By
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

              </select>

            </div>

          </div>

        </div>



        {/* FILTER BUTTONS */}

        <div className="filter-buttons">

          <button
            className={
              selectedCategory === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedCategory("All")
            }
          >
            All
          </button>


          {categories.map((category) => (

            <button
              key={category.id}
              className={
                selectedCategory === category.name
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category.name)
              }
            >
              {category.name}
            </button>

          ))}

        </div>



        {/* PRODUCT GRID */}

        <div className="category-product-grid">

          {filteredProducts.map((product) => (

            <div
              className="category-product-card"
              key={product.id}
            >

              <div className="category-product-image">

                <span className="sale-badge">
                  SALE
                </span>


                <button className="product-heart">
                  <FiHeart />
                </button>


                <img
                  src={product.image}
                  alt={product.name}
                />


                <button className="category-cart" type="button" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>

              </div>


              <div className="category-product-info">

                <div className="product-rating">

                  <FiStar />

                  {product.rating}

                </div>


                <h3>
                  {product.name}
                </h3>


                <p className="product-category">
                  {product.category}
                </p>


                <div className="category-price">

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


        {filteredProducts.length === 0 && (

          <div className="no-products">
            No products found.
          </div>

        )}

      </section>



      {/* NEWSLETTER */}

      <section className="newsletter">

        <div>

          <span>STAY IN THE LOOP</span>

          <h2>
            Get the latest
            <br />
            <strong>from LUXE.</strong>
          </h2>

        </div>


        <div className="newsletter-form">

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



      {/* FOOTER */}

      <footer className="category-footer">

        <div className="footer-brand">
            <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <p>
          Premium fashion for modern living.
        </p>

        <div className="footer-nav">

          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="#">Collections</a>
          <a href="#">Contact</a>

        </div>

        <small>
          © 2026 Stackly. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default Category;