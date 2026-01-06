
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '', type = 'button', ...props }) => {
  const baseStyles = 'px-6 py-3 font-sans text-sm font-medium tracking-wider uppercase transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose';

  const variantStyles = {
    primary: 'bg-soft-black text-cream hover:bg-charcoal',
    secondary: 'bg-transparent text-soft-black border border-soft-black hover:bg-soft-black hover:text-cream',
    ghost: 'bg-transparent text-soft-black hover:bg-light-gray',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
