# 5R-AI UI Design & Animation Guide

## Overview

This document details the micro-interactions, animations, and UI behaviors implemented in the 5R-AI website. All animations are purposeful, subtle, and designed to enhance user experience without being distracting.

---

## Animation Philosophy

### Core Principles

1. **Purposeful** - Every animation serves a clear purpose (feedback, guidance, or emphasis)
2. **Subtle** - Animations are noticeable but not overwhelming
3. **Performance-Conscious** - GPU-accelerated transforms for smooth 60fps animations
4. **Accessible** - Respects user preferences for reduced motion
5. **Consistent** - Similar elements animate in similar ways

### Animation Timing

- **Fast** (150ms) - Micro-interactions like hover states
- **Base** (250ms) - Standard transitions for most elements
- **Slow** (350ms) - Complex state changes and transformations
- **Long** (600-800ms) - Scroll-triggered entrance animations

---

## Global Behaviors

### Smooth Scrolling

```css
html {
  scroll-behavior: smooth;
}
```

- Applies to all anchor links and programmatic scrolling
- Creates fluid navigation experience
- Automatically disabled for users who prefer reduced motion

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* Disables all animations for users with motion sensitivity */
}
```

- Respects user accessibility preferences
- Reduces animation duration to near-instant
- Maintains functionality while removing motion

---

## Scroll-Triggered Animations

### Implementation

Uses Intersection Observer API to trigger animations when elements enter viewport:

```javascript
initScrollAnimations()
```

### Animation Types

#### 1. Fade In
- **Usage**: General content reveal
- **Effect**: Opacity 0 → 1
- **Duration**: 800ms
- **Class**: `.animate-on-scroll.fade-in`

#### 2. Slide Up
- **Usage**: Text blocks, paragraphs, lists
- **Effect**: Fade in + translate Y(30px → 0)
- **Duration**: 800ms
- **Class**: `.animate-on-scroll.slide-up`

#### 3. Scale In
- **Usage**: CTAs, important elements, cards
- **Effect**: Fade in + scale(0.95 → 1)
- **Duration**: 600ms
- **Class**: `.animate-on-scroll.scale-in`

#### 4. Slide In Left
- **Usage**: Left-aligned content
- **Effect**: Fade in + translate X(-30px → 0)
- **Duration**: 800ms
- **Class**: `.animate-on-scroll.slide-in-left`

#### 5. Slide In Right
- **Usage**: Right-aligned content
- **Effect**: Fade in + translate X(30px → 0)
- **Duration**: 800ms
- **Class**: `.animate-on-scroll.slide-in-right`

### Staggered Animations

Use delay classes for sequential reveals:

```html
<div class="animate-on-scroll slide-up delay-100">...</div>
<div class="animate-on-scroll slide-up delay-200">...</div>
<div class="animate-on-scroll slide-up delay-300">...</div>
```

**Available Delays**: 100ms, 200ms, 300ms, 400ms, 500ms

---

## Interactive Element Animations

### Buttons

#### Primary Buttons

**Default State**:
- Solid background color
- Box shadow for depth
- Subtle gradient overlay

**Hover State**:
- Background darkens
- Shadow increases (SM → MD)
- Lifts 1px up
- Gradient overlay fades in
- Transition: 250ms

**Active State**:
- Returns to original position
- Shadow reduces back to SM
- Provides tactile "press" feedback

**Focus State**:
- 3px teal outline
- 2px offset from button
- High visibility for keyboard navigation

**Ripple Effect**:
- Click triggers circular ripple animation
- Ripple expands from click point
- White overlay at 60% opacity
- Duration: 600ms
- Function: `addRippleEffect()`

#### Secondary Buttons

**Hover State**:
- Background changes to off-white
- Border color changes to primary blue
- Text color darkens slightly

---

### Links

#### Default State
- Blue color (#1364a0)
- Underline with 2px offset
- 1px thickness

#### Hover State
- Color darkens to #104f7e
- Underline thickens to 2px
- Transition: 150ms

#### Navigation Links

**Special Behavior**:
- No underline by default
- Animated underline appears on hover
- Underline scales from 0 to full width
- Positioned at bottom of link
- 2px height, primary blue color

```css
.header-nav a::after {
  /* Animated underline */
}
```

---

### Form Inputs

#### Default State
- 2px border
- Rounded corners (8px)
- Clean, minimal appearance

#### Hover State
- Border color changes to lighter primary blue
- Transition: 150ms

#### Focus State
- Border color becomes primary blue
- Glowing box shadow (3px, 10% opacity)
- Lifts 1px up
- Clear visual feedback for active field

#### Transitions
- All properties animate smoothly
- 150ms duration for responsiveness

---

### Cards

#### Default State
- White background
- Light border
- Small shadow
- Rounded corners (12px)

#### Hover State
- Shadow increases (SM → MD)
- Lifts 2px up
- Border color tints to primary blue
- Transition: 250ms
- Creates depth and interactivity

#### Grid Cards
- Staggered entrance animations
- Each card delays by 100ms
- Scale-in effect

---

### Step Numbers

#### Visual Design
- Circular gradient badges
- Navy to dark navy gradient (135deg)
- White numbers
- 56px × 56px (48px mobile)
- Rounded corners (12px)
- Medium shadow

#### Hover Interaction
- Scales to 105%
- Rotates -3 degrees
- Shadow increases (MD → LG)
- Playful, engaging feedback

---

### Header

#### Sticky Behavior
- Stays at top of viewport on scroll
- Slight blur background effect
- Semi-transparent white (98% opacity)
- Subtle shadow for separation

#### Logo Hover
- Scales to 102%
- Quick 150ms transition
- Subtle brand interaction

#### Mobile Behavior
- Sticky positioning disabled
- Returns to relative positioning
- Prevents mobile scroll issues

---

## Page-Specific Animations

### Home Page Hero

**Sequence**:
1. Headline: Scale-in animation (immediate)
2. Description: Slide-up animation (200ms delay)
3. CTA Button: Scale-in animation (300ms delay)

**Effect**: Creates clear hierarchy and guides eye flow

### Content Sections

**Pattern**:
- Heading animates first (slide-up)
- Content paragraphs stagger in (100-200ms delays)
- Cards/CTAs animate last (scale-in)

**Purpose**: Establishes reading order and information hierarchy

### "How It Works" Steps

**Sequence**:
1. Section heading slides up
2. Each step slides up sequentially (100ms stagger)
3. Creates flowing, narrative feel
4. Step numbers have hover micro-interaction

### Cards Grid

**Pattern**:
- Three cards animate in sequence
- Scale-in effect for emphasis
- 100ms stagger between cards
- Draws attention to key features

---

## Loading States

### Pulse Animation

Available for loading indicators:

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

**Usage**: Can be applied to loading spinners or placeholder content

---

## Table Interactions

### Row Hover
- Background changes to light neutral
- 150ms transition
- Provides clear visual feedback
- Improves scannability

### Header Styling
- Uppercase text
- Light background
- Clear separation from data
- Professional appearance

---

## Status Badges

### Visual Design
- Pill-shaped (fully rounded)
- Uppercase text
- Generous padding (6px × 14px)
- High contrast colors

### Types

**Sent Status**:
- Light blue background
- Dark blue text
- Indicates pending action

**Approved Status**:
- Light green background
- Dark green text
- Positive confirmation

**Completed Status**:
- Light gray background
- Medium gray text
- Neutral, archived state

---

## Error & Success States

### Error Messages
- Light red background
- Red border on left (4px)
- Dark red text
- Rounded corners
- Shadow for emphasis

### Success Messages
- Light green background
- Green border on left (4px)
- Dark green text
- Same treatment as errors for consistency

---

## Animation Utilities

### Available Classes

```css
.animate-on-scroll       /* Base class for scroll animations */
.fade-in                /* Fade in animation */
.slide-up               /* Slide up animation */
.slide-in-left          /* Slide from left */
.slide-in-right         /* Slide from right */
.scale-in               /* Scale in animation */

