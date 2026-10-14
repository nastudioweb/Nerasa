import React from 'react';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  variant = 'dark',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 4-petal geometric loop logo from Nerasa signage & menu */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#C97A44] transition-transform duration-300 group-hover:rotate-12"
        >
          {/* Outer elegant rounded petals loop */}
          <path
            d="M50 15 C35 15, 20 30, 20 45 C20 60, 35 50, 50 50 C65 50, 80 60, 80 45 C80 30, 65 15, 50 15 Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 85 C35 85, 20 70, 20 55 C20 40, 35 50, 50 50 C65 50, 80 40, 80 55 C80 70, 65 85, 50 85 Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 50 C15 35, 30 20, 45 20 C60 20, 50 35, 50 50 C50 65, 40 80, 55 80 C70 80, 85 65, 85 50"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          {/* Inner core root node */}
          <circle cx="50" cy="50" r="4.5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-wider lowercase transition-colors ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#231F1C]'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          nerasa
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C97A44] mt-0.5">
            Discover The Root Of Taste
          </span>
        )}
      </div>
    </div>
  );
};
