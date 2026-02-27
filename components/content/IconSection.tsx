"use client";

import Image from "next/image";

export default function IconSection({ data }: any) {

  return (
    <>
    {data.title === "Why Lyca?" && (
            <section className="w-full bg-[rgb(239,248,255)] py-10">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Section Title */}
                    <h2 className="text-4xl font-semibold text-center text-[#1f2756] mb-16">
                    {data.title}
                    </h2>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {data.items?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col items-center">

                        {/* Circular Icon */}
                        <div className="relative flex items-center justify-center mb-6">
                            <Image
                            src={`${process.env.NEXT_PUBLIC_AEM_HOST}${item.subContainerImage._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                            alt={item.subContainerText}
                            width={90}
                            height={90}
                            className="object-contain"
                            />
                        </div>

                        {/* Heading */}
                        <h3 className="text-lg font-semibold text-[#1f2756] mb-3">
                            {item.subContainerText}
                        </h3>

                        {/* Description (AEM HTML) */}
                        <div
                            className="text-gray-700 text-sm leading-relaxed max-w-xs mb-4"
                            dangerouslySetInnerHTML={{
                            __html: item.subContainerDescription?.html,
                            }}
                        />

                        {/* Read More */}
                        <button className="text-blue-600 font-medium hover:underline">
                            {item.readMoreText}
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
    )}
    {data.title === "We are here to help you" && (
        <section className="w-full bg-[#e9eef3] py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
            
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-semibold text-[#2d3748] mb-16">
                {data.title}
            </h2>

            {/* Icons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 flex-wrap justify-center ">
                {data.items?.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                    
                    {/* Blue Circle */}
                    <div className=" flex items-center justify-center mb-6 hover:scale-105 transition duration-300">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_AEM_HOST}${item.subContainerImage._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                        alt={item.subContainerText}
                        width={106}
                        height={106}
                        className="object-contain"
                    />
                    </div>

                    {/* Text */}
                    <p className="text-lg font-medium text-[#1f2937] max-w-xs">
                    {item.subContainerText}
                    </p>
                </div>
                ))}
            </div>
            </div>
        </section>
    )}
    {data.title === "Cheap international calls for everyone" && (
        <section className="w-full bg-[#f2f4f7] py-16">
            <div className="max-w-7xl mx-auto px-4">

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-medium text-center text-[#2d3748] mb-14">
                {data.title}
            </h2>

            {/* Slider Row */}
            <div className="flex items-center justify-between">

                {/* Left Arrow */}
                <button className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition text-black">
                ←
                </button>

                {/* Countries */}
                <div className="flex items-center gap-16 overflow-x-auto scrollbar-hide px-6">
                {data.items?.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center min-w-[120px]">
                    
                    {/* Flag Circle */}
                    <div className="flex items-center justify-center mb-4">
                        <img
                        src={`${process.env.NEXT_PUBLIC_AEM_HOST}${item.subContainerImage._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                        alt={item.subContainerText}
                        className="w-14 h-14 object-contain rounded-full"
                        />
                    </div>

                    {/* Country Name */}
                    <p className="text-lg text-[#2d3748] font-medium">
                        {item.subContainerText}
                    </p>
                    </div>
                ))}
                </div>

                {/* Right Arrow */}
                <button className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition text-black">
                →
                </button>
            </div>
            </div>
        </section>
    )}
    </>
  );
}