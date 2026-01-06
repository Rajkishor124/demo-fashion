
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`p-2 rounded-full text-charcoal hover:bg-beige transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
