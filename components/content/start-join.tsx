"use client";

import Image from "next/image";

export default function StartJoin({ data }: any) {
  return (
    <div className="w-full bg-[#1f2756] text-white pt-16 pb-70 relative">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto text-center px-4">

        {/* Title */}
        <h2 className="text-4xl font-semibold mb-4" id="startjointitle">
          {data.title}
        </h2>

        {/* Description (AEM Rich Text) */}
        <div
          className="text-sm font-light mb-10 [&_p]:m-0 [&_a]:text-[#00aaff] [&_a]:underline"
          dangerouslySetInnerHTML={{
            __html: data.description?.plaintext || "",
          }}
        />

        {/* Icon Circles */}
        <div className="flex justify-center gap-12 mt-8">
          {data.startJoin?.map((item: any, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <div className=" rounded-full flex items-center justify-center mb-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_AEM_HOST}${item.subContainerImage._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                  alt={item.subContainerText}
                  width={85}
                  height={85}
                />
                
              </div>
              <p className="text-sm font-medium">
                {item.subContainerText}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Already With Lyca Card */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-22 w-full max-w-4xl bg-white text-[#1f2756] rounded-lg shadow-xl p-10">

        <h3 className="text-[#384c72] text-3xl font-bold text-center mb-2">
          {data.alreadyJoinTitle}
        </h3>

        <p className="text-center text-sm font-light mb-6">
          {data.alreadyJoinDescription}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {data.alreadyJoinButtons?.map((btn: string, index: number) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full border ${
                index === 0
                  ? "bg-[#006ae0] text-white border-[#006ae0]"
                  : "border-gray-400 text-gray-700"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex justify-center mb-6">
          <div className="flex border rounded-md overflow-hidden w-96">
            <div className="px-4 py-2 bg-gray-100 text-sm">+44</div>
            <input
              type="text"
              placeholder={data.placeHolder}
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="px-4 bg-[#006ae0] text-white">
              →
            </button>
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center text-sm font-light">
          {data.downloadText}
          <a href="#" className="text-[#006ae0] font-medium ml-1">
            {data.downloadButton} →
          </a>
        </div>
      </div>
    </div>
  );
}