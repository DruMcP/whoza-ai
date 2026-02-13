# Glassmorphism & Micro-Interactions Usage Guide

## Quick Reference for Developers

This guide shows you how to apply the glassmorphism effects and micro-interactions to your components.

---

## CSS Classes Reference

### Glassmorphism Cards

```jsx
// Automatic glass effect (already applied to these classes)
<div className="pricing-card">Your content</div>
<div className="feature-card">Your content</div>
<div className="testimonial-card">Your content</div>
<div className="card">Your content</div>

// Manual glass effect
<div className="glass-card">Your content</div>
```

### Buttons with Micro-Interactions

```jsx
// Primary button with ripple effect
<button className="button">Click me</button>
<button className="btn-primary">Click me</button>

// Secondary button with ripple effect
<button className="button-secondary">Click me</button>

// Header CTA button
<button className="button-header-cta">Get Started</button>
```

### Scroll Reveal Animations

```jsx
// Fade up from bottom
<div className="scroll-reveal">
  Content appears on scroll
</div>

// Slide in from left
<div className="scroll-reveal-left">
  Content slides from left
</div>

// Slide in from right
<div className="scroll-reveal-right">
  Content slides from right
</div>
```

### Staggered List Items

```jsx
// Container with staggered children
<div className="pricing-cards">
  <div className="pricing-card">Item 1</div>
  <div className="pricing-card">Item 2</div>
  <div className="pricing-card">Item 3</div>
</div>

// Manual stagger items
<div className="container">
  <div className="stagger-item">Item 1</div>
  <div className="stagger-item">Item 2</div>
  <div className="stagger-item">Item 3</div>
</div>
```

### Tooltips

```jsx
// Add tooltip to any element
<button data-tooltip="This is a helpful tip">
  Hover me
</button>

<span data-tooltip="Additional information">
  <InfoIcon />
</span>
```

### Special Animations

```jsx
// Floating animation
<div className="float-animation">
  <img src="icon.svg" alt="Floating icon" />
</div>

// Pulse animation (for badges, notifications)
<span className="pulse">NEW</span>
<span className="badge-pulse">5</span>

// Shimmer effect (for loading states)
<div className="shimmer" style={{ width: '200px', height: '20px' }} />
```

### Dashboard Panels

```jsx
// Glass panels for dashboard
<div className="dashboard-panel">
  <h3>Statistics</h3>
  <p>Your stats here</p>
</div>

<div className="stat-panel">
  <span>Total Views</span>
  <strong>1,234</strong>
</div>
```

---

## JavaScript Utilities

### Import the utilities

```javascript
import {
  initMicrointeractions,
  addStaggerAnimation,
  createTooltip,
  addGlassmorphism,
  addFloatingAnimation,
  addPulseAnimation
} from './utils/microinteractions';
```

### Initialize in your component

```javascript
useEffect(() => {
  // Initialize all micro-interactions
  initMicrointeractions();
}, []);
```

### Add effects programmatically

```javascript
// Add stagger animation to container children
addStaggerAnimation('.my-container');

// Create tooltip for an element
const element = document.querySelector('#my-element');
createTooltip(element, 'This is a tooltip');

// Add glassmorphism to any element
const card = document.querySelector('.my-card');
addGlassmorphism(card);

// Add floating animation
const icon = document.querySelector('.hero-icon');
addFloatingAnimation(icon);

// Add pulse animation
const badge = document.querySelector('.notification-badge');
addPulseAnimation(badge);
```

---

## Common Patterns

### Hero Section with Animations

```jsx
<section className="hero">
  <div className="hero-content scroll-reveal">
    <h1 className="stagger-item">Amazing Product</h1>
    <p className="stagger-item">Your description here</p>
    <button className="button stagger-item">Get Started</button>
  </div>
  <div className="hero-image scroll-reveal-right float-animation">
    <img src="hero.png" alt="Hero" />
  </div>
</section>
```

### Pricing Cards with Glass Effect

```jsx
<div className="pricing-cards">
  {plans.map((plan, index) => (
    <div
      key={plan.id}
      className="pricing-card scroll-reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h3>{plan.name}</h3>
      <p>{plan.price}</p>
      <button className="button">Choose Plan</button>
    </div>
  ))}
</div>
```

### Interactive Form with Focus Effects

```jsx
<form className="glass-card">
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      placeholder="your@email.com"
      data-tooltip="We'll never share your email"
    />
  </div>

  <div className="form-group">
    <label htmlFor="message">Message</label>
    <textarea
      id="message"
      placeholder="Your message"
    />
  </div>

  <button type="submit" className="button">
    Send Message
  </button>
</form>
```

### Dashboard with Glass Panels

```jsx
<div className="dashboard">
  <div className="dashboard-panel scroll-reveal">
    <h3>Total Revenue</h3>
    <p className="metric-value">$12,345</p>
    <div className="progress-bar" style={{ width: '75%' }} />
  </div>

  <div className="stat-panel scroll-reveal">
    <span className="stat-label">Active Users</span>
    <span className="stat-value">1,234</span>
    <span className="badge-pulse">+12%</span>
  </div>
</div>
```

