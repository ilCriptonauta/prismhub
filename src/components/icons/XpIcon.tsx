import React from 'react';

export const XpIcon = ({ className = 'w-6 h-6', ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {/* Main central 4-pointed star */}
        <path d="M12 3c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9Z" />

        {/* Plus sign top right */}
        <path d="M18.5 4v4M16.5 6h4" />

        {/* Dot bottom left */}
        <circle cx="6" cy="18" r="1.5" fill="currentColor" />
    </svg>
);
