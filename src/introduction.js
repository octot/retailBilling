// ToolIntro.jsx
import React, { useState, useEffect } from "react";
import { ArrowRight, Check, Clock, Wallet, Users } from "lucide-react";
import "./ToolIntro.css";
import { useNavigate } from "react-router-dom";
const ToolIntro = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev < 60 ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleBilling = () => {
    navigate("/home");
  };
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Bill Smarter, Not Harder</h1>
        <p>Transform your billing workflow from hours to minutes</p>
      </div>

      {/* Animated Counter */}
      <div className="counter">
        <span>Save up to</span>
        <span className="count">{count}%</span>
        <span>of your time</span>
      </div>

      {/* Feature Cards */}
      <div className="feature-grid">
        <div className="feature-card">
          <Clock className="icon" />
          <h3>Lightning Fast</h3>
          <p>Create professional invoices in under 60 seconds</p>
        </div>

        <div className="feature-card">
          <Wallet className="icon" />
          <h3>Invoice Customization</h3>
          <p>Customize your options for terms, conditions, and payment details.</p>
        </div>

        <div className="feature-card">
          <Users className="icon" />
          <h3>Client Friendly</h3>
          <p>Easy sharing and payment options</p>
        </div>
      </div>

      {/* Benefits List */}
      <div className="benefits">
        {[
          "Save customer profiles for quick access",
          "Generate professional PDF invoices instantly",
          "Share directly to any platform",
          "Access from any device, anywhere",
        ].map((benefit, index) => (
          <div key={index} className="benefit-item">
            <Check className="check-icon" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="cta">
        <button className="cta-button" onClick={handleBilling}>
          <span>Get Started</span>
          <ArrowRight className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default ToolIntro;
