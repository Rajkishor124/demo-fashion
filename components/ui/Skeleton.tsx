import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={`bg-beige relative overflow-hidden ${className}`}
    >
      <div 
        className="absolute inset-0 animate-shimmer"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          backgroundSize: '1000px 100%',
        }}
      />
    </div>
  );
};

export default Skeleton;
