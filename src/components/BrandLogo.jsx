import WhozaLogo from './WhozaLogo';

export default function BrandLogo({ className = '', height = 50, variant = 'dark' }) {
  return (
    <WhozaLogo className={className} height={height} variant={variant} />
  );
}
