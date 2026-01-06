
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sale' | 'new' | 'limited';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'new', className = '' }) => {
  const baseStyles = 'px-2 py-1 text-xs font-semibold tracking-wider uppercase';

  const variantStyles = {
    sale: 'bg-rose text-white',
    new: 'bg-sage text-white',
    limited: 'bg-lavender text-soft-black',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
