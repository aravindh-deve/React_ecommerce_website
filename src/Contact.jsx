import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiSend,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiMessageCircle,
  FiHeart
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="contact-page">

      {/* HEADER */}

      <header className="contact-header">

        <div className="contact-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/category">Categories</a>
          <a href="/trending">Trending</a>
          <a href="/collection">Collections</a>
          <a className="active-contact" href="/contact">
            Contact
          </a>
        </nav>

        <div className="contact-actions">

          <button>
            <FiInstagram />
          </button>

          <button>
            <FiHeart />
          </button>

          <button className="contact-chat">
            <FiMessageCircle />
          </button>

        </div>

      </header>


      {/* HERO */}

      <section className="contact-hero">

        <div className="contact-glow contact-glow-one"></div>
        <div className="contact-glow contact-glow-two"></div>

        <div className="contact-hero-content">

          <div className="contact-hero-text">

            <span>LET'S CONNECT</span>

            <h1>
              We'd Love
              <br />
              <strong>To Hear From You.</strong>
            </h1>

            <p>
              Have a question about an order, product,
              or anything else? Our team is here to help.
            </p>

            <button className="contact-hero-btn">
              Get In Touch
              <FiArrowRight />
            </button>

          </div>

          <div className="contact-hero-image">

            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200"
              alt="LUXE support team"
            />

            <div className="contact-floating-card">

              <div className="online-dot"></div>

              <div>
                <strong>We're Online</strong>
                <small>Usually reply within minutes</small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CONTACT INFO */}

      <section className="contact-info-section">

        <div className="contact-info-card">

          <div className="contact-icon">
            <FiMail />
          </div>

          <span>EMAIL US</span>

          <h3>hello@luxe.com</h3>

          <p>
            Send us an email anytime.
          </p>

        </div>


        <div className="contact-info-card">

          <div className="contact-icon">
            <FiPhone />
          </div>

          <span>CALL US</span>

          <h3>+91 98765 43210</h3>

          <p>
            Mon - Sat, 9AM - 7PM
          </p>

        </div>


        <div className="contact-info-card">

          <div className="contact-icon">
            <FiMapPin />
          </div>

          <span>VISIT US</span>

          <h3>Chennai, India</h3>

          <p>
            Visit our flagship store.
          </p>

        </div>


        <div className="contact-info-card">

          <div className="contact-icon">
            <FiClock />
          </div>

          <span>WORKING HOURS</span>

          <h3>09:00 - 19:00</h3>

          <p>
            Monday to Saturday
          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="contact-form-section">

        <div className="contact-form-heading">

          <span>CONTACT US</span>

          <h2>
            Let's start a
            <br />
            <strong>conversation.</strong>
          </h2>

          <p>
            Fill out the form and our team will
            get back to you as soon as possible.
          </p>

        </div>


        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">

              <label>Your Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>Subject</label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select a subject
                </option>

                <option value="order">
                  Order Support
                </option>

                <option value="product">
                  Product Question
                </option>

                <option value="return">
                  Returns & Refunds
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

          </div>


          <div className="form-group">

            <label>Your Message</label>

            <textarea
              name="message"
              rows="6"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

          </div>


          <button
            type="submit"
            className="contact-submit"
          >
            Send Message
            <FiSend />
          </button>


          {success && (
            <div className="success-message">
              ✓ Your message has been sent successfully!
            </div>
          )}

        </form>

      </section>


      {/* MAP / LOCATION */}

      <section className="contact-location">

        <div className="location-content">

          <span>FIND US</span>

          <h2>
            Come say
            <br />
            <strong>hello.</strong>
          </h2>

          <p>
            Visit our flagship store and experience
            the LUXE collection in person.
          </p>

          <div className="location-details">

            <div>
              <FiMapPin />
              <span>
                Anna Salai,
                <br />
                Chennai, Tamil Nadu
              </span>
            </div>

            <div>
              <FiClock />
              <span>
                Mon - Sat
                <br />
                9:00 AM - 7:00 PM
              </span>
            </div>

          </div>

          <button
            className="direction-btn"
            onClick={() => window.open(
              "https://www.google.com/maps/dir/12.8666948,77.615653/chennai+location/data=!4m6!4m5!1m0!1m2!1m1!1s0x3a5265ea4f7d3361:0x6e61a70b6863d433!3e0?sa=X&ved=1t:196274&ictx=111",
              "_blank",
              "noopener,noreferrer"
            )}
            type="button"
          >
            Get Directions
            <FiArrowRight />
          </button>

        </div>


        <div className="fake-map">

          <div className="map-grid"></div>

          <div className="map-pin">
            <FiMapPin />
          </div>

          <div className="map-label">
            <strong>LUXE.</strong>
            <span>Chennai Flagship Store</span>
          </div>

        </div>

      </section>


      {/* TESTIMONIALS */}

      <section className="contact-testimonials">

        <div className="contact-section-title">

          <span>WHAT OUR CUSTOMERS SAY</span>

          <h2>
            We're here
            <br />
            <strong>for you.</strong>
          </h2>

        </div>


        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          spaceBetween={25}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            700: {
              slidesPerView: 2
            },
            1100: {
              slidesPerView: 3
            }
          }}
        >

          <SwiperSlide>

            <div className="testimonial-card">

              <div className="quote">
                “
              </div>

              <p>
                The support team was incredibly helpful.
                They solved my issue within minutes.
              </p>

              <div className="customer">

                <div className="customer-avatar">
                  A
                </div>

                <div>
                  <strong>Arun Kumar</strong>
                  <span>Verified Customer</span>
                </div>

              </div>

            </div>

          </SwiperSlide>


          <SwiperSlide>

            <div className="testimonial-card">

              <div className="quote">
                “
              </div>

              <p>
                Amazing shopping experience and
                excellent customer service. Highly recommended!
              </p>

              <div className="customer">

                <div className="customer-avatar">
                  P
                </div>

                <div>
                  <strong>Priya S</strong>
                  <span>Verified Customer</span>
                </div>

              </div>

            </div>

          </SwiperSlide>


          <SwiperSlide>

            <div className="testimonial-card">

              <div className="quote">
                “
              </div>

              <p>
                Quick response, friendly staff and
                very professional service from LUXE.
              </p>

              <div className="customer">

                <div className="customer-avatar">
                  R
                </div>

                <div>
                  <strong>Rahul M</strong>
                  <span>Verified Customer</span>
                </div>

              </div>

            </div>

          </SwiperSlide>

        </Swiper>

      </section>


      {/* FAQ */}

      <section className="contact-faq">

        <div className="contact-section-title">

          <span>NEED HELP?</span>

          <h2>
            Frequently Asked
            <br />
            <strong>Questions.</strong>
          </h2>

        </div>


        <div className="faq-grid">

          <details>
            <summary>
              How can I track my order?
              <span>+</span>
            </summary>

            <p>
              Once your order is shipped, you will
              receive a tracking link through email
              and SMS.
            </p>

          </details>


          <details>
            <summary>
              What is your return policy?
              <span>+</span>
            </summary>

            <p>
              Eligible products can be returned
              according to our return policy.
              Please contact support for assistance.
            </p>

          </details>


          <details>
            <summary>
              How long does delivery take?
              <span>+</span>
            </summary>

            <p>
              Standard delivery usually takes
              3-7 business days depending on
              your location.
            </p>

          </details>


          <details>
            <summary>
              How can I contact customer support?
              <span>+</span>
            </summary>

            <p>
              You can reach us through email,
              phone, or the contact form above.
            </p>

          </details>

        </div>

      </section>


      {/* NEWSLETTER */}

      <section className="contact-newsletter">

        <div>

          <span>STAY CONNECTED</span>

          <h2>
            Get the latest
            <br />
            <strong>from LUXE.</strong>
          </h2>

        </div>

        <div className="newsletter-input">

          <input
            type="email"
            placeholder="Your email address"
          />

          <button>
            Subscribe
            <FiArrowRight />
          </button>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="contact-footer">

        <div className="contact-footer-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </div>

        <p>
          Premium fashion for modern living.
        </p>

        <div className="footer-socials">

          <button>
            <FiInstagram />
          </button>

          <button>
            <FiTwitter />
          </button>

          <button>
            <FiFacebook />
          </button>

        </div>

        <div className="contact-footer-links">

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


/* Simple heart icon replacement */
function FiHeartIcon() {
  return <span style={{ fontSize: "18px" }}>♡</span>;
}

export default Contact;