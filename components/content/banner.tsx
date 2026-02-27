"use client";

import Image from "next/image";

export default function Banner({ data }: any) {
  return (
    <section className="w-full bg-[#f5f5f5] pb-16 pt-40">
      
      {/* Title + Description */}
      <div className="max-w-6xl mx-auto text-center px-4 mb-12">
        <h2 className="text-4xl font-semibold text-[#1f2756] mb-4">
          {data.clickableBannerTitle}
        </h2>

        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          {data.clickableBannerDescription}
        </p>
      </div>

      {/* Banner Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {data.images?.map((item: any, index: number) => (
          <div key={index} className="group cursor-pointer">
            
            <a
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* Image Wrapper with Original Ratio */}
              <div className="relative w-full aspect-[528/665] overflow-hidden rounded-md shadow-lg bg-white">
                <Image
                  src={`${process.env.NEXT_PUBLIC_AEM_HOST}${item.imagePath._dynamicUrl}`}
                  alt={item.altText || "Banner"}
                  fill
                  sizes="(max-width: 768px) 100vw, 528px"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
            </a>

            {/* Title Below Image */}
            {item.title && (
              <h3 className="mt-4 text-lg font-semibold text-[#1f2756] text-center">
                {item.title}
              </h3>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}