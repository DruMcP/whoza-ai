import { forwardRef } from 'react';

/**
 * Premium Card Component
 * Variants: default, dark, persona-katie, persona-rex, persona-claire, flat
 */
const Card = forwardRef(function Card(
  {
    children,
    variant = 'default',
    className = '',
    hover = true,
    as: Component = 'div',
    ...props
  },
  ref
) {
  const variantClasses = {
    default: 'ds-card',
    dark: 'ds-card-dark',
    'persona-katie': 'ds-card-persona-katie',
    'persona-rex': 'ds-card-persona-rex',
    'persona-claire': 'ds-card-persona-claire',
    flat: 'bg-white rounded-2xl p-8',
  };

  const hoverClass = hover && variant === 'default' ? '' : '';

  const baseClasses = [
    variantClasses[variant] || variantClasses.default,
    hoverClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={baseClasses} {...props}>
      {children}
    </Component>
  );
});

export default Card;
