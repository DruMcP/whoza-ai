import { forwardRef } from 'react';

/**
 * Premium Button Component
 * Variants: primary, secondary, cta, katie, rex, claire, outline, ghost
 * Sizes: sm, md, lg
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    as: Component = 'button',
    href,
    disabled,
    ...props
  },
  ref
) {
  const variantClasses = {
    primary: 'ds-btn ds-btn-primary',
    secondary: 'ds-btn ds-btn-secondary',
    cta: 'ds-btn ds-btn-cta',
    katie: 'ds-btn ds-btn-katie',
    rex: 'ds-btn ds-btn-rex',
    claire: 'ds-btn ds-btn-claire',
    outline: 'ds-btn ds-btn-secondary',
    ghost: 'ds-btn bg-transparent text-navy-900 hover:bg-slate-100',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 min-h-[40px] rounded-lg',
    md: '',
    lg: 'ds-btn-lg',
  };

  const baseClasses = [
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || '',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  ].filter(Boolean).join(' ');

  if (Component === 'a' || href) {
    return (
      <a ref={ref} href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Component ref={ref} className={baseClasses} disabled={disabled} {...props}>
      {children}
    </Component>
  );
});

export default Button;
