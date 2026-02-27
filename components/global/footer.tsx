"use client";

import Image from "next/image";

export default function Footer({ data }: any) {
  const host = process.env.NEXT_PUBLIC_AEM_HOST;

  return (
    <footer className="w-full bg-[#1f2756] text-white pt-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-12 pb-16">

        {data.footerSectionModel?.map((section: any, index: number) => (
          <div key={section._dynamicUrl || index}>

            {/* Section Title */}
            <h3 className="text-lg font-semibold mb-6">
              {section.footerMenuTitle}
            </h3>

            {/* If menu items exist */}
            {section.footerMenuItems && (
              <ul className="space-y-4 text-sm text-gray-300">
                {section.footerMenuItems.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="hover:text-white cursor-pointer transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* If icon paths exist (Lyca on the go section) */}
            {section.footerIconPaths?.length > 0 && (
              <div className="space-y-4">
                {section.footerIconPaths.map((icon: any, i: number) => {
                  if (!icon?._dynamicUrl) return null;
                  return (
                    <div key={i}>
                      <Image
                        src={`${host}${icon._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                        alt="store icon"
                        width={140}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-600"></div>

      {/* BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div>
          <Image
            src={`${host}${data.logo._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
            alt="Lyca Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-300 text-center">
          {data.copyrightText}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {data.mediaIcons?.map((icon: any, index: number) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            >
              <Image
                src={`${host}${icon._dynamicUrl.replace(/\.(jpg|jpeg|webp)$/i, ".png")}`}
                alt="social icon"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
}