/**
 * Premium Badge Component
 * Variants: green, amber, red, blue, navy, katie, rex, claire
 * Sizes: sm, md
 */
export default function Badge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const variantClasses = {
    green: 'ds-badge ds-badge-green',
    amber: 'ds-badge ds-badge-amber',
    red: 'ds-badge ds-badge-red',
    blue: 'ds-badge ds-badge-blue',
    navy: 'ds-badge ds-badge-navy',
    katie: 'ds-badge ds-badge-blue',
    rex: 'ds-badge ds-badge-green',
    claire: 'ds-badge ds-badge-amber',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-1',
    md: '',
    lg: 'text-sm px-4 py-2',
  };

  const baseClasses = [
    variantClasses[variant] || variantClasses.blue,
    sizeClasses[size] || '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={baseClasses} {...props}>
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      {children}
    </span>
  );
}
