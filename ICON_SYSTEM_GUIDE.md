# Custom Iconography System

## Overview

The whoza.ai platform now features a custom iconography system with 20 angular, sharp-styled icons that align with the brand identity.

## Icon Component

All icons are accessible through a single `Icon` component:

```jsx
import Icon from '../components/icons/Icon';

// Basic usage
<Icon name="CheckIcon" size={24} />

// With color and className
<Icon name="VisibilityIcon" size={32} color="#0095ff" className="my-icon" />
```

## Available Icons

### UI Icons (10)

Located in `/src/components/icons/ui/`:

1. **CheckIcon** - Angular checkmark for confirmations
2. **ArrowRightIcon** - Sharp arrow for navigation
3. **ChevronDownIcon** - V-shape for dropdowns/accordions
4. **CloseIcon** - X for dismissing/closing
5. **PlusIcon** - Add/expand actions
6. **MinusIcon** - Remove/collapse actions
7. **ExternalLinkIcon** - Link to external resources
8. **SettingsIcon** - Configuration/settings
9. **UserIcon** - User profile/account
10. **SearchIcon** - Search functionality

### Feature Icons (10)

Located in `/src/components/icons/features/`:

1. **VisibilityIcon** - Eye with lightning bolt (brand signature)
2. **GuaranteeIcon** - Shield with lightning bolt (brand signature)
3. **TaskIcon** - Task/checklist representation
4. **ScoreIcon** - Bar chart for metrics
5. **CompetitorIcon** - Competitor tracking
6. **StrategyIcon** - Strategic planning
7. **SupportIcon** - Customer support headset
8. **SecurityIcon** - Shield with checkmark
9. **EmailIcon** - Email communication
10. **WhatsAppIcon** - WhatsApp messaging

## Design Characteristics

All icons share consistent styling:
- **Angular design**: Sharp, professional appearance
- **Stroke-based**: 1.5px stroke width
- **Butt line caps**: Sharp, not rounded
- **Miter line joins**: Angular corners
- **Consistent sizing**: Default 24x24px viewBox

## Integration Status

Icons have been integrated in:
- ✅ Pricing page (feature lists, FAQ accordions, trust signals)
- ✅ Home page (hero social proof, readiness section)
- ✅ Guarantee section (shield icon)
- ✅ Trust signals (security, support icons)

## Usage Examples

### Pricing Page Features
```jsx
<Icon name="CheckIcon" size={20} className="feature-check" />
```

### FAQ Accordions
```jsx
<Icon name="ChevronDownIcon" size={20} className="faq-icon" />
```

### Trust/Security Sections
```jsx
<Icon name="GuaranteeIcon" size={48} />
<Icon name="SecurityIcon" size={32} />
```

### Navigation/Actions
```jsx
<Icon name="ArrowRightIcon" size={24} />
<Icon name="ExternalLinkIcon" size={20} />
```

## Props

- **name** (required): Icon name from the registry
- **size** (optional): Width/height in pixels (default: 24)
- **color** (optional): Icon color (default: 'currentColor')
- **className** (optional): Additional CSS classes
- **...props**: Any other props passed to the SVG element

## Benefits

1. **Centralized Management**: All icons in one location
2. **Consistent Branding**: Angular design matches platform identity
3. **Easy Updates**: Change icon designs in one place
4. **Type Safety**: Component warns if icon not found
5. **Flexible Styling**: Inherits text color by default
6. **Performance**: Inline SVG for optimal loading
7. **Accessibility**: Proper ARIA attributes supported

## Adding New Icons

To add a new icon:

1. Create the icon component in appropriate folder (ui/ or features/)
2. Use the same design pattern (stroke-based, angular)
3. Export from the folder's index.js
4. Icon automatically available via Icon component

## Build Status

✅ Project builds successfully with all icons integrated
✅ All custom icons rendering correctly
✅ No TypeScript/build errors
