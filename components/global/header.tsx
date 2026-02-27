"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header(data: any){
    //console.log("Header Data:", data);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
      setActiveIndex(activeIndex === index ? null : index);
    };


    return (
      <header className="flex items-center px-10 py-6 mx-10 bg-white">
      {/* LEFT: Logo + Hamburger */}
      <div className="flex items-center gap-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_AEM_HOST}${data.logo._dynamicUrl}`}
          alt="Lyca Logo"
          width={110}
          height={40}
          priority
        />

        <button aria-label="Menu" className="pl-2" onClick={() => setIsOpen(true)}>
          <Image
            src={data.hamBurgerIcon}
            alt="Menu"
            width={24}
            height={16}
            priority
          />
        </button>

      </div>

      {/* CENTER: Main Navigation */}
      <nav aria-label="Main Navigation" className="ml-10">
        <ul className="flex gap-8 items-center">
          {data.navItems.map((item : any) => (
            <li key={item.text}>
              <Link
                href={item.link}
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT: Utility Section */}
      <div className="ml-auto flex items-center gap-6">
        {/* Quick Top Up */}
        <button
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => window.open("https://www.lycamobile.co.uk/quick-top-up", "_blank")}
        >
          {data.utilityLinkText}
        </button>

        {/* Account */}
        <div className="flex items-center gap-1 cursor-pointer">
          <Image
            src={data.accountLogo}
            alt="Account"
            width={30}
            height={20}
            priority
          />
          <Image
            src="https://www.lycamobile.co.uk/_next/static/media/blueArrowDownIcon.b90ed1bc.svg"
            alt="Dropdown"
            width={12}
            height={8}
            priority
          />
        </div>

        {/* Cart */}
        <Image
          src={data.cartLogoLink}
          alt="Cart"
          width={30}
          height={20}
          priority
          className="cursor-pointer"
        />

        {/* Language */}
        <div className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <span>{data.language}</span>
          <Image
            src={`${process.env.NEXT_PUBLIC_AEM_HOST}${data.flag._dynamicUrl}`}
            alt="Flag"
            width={18}
            height={18}
            priority
          />
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-[380px] bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-6 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_AEM_HOST}${data.logo._dynamicUrl}`}
            alt="Lyca Logo"
            width={100}
            height={40}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl font-light"
          >
            <Image
              src={data.closeIcon}
              alt="plus-icon"
              width={41}
              height={41}
            />
          </button>
        </div>

        {/* Drawer Menu */}
        <div className="py-6">
        {data.menu.map((menuItem: any, index : number) => {
          const isActive = activeIndex === index;

          return (
            <div key={menuItem._id} >
              
              {/* MAIN TITLE */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`flex items-center justify-between w-full px-10 py-4 text-left transition-colors duration-300
                ${isActive 
                  ? "bg-blue-700 text-white" 
                  : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg font-medium">
                  {menuItem.title}
                </span>

                {isActive ? (
                  <Image
                    src={data.minusIcon}
                    alt="minus-icon"
                    width={16}
                    height={16}
                    
                  />
                ) : (
                  <Image
                    src={data.plusIcon}
                    alt="plus-icon"
                    width={16}
                    height={16}
                    
                  />
                )}
              </button>

              {/* SUB SECTIONS */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isActive ? "max-h-96" : "max-h-0"
                }`}>
                <ul>
                  {menuItem.subSections.map((sub : any, i : number) => (
                    <li key={i} className="bg-blue-50 border-t border-blue-100">
                      <Link
                        href="#"
                        onClick={() => setIsOpen(false)}
                        className="block px-10 py-4 text-gray-700 hover:bg-blue-100 transition-colors"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

          {/* Language Section */}
          <div className="pt-6 flex justify-between text-sm">
            <span className="text-lg  pl-10">Language</span>
            <span className="font-medium pr-10">{data.language}</span>
          </div>
        </div>
      </div>
    </header>
    )

}