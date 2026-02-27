"use client";

import Image from "next/image";

export default function StripBar({ dataPage }: any) {
  return (
    <div className="w-full bg-[#1565C0] py-5">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-4 text-white">
        
        {/* Logo */}
          <div className="relative w-10 h-10">
            <Image
              src={dataPage?.stripBarLogo}
              alt="Strip Logo"
              fill
              className="object-contain"
            />
          </div>
            
        {/* Text */}
        <p className="text-lg font-medium flex items-center gap-2">
          {dataPage?.stripBarText}
          <span className="text-xl">→</span>
        </p>
      </div>
    </div>
  );
}