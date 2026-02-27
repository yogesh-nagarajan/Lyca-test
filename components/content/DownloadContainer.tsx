"use client";

import Image from "next/image";

export default function DownloadContainer({ data }: any) {
  const host = process.env.NEXT_PUBLIC_AEM_HOST;

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE - MOBILE IMAGE */}
        <div className="flex justify-center">
          <Image
            src={`${host}${data.image.imagePath._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
            alt={data.image.altText}
            width={450}
            height={600}
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div>
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-8 leading-snug">
            {data.title}
          </h2>

          {/* Points */}
          <div className="space-y-5 mb-8">
            {data.points?.map((point: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-green-500 text-green-500">
                  ✓
                </div>
                <p className="text-lg text-gray-700">{point}</p>
              </div>
            ))}
          </div>

          {/* Store Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={data.logo1.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`${host}${data.logo1.imagePath._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                alt={data.logo1.altText}
                width={180}
                height={55}
                className="object-contain"
              />
            </a>

            <a
              href={data.logo2.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`${host}${data.logo2.imagePath._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                alt={data.logo2.altText}
                width={180}
                height={55}
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}