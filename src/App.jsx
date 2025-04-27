import React, { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import gradient from "./assets/gradient.png";
import { gsap } from "gsap";

const App = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const splineContainerRef = useRef(null);
  
  // Refs for GSAP animations
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const signUpBtnRef = useRef(null);
  const contentRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  // Handle responsive checks with more precise breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setScreenSize('mobile');
      } else if (width <= 992) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Check on initial load
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // GSAP animations setup
  useEffect(() => {
    // Only run animations after loading completes
    if (!isLoading) {
      // Create a timeline for staggered animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // Reset any previous animations
      gsap.set([logoRef.current, ...navItemsRef.current, signUpBtnRef.current], { 
        y: -50, 
        opacity: 0 
      });
      
      gsap.set([headingRef.current, descriptionRef.current, buttonsRef.current], {
        y: -30,
        opacity: 0
      });
      
      // Header animations
      tl.to(logoRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.6 
      })
      .to(navItemsRef.current, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 0.4
      }, "-=0.3")
      .to(signUpBtnRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4 
      }, "-=0.2");
      
      // Content animations
      tl.to(headingRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5 
      }, "-=0.2")
      .to(descriptionRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5 
      }, "-=0.3")
      .to(buttonsRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5 
      }, "-=0.3");
    }
  }, [isLoading, screenSize]);

  // Handle loading state for Spline
  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    // Animate mobile menu
    if (!menuOpen) {
      gsap.to(".responsive-menu", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(".responsive-menu", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  // Function to add items to navItemsRef array
  const addToNavRefs = (el) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  return (
    <div className="app-container">
      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading 3D experience...</p>
        </div>
      )}

      {/* Spline 3D Scene - Position changes based on screen size */}
      <div 
        ref={splineContainerRef}
        className={`spline-wrapper ${screenSize}`}
      >
        <Spline 
          scene="https://prod.spline.design/Spfy7OYzBixwJIC5/scene.splinecode" 
          onLoad={handleSplineLoad}
        />
      </div>
      
      {/* Gradient and Blur */}
      <img 
        className={`image-gradient ${screenSize}`} 
        src={gradient} 
        alt="Gradient effect" 
      />
      <div className={`layer-blur ${screenSize}`}></div>
      
      {/* Main container */}
      <div className="container">
        <header ref={headerRef} className={screenSize}>
          <h1 ref={logoRef} className="logo">Dfn</h1>
          
          {/* Mobile/Tablet menu button */}
          {screenSize !== 'desktop' ? (
            <div className="responsive-menu-container">
              <button 
                className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                ref={signUpBtnRef}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className={`responsive-menu ${menuOpen ? 'open' : ''}`}>
                <nav>
                  <a href="#" ref={addToNavRefs}>Home</a>
                  <a href="#" ref={addToNavRefs}>Company</a>
                  <a href="#" ref={addToNavRefs}>Features</a>
                  <a href="#" ref={addToNavRefs}>Resources</a>
                  <button className="btn-signing" ref={addToNavRefs}>Sign Up</button>
                </nav>
              </div>
            </div>
          ) : (
            <>
              <nav className="desktop-nav">
                <a href="#" ref={addToNavRefs}>Home</a>
                <a href="#" ref={addToNavRefs}>Company</a>
                <a href="#" ref={addToNavRefs}>Features</a>
                <a href="#" ref={addToNavRefs}>Resources</a>
              </nav>
              <button className="btn-signing" ref={signUpBtnRef}>Sign Up</button>
            </>
          )}
        </header>
        
        <main className={screenSize}>
          <div ref={contentRef} className={`content ${screenSize}`}>
            <div className="tag-box">
              <div className="tag">Introducing modernity</div>
            </div>
            
            <h1 ref={headingRef} className={screenSize}>
              Email For {screenSize === 'mobile' ? ' ' : <br />}
              Developers
            </h1>
            
            <p ref={descriptionRef} className={`description ${screenSize}`}>
              The best way to reach users instead of spam folders,
              deliver transactional and marketing emails at scale.
            </p>
            
            <div ref={buttonsRef} className={`buttons ${screenSize}`}>
              <a className="btn-get-started" href="#">Get Started</a>
              <a className="btn-get-started docs" href="#">Documentation</a>
            </div>
          </div>
        </main>
        
        <footer className={screenSize}>
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Dfn</h2>
              <p>Elevate your email communications</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h3>Product</h3>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">API</a>
                <a href="#">Integrations</a>
              </div>
              
              <div className="footer-column">
                <h3>Resources</h3>
                <a href="#">Documentation</a>
                <a href="#">Blog</a>
                <a href="#">Guides</a>
                <a href="#">Support</a>
              </div>
              
              <div className="footer-column">
                <h3>Company</h3>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
                <a href="#">Legal</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Dfn. All rights reserved.</p>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;