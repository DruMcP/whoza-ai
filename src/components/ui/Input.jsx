import { forwardRef } from 'react';

/**
 * Premium Input Component
 */
const Input = forwardRef(function Input(
  {
    className = '',
    label,
    error,
    helperText,
    id,
    ...props
  },
  ref
) {
  const inputClasses = [
    'ds-input',
    error && 'border-red-400 focus:border-red-400 focus:shadow-red-100',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="ds-label">
          {label}
        </label>
      )}
      <input ref={ref} id={id} className={inputClasses} {...props} />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

export default Input;
