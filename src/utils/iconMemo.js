/**
 * Icon Memoization Utility
 * Wraps icon components with React.memo for performance optimization
 * Icons are pure components that rarely change, making them perfect for memoization
 */
import { memo } from 'react';

/**
 * Memoize an icon component with proper display name
 * @param {Function} IconComponent - The icon component to memoize
 * @param {string} name - Display name for debugging
 * @returns {Function} Memoized component
 */
export function memoizeIcon(IconComponent, name) {
  const MemoizedIcon = memo(IconComponent);
  MemoizedIcon.displayName = `Memo(${name})`;
  return MemoizedIcon;
}

/**
 * Performance-optimized comparison function for icons
 * Icons typically only need to re-render if size, color, or className changes
 */
export function iconPropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.size === nextProps.size &&
    prevProps.color === nextProps.color &&
    prevProps.className === nextProps.className
  );
}
