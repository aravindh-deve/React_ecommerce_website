import React, { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShoppingBag
} from "react-icons/fi";

import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");

    alert("Login Successful!");
  };

  return (
    <div className="login-page">

      {/* Background Glow */}
      <div className="login-glow glow-one"></div>
      <div className="login-glow glow-two"></div>

      {/* Header */}
      <header className="login-header">
        <a href="/" className="login-logo">
          <img className="stackly-logo-image" src="/Stackly-logo2.png" alt="Stackly" />
        </a>

        <a href="/" className="back-home">
          <FiArrowRight />
          Back to Home
        </a>
      </header>

      {/* Login Section */}
      <main className="login-container">

        <div className="login-card">

          {/* Left Side */}
          <div className="login-content">

            <div className="login-icon">
              <FiShoppingBag />
            </div>

            <span className="login-small-title">
              WELCOME BACK
            </span>

            <h1>
              Welcome
              <strong> Back.</strong>
            </h1>

            <p className="login-description">
              Sign in to your LUXE account and continue
              your premium shopping experience.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>

                <div className="input-box">
                  <FiMail />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <label>Password</label>

                <div className="input-box">
                  <FiLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="login-options">

                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a href="/forgot-password">
                  Forgot Password?
                </a>

              </div>

              {/* Error */}
              {error && (
                <p className="login-error">
                  {error}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                className="login-btn"
              >
                Sign In
                <FiArrowRight />
              </button>

            </form>

            {/* Register */}
            <div className="register-text">
              Don't have an account?
              <a href="/register">
                Create Account
              </a>
            </div>

          </div>

          {/* Right Side */}
          <div className="login-visual">

            <div className="visual-overlay"></div>

            <div className="visual-content">

              <span>THE LUXE EXPERIENCE</span>

              <h2>
                Style that
                <br />
                <strong>defines you.</strong>
              </h2>

              <p>
                Discover timeless fashion, exclusive
                collections and premium products curated
                just for you.
              </p>

              <div className="visual-line"></div>

              <small>
                PREMIUM • MODERN • TIMELESS
              </small>

            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="login-footer">
        <span>© 2026 Stackly. All Rights Reserved.</span>

        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </footer>

    </div>
  );
}

export default Login;