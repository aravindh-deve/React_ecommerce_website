import React, { useState } from "react";
import {
  FiHeart,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiTag
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import "./Cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("luxe-cart") || "[]");
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    const syncCart = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("luxe-cart") || "[]");
        setCartItems(savedCart);
      } catch {
        setCartItems([]);
      }
    };

    syncCart();
    window.addEventListener("cartUpdated", syncCart);

    return () => window.removeEventListener("cartUpdated", syncCart);
  }, []);

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id, value) => {

    setCartItems((items) => {
      const updatedItems = items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + value)
            }
          : item
      );

      localStorage.setItem("luxe-cart", JSON.stringify(updatedItems));
      window.dispatchEvent(new Event("cartUpdated"));
      return updatedItems;
    });
  };

  const removeItem = (id) => {

    setCartItems((items) => {
      const updatedItems = items.filter((item) => item.id !== id);
      localStorage.setItem("luxe-cart", JSON.stringify(updatedItems));
      window.dispatchEvent(new Event("cartUpdated"));
      return updatedItems;
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 300 ? 0 : 15;

  const discount = couponApplied
    ? subtotal * 0.1
    : 0;

  const total = subtotal + shipping - discount;


  const applyCoupon = () => {

    if (coupon.trim().toUpperCase() === "LUXE10") {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
  };


  const recommendedProducts = [
    {
      id: 1,
      name: "Minimalist Sunglasses",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700"
    },
    {
      id: 2,
      name: "Elegant Heels",
      price: 119,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700"
    },
    {
      id: 3,
      name: "Premium Jacket",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"
    },
    {
      id: 4,
      name: "Signature Perfume",
      price: 79,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=700"
    }
  ];


  return (
    <div className="cart-page">

      {/* HEADER */}

      <header className="cart-header">

        <div className="cart-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="/collection">Collections</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="cart-header-bag">
          <FiShoppingBag />
          <span>{cartItems.length}</span>
        </div>

      </header>


      {/* PAGE TITLE */}

      <section className="cart-title">

        <div>

          <span>YOUR SHOPPING BAG</span>

          <h1>
            Shopping
            <strong> Cart.</strong>
          </h1>

          <p>
            Review your selected items before checkout.
          </p>

        </div>

        <div className="cart-title-icon">
          <FiShoppingBag />
        </div>

      </section>


      {/* CART AREA */}

      <section className="cart-section">

        {/* PRODUCTS */}

        <div className="cart-products">

          <div className="cart-products-header">

            <h2>
              Your Items
              <span>({cartItems.length})</span>
            </h2>

            <button
              onClick={() => {
                setCartItems([]);
                localStorage.setItem("luxe-cart", JSON.stringify([]));
                window.dispatchEvent(new Event("cartUpdated"));
              }}
            >
              Clear Cart
            </button>

          </div>


          {cartItems.length === 0 ? (

            <div className="empty-cart">

              <div className="empty-cart-icon">
                <FiShoppingBag />
              </div>

              <h2>Your cart is empty</h2>

              <p>
                Looks like you haven't added
                anything to your cart yet.
              </p>

              <a href="/category">
                Start Shopping
                <FiArrowRight />
              </a>

            </div>

          ) : (

            <div className="cart-list">

              {cartItems.map((item) => (

                <div
                  className="cart-product"
                  key={item.id}
                >

                  <div className="cart-product-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  <div className="cart-product-details">

                    <span>
                      {item.category}
                    </span>

                    <h3>
                      {item.name}
                    </h3>

                    <div className="product-options">

                      <p>
                        Size:
                        <strong>{item.size}</strong>
                      </p>

                      <p>
                        Color:
                        <strong>{item.color}</strong>
                      </p>

                    </div>


                    <div className="cart-mobile-price">
                      ${item.price}
                    </div>


                    <div className="cart-actions">

                      <button>
                        <FiHeart />
                        Wishlist
                      </button>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        <FiTrash2 />
                        Remove
                      </button>

                    </div>

                  </div>


                  <div className="cart-product-price">

                    <strong>
                      ${item.price}
                    </strong>

                  </div>


                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        updateQuantity(item.id, -1)
                      }
                    >
                      <FiMinus />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, 1)
                      }
                    >
                      <FiPlus />
                    </button>

                  </div>


                  <div className="cart-item-total">

                    $
                    {(item.price * item.quantity).toFixed(2)}

                  </div>

                </div>

              ))}

            </div>

          )}


          {/* BENEFITS */}

          <div className="cart-benefits">

            <div>

              <FiTruck />

              <div>
                <strong>Free Shipping</strong>
                <span>
                  On orders over $300
                </span>
              </div>

            </div>


            <div>

              <FiShield />

              <div>
                <strong>Secure Payment</strong>
                <span>
                  100% secure checkout
                </span>
              </div>

            </div>


            <div>

              <FiTag />

              <div>
                <strong>Easy Returns</strong>
                <span>
                  30 day return policy
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* SUMMARY */}

        {cartItems.length > 0 && (

          <aside className="cart-summary">

            <div className="summary-glow"></div>

            <div className="summary-content">

              <span className="summary-label">
                ORDER SUMMARY
              </span>

              <h2>
                Your
                <strong> Total.</strong>
              </h2>


              <div className="summary-lines">

                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ${subtotal.toFixed(2)}
                  </strong>
                </div>


                <div>
                  <span>
                    Shipping
                  </span>

                  <strong>
                    {shipping === 0
                      ? "FREE"
                      : `$${shipping.toFixed(2)}`}
                  </strong>
                </div>


                {couponApplied && (

                  <div className="discount-line">

                    <span>
                      Discount (10%)
                    </span>

                    <strong>
                      -${discount.toFixed(2)}
                    </strong>

                  </div>

                )}

              </div>


              {/* COUPON */}

              <div className="coupon-box">

                <FiTag />

                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) =>
                    setCoupon(e.target.value)
                  }
                />

                <button
                  onClick={applyCoupon}
                >
                  Apply
                </button>

              </div>


              {couponApplied && (
                <p className="coupon-success">
                  ✓ LUXE10 applied successfully
                </p>
              )}


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ${total.toFixed(2)}
                </strong>

              </div>


              <button className="checkout-btn">

                Proceed To Checkout

                <FiArrowRight />

              </button>


              <div className="secure-checkout">

                <FiShield />

                <span>
                  Secure encrypted checkout
                </span>

              </div>

            </div>

          </aside>

        )}

      </section>


      {/* RECOMMENDED */}

      <section className="recommended">

        <div className="recommended-heading">

          <div>

            <span>YOU MAY ALSO LIKE</span>

            <h2>
              Complete Your
              <strong> Look.</strong>
            </h2>

          </div>

          <a href="/category">
            View All
            <FiArrowRight />
          </a>

        </div>


        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          spaceBetween={22}
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

          {recommendedProducts.map((product) => (

            <SwiperSlide key={product.id}>

              <div className="recommended-card">

                <div className="recommended-image">

                  <button>
                    <FiHeart />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="quick-add">
                    Quick Add
                    <FiPlus />
                  </div>

                </div>

                <div className="recommended-info">

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


      {/* FOOTER */}

      <footer className="cart-footer">

        <div className="cart-footer-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <p>
          Premium fashion for modern living.
        </p>

        <div className="cart-footer-links">

          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="/collection">Collections</a>
          <a href="/contact">Contact</a>

        </div>

        <small>
          © 2026 Stackly. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default Cart;