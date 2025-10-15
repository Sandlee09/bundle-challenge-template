/**
 * Bundle Card JavaScript
 * Handles Swiper.js initialization and bundle card functionality
 */

class BundleCard {
  constructor() {
    this.init();
  }

  init() {
    this.initializeSwipers();
    this.initializeBundleForms();
    this.setupEventListeners();
  }

  /**
   * Initialize Swiper.js for bundle product images
   */
  initializeSwipers() {
    const bundleSwipers = document.querySelectorAll('[data-bundle-swiper]');
    
    bundleSwipers.forEach((swiperElement, index) => {
      // Check if Swiper is available
      if (typeof Swiper === 'undefined') {
        console.warn('Swiper.js is not loaded. Bundle card functionality may not work properly.');
        return;
      }

      new Swiper(swiperElement, {
        // Swiper configuration
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: swiperElement.querySelector('.bundle-swiper-pagination'),
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: swiperElement.querySelector('.bundle-swiper-button-next'),
          prevEl: swiperElement.querySelector('.bundle-swiper-button-prev'),
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
        // Accessibility
        a11y: {
          enabled: true,
          prevSlideMessage: 'Previous bundle product image',
          nextSlideMessage: 'Next bundle product image',
          firstSlideMessage: 'This is the first bundle product image',
          lastSlideMessage: 'This is the last bundle product image',
        },
        // Keyboard control
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        // Mouse wheel control
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        // Touch events
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        // Effects
        effect: 'slide',
        speed: 300,
        // Responsive
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // Callbacks
        on: {
          init: function() {
            console.log('Bundle Swiper initialized');
          },
          slideChange: function() {
            // Update any additional UI elements if needed
          },
        },
      });
    });
  }

  /**
   * Initialize bundle product forms
   */
  initializeBundleForms() {
    const bundleForms = document.querySelectorAll('form[data-type="add-to-cart-form"]');
    
    bundleForms.forEach(form => {
      form.addEventListener('submit', this.handleBundleFormSubmit.bind(this));
    });
  }

  /**
   * Handle bundle form submission
   */
  handleBundleFormSubmit(event) {
    const form = event.target;
    const submitButton = form.querySelector('.bundle-add-to-cart-button');
    const bundleCard = form.closest('.bundle-card');
    
    // Add loading state
    if (bundleCard) {
      bundleCard.classList.add('loading');
    }
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Adding to Cart...</span>';
    }

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      if (bundleCard) {
        bundleCard.classList.remove('loading');
      }
      
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Add Bundle to Cart</span>';
      }
      
      // Show success message
      this.showSuccessMessage('Bundle added to cart successfully!');
    }, 2000);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Handle bundle card hover effects
    document.addEventListener('mouseenter', (event) => {
      const bundleCard = event.target.closest('.bundle-card');
      if (bundleCard) {
        bundleCard.classList.add('hover');
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const bundleCard = event.target.closest('.bundle-card');
      if (bundleCard) {
        bundleCard.classList.remove('hover');
      }
    }, true);

    // Handle bundle pricing calculations
    this.updateBundlePricing();
  }

  /**
   * Update bundle pricing display
   */
  updateBundlePricing() {
    const bundleCards = document.querySelectorAll('.bundle-card');
    
    bundleCards.forEach(card => {
      const priceElement = card.querySelector('.bundle-price');
      const originalPriceElement = card.querySelector('.bundle-original-price');
      const discountElement = card.querySelector('.bundle-discount');
      const savingsElement = card.querySelector('.bundle-savings-text');
      
      if (priceElement && originalPriceElement && discountElement && savingsElement) {
        // Get prices from data attributes or calculate them
        const bundlePrice = parseFloat(priceElement.dataset.price || 0);
        const originalPrice = parseFloat(originalPriceElement.dataset.price || 0);
        
        if (bundlePrice > 0 && originalPrice > 0) {
          const discount = Math.round(((originalPrice - bundlePrice) / originalPrice) * 100);
          const savings = originalPrice - bundlePrice;
          
          discountElement.textContent = `${discount}% OFF`;
          savingsElement.textContent = `Save $${savings.toFixed(2)}`;
        }
      }
    });
  }

  /**
   * Show success message
   */
  showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'bundle-success-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✓</span>
        <span class="notification-message">${message}</span>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4caf50;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Refresh bundle cards (useful for dynamic content)
   */
  refresh() {
    this.initializeSwipers();
    this.initializeBundleForms();
    this.updateBundlePricing();
  }

  /**
   * Destroy bundle card functionality
   */
  destroy() {
    // Clean up event listeners and swiper instances
    const bundleSwipers = document.querySelectorAll('[data-bundle-swiper]');
    bundleSwipers.forEach(swiperElement => {
      if (swiperElement.swiper) {
        swiperElement.swiper.destroy(true, true);
      }
    });
  }
}

// Initialize bundle cards when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.bundleCard = new BundleCard();
});

// Re-initialize bundle cards when new content is loaded
document.addEventListener('shopify:section:load', () => {
  if (window.bundleCard) {
    window.bundleCard.refresh();
  }
});

// Clean up when section is unloaded
document.addEventListener('shopify:section:unload', () => {
  if (window.bundleCard) {
    window.bundleCard.destroy();
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BundleCard;
}
