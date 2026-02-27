"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../../components/global/header";
import Carousel from "../../components/content/carousel";
import StartJoin from "../../components/content/start-join";
import Banner from "../../components/content/banner";
import StripBar from "../../components/content/stripBar";
import IconSection from "../../components/content/IconSection";
import DownloadContainer from "../../components/content/DownloadContainer";
import EmailContainer from "../../components/content/email-container";
import Footer from "../../components/global/footer";

export default function HomePage({ dataPage }: any) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header {...dataPage.header} />

      {isOpen && (
        <div className="w-full bg-[#ffeeb2]">
          <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2">
            
            <div
              className="text-center flex-1 text-base font-[400] text-gray-900 text-[#006ae0] flex-1"
              dangerouslySetInnerHTML={{
                __html: dataPage.textBanner.plaintext,
              }}
            />

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close banner"
              className="ml-4 flex-shrink-0 p-1 hover:bg-black/5 transition"
            >
              <Image
                src={dataPage.header.closeIcon}
                alt="Close"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      )}

      {dataPage.components?.map((component: any, index: number) => (
        <div key={index}>
          {component.__typename === "CarouselModel" && (
            <Carousel
              prevArrow={component.prevArrow}
              nextArrow={component.nextArrow}
              carousel={component.carousel}
            />
          )}
          
          {component.__typename === "StartJoinModel" && (<StartJoin data={component} />)}
          {component.__typename === "ClickableBannerModel" && (<Banner data={component} />)}
          
        </div>
        
      ))}   
      <StripBar dataPage={dataPage} />
      {dataPage.components?.map((component: any, index: number) => (
        <div key={index}>
          {component.__typename === "IconSectionModel" && (<IconSection data={component}/>)}
          {component.__typename === "DownloadContainerModel" && (<DownloadContainer data={component}/>)}

        </div>
        
      ))}
      <EmailContainer data={dataPage} />
      <Footer data={dataPage.footer} />
    </>
  );
}