.delay-100              /* 100ms delay */
.delay-200              /* 200ms delay */
.delay-300              /* 300ms delay */
.delay-400              /* 400ms delay */
.delay-500              /* 500ms delay */
```

### Usage Example

```html
<div class="card animate-on-scroll scale-in delay-200" data-animation="scale-in">
  <!-- Content -->
</div>
```

---

## JavaScript Functions

### Core Animation Functions

Located in: `src/utils/animations.js`

#### `initScrollAnimations()`
- Sets up Intersection Observer
- Watches for elements with `.animate-on-scroll`
- Triggers animations when elements enter viewport
- Only animates once per element

#### `addRippleEffect(event)`
- Creates ripple effect on buttons
- Calculates ripple position from click point
- Removes ripple after animation completes
- Attached to all buttons and `.button` class

#### `smoothScrollTo(targetId)`
- Scrolls to element by ID
- Accounts for header offset (80px)
- Smooth animation
- Fallback for browsers without CSS smooth scroll

---

## Performance Considerations

### Optimizations

1. **GPU Acceleration**
   - Uses `transform` instead of `top/left`
   - Uses `opacity` for fades
   - Triggers hardware acceleration

2. **Will-Change Property**
   - Not overused (can cause issues)
   - Applied only to frequently animated elements

3. **Animation Cleanup**
   - Ripples removed from DOM after completion
   - Event listeners cleaned up in useEffect
   - Observers disconnect when done

4. **Reduced Motion**
   - Respects system preferences
   - Disables animations for accessibility
   - Maintains functionality

---

## Browser Compatibility

### CSS Features Used

- CSS Custom Properties (variables)
- CSS Grid
- Flexbox
- Transform
- Transition
- Animation
- Backdrop Filter (progressive enhancement)

### JavaScript APIs Used

- Intersection Observer API
- Modern DOM methods
- Event listeners

### Fallbacks

- Smooth scroll: Falls back to instant scroll
- Backdrop filter: Degrades gracefully to solid background
- Animations: Gracefully removed for reduced motion preference

---

## Best Practices for Adding New Animations

### When to Animate

**DO animate:**
- First-time element appearance
- State changes (hover, focus, active)
- Loading states
- Success/error feedback
- Navigation transitions

**DON'T animate:**
- Every interaction (causes fatigue)
- Large layout shifts (jarring)
- Critical information (accessibility)
- Constantly repeating elements (annoying)

### Animation Checklist

When adding new animations:

- [ ] Serves clear purpose (feedback, guidance, emphasis)
- [ ] Duration is appropriate (not too slow)
- [ ] Easing feels natural
- [ ] Works on mobile
- [ ] Respects reduced motion preferences
- [ ] Doesn't block user interaction
- [ ] Doesn't cause layout shift
- [ ] Performs smoothly (60fps)

---

## Testing Animations

### Manual Testing

1. **Visual Check**
   - Animations feel smooth and natural
   - Timing feels right
   - No janky or stuttering motion

2. **Interaction Check**
   - Hover states are responsive
   - Click feedback is immediate
   - Focus states are visible

3. **Scroll Check**
   - Elements animate on scroll
   - Only animate once
   - Performance is smooth

4. **Mobile Check**
   - Touch interactions work
   - Animations perform well
   - No animation conflicts

5. **Accessibility Check**
   - Keyboard navigation works
   - Reduced motion is respected
   - Focus is always visible

### Browser Testing

- Chrome/Edge (Chromium)
- Firefox
- Safari (desktop & iOS)
- Mobile browsers

---

## Future Enhancement Ideas

### Potential Additions

1. **Page Transitions**
   - Fade between route changes
   - Smooth navigation experience

2. **Micro-Interactions**
   - Toast notifications
   - Progress indicators
   - Skeleton screens

3. **Advanced Scrolling**
   - Parallax effects (subtle)
   - Scroll progress indicator
   - Sticky section headers

4. **Loading States**
   - Skeleton loaders
   - Progressive image loading
   - Optimistic UI updates

5. **Interactive Charts**
   - Animated data visualization
   - Count-up animations
   - Progress rings

---

## Maintenance Notes

### Regular Checks

- Monitor animation performance
- Update for new browser features
- Test on new devices
- Gather user feedback
- Refine based on analytics

### When to Remove Animations

- User feedback indicates distraction
- Performance issues on low-end devices
- Accessibility concerns arise
- Animations don't serve purpose

---

## Code Organization

### File Structure

```
src/
├── index.css           # All CSS including animations
├── utils/
│   └── animations.js   # Animation utilities
└── pages/
    └── Home.jsx        # Example implementation
```

### CSS Section Organization

1. Variables
2. Reset & Base Styles
3. Typography
4. Layout Components
5. Interactive Elements
6. Animations (keyframes)
7. Utility Classes
8. Media Queries

---

## Accessibility Statement

All animations and micro-interactions in 5R-AI follow WCAG 2.1 guidelines:

- **AA Compliance**: All interactive elements meet contrast requirements
- **Keyboard Accessible**: All interactions available via keyboard
- **Reduced Motion**: Respects user preferences
- **Focus Visible**: Clear focus indicators on all interactive elements
- **No Seizure Risk**: No rapid flashing or strobing effects

---

*Version 1.0 - December 2024*
