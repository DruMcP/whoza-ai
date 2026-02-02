import { forwardRef } from 'react';
import * as UIIcons from './ui';
import * as FeatureIcons from './features';

const iconRegistry = {
  ...UIIcons,
  ...FeatureIcons
};

const Icon = forwardRef(({ name, size = 24, color = 'currentColor', className = '', ...props }, ref) => {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
        return null;
  }

  return (
    <IconComponent
      ref={ref}
      width={size}
      height={size}
      color={color}
      className={className}
      {...props}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;