### Modal with Glassmorphism

```jsx
{showModal && (
  <>
    <div className="modal-overlay" onClick={closeModal} />
    <div className="modal scroll-reveal">
      <h2>Modal Title</h2>
      <p>Modal content here</p>
      <button className="button" onClick={closeModal}>
        Close
      </button>
    </div>
  </>
)}
```

### Feature List with Icons

```jsx
<ul className="feature-list">
  {features.map((feature, index) => (
    <li
      key={feature.id}
      className="stagger-item"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="icon" data-tooltip={feature.tooltip}>
        <FeatureIcon />
      </div>
      <h4>{feature.title}</h4>
      <p>{feature.description}</p>
    </li>
  ))}
</ul>
```

---

## Best Practices

### 1. Don't Overuse Animations
- Use scroll-reveal for major sections only
- Reserve floating animations for hero elements
- Apply pulse sparingly (important notifications only)

### 2. Maintain Performance
- Limit number of glass cards on screen
- Use scroll-reveal for off-screen content
- Avoid nesting multiple blur effects

### 3. Respect User Preferences
- All animations automatically respect `prefers-reduced-motion`
- No additional code needed
- Users with motion sensitivity see instant content

### 4. Consistent Timing
- Stagger delays: 0.1s increments
- Transitions: 0.3s for most interactions
- Animations: 0.5-0.6s for entrances
- Long animations: 2-3s for ambient effects

### 5. Color Consistency
- Use brand color `#9EF01A` for highlights
- Glass backgrounds: white at 5% opacity
- Borders: white at 10% opacity
- Shadows: brand color at 10-30% opacity

---

## Troubleshooting

### Animations Not Working?

1. **Check if CSS is imported**
   ```javascript
   // In main.jsx
   import './glassmorphism-microinteractions.css';
   ```

2. **Initialize microinteractions**
   ```javascript
   // In main.jsx or component
   initMicrointeractions();
   ```

3. **Verify class names**
   - Use exact class names from reference
   - Check for typos

### Scroll Reveal Not Triggering?

1. **Element must start off-screen or below fold**
2. **Check IntersectionObserver support**
3. **Verify element has `.scroll-reveal` class**

### Buttons Not Showing Ripple?

1. **Check button has correct class** (`.button`, `.btn-primary`, etc.)
2. **Verify CSS pseudo-element** (`::before`) is not blocked
3. **Ensure button has `position: relative`** (automatic with our classes)

### Glassmorphism Not Showing?

1. **Check browser support** for `backdrop-filter`
2. **Verify element has background behind it** (glass effect needs content beneath)
3. **Ensure proper stacking context** with `z-index`

---

## Browser Support

### Full Support
- Chrome 76+
- Edge 79+
- Safari 9+
- Firefox 103+

### Graceful Degradation
- Older browsers see solid backgrounds
- All functionality remains intact
- Only visual blur effect is missing

---

## Performance Tips

### Optimize Glass Effects
```css
/* Only apply blur to visible elements */
.glass-card {
  will-change: transform;
}

/* Limit blur area */
.modal {
  backdrop-filter: blur(20px);
  /* Not: blur(50px) - too expensive */
}
```

### Efficient Scroll Listeners
```javascript
// Our implementation uses IntersectionObserver
// No need for scroll event listeners
// Better performance automatically
```

### Reduce Animation Complexity
```javascript
// Good: Transform and opacity only
transform: translateY(20px);
opacity: 0;

// Avoid: Layout properties
margin-top: 20px; // Causes reflow
height: auto; // Causes reflow
```

---

## Examples in Production

### Navigation Header
- File: `src/components/Header.jsx`
- Automatic glassmorphism on scroll
- No changes needed to component code

### Pricing Page
- File: `src/pages/Pricing.jsx`
- Scroll-reveal on pricing cards
- Staggered entrance animations
- Glass effect on all cards

### Home Page
- File: `src/pages/Home.jsx`
- Hero section animations
- Feature list stagger effects
- Testimonial carousel glass cards

---

## CSS Variables for Customization

```css
/* Override timing */
:root {
  --transition-fast: 0.2s;
  --transition-base: 0.3s;
  --transition-slow: 0.6s;

  --glass-opacity: 0.05;
  --glass-blur: 10px;

  --brand-color: #9EF01A;
  --brand-glow: rgba(158, 240, 26, 0.3);
}
```

---

## Accessibility Notes

### Reduced Motion
All animations automatically respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled automatically */
}
```

### Focus Indicators
Enhanced focus states for keyboard navigation:
- 2px outline in brand color
- 4px shadow ring
- High contrast
- WCAG 2.1 AA compliant

### Screen Readers
- Tooltips have `role="tooltip"`
- Decorative elements have `aria-hidden="true"`
- All interactive elements are keyboard accessible

---

## Need Help?

For questions or issues:
1. Check browser console for errors
2. Verify CSS import order in `main.jsx`
3. Test with reduced motion disabled
4. Review implementation documentation

The glassmorphism and micro-interaction system is designed to be intuitive and just work. Most effects are automatic - just use the standard component classes!
