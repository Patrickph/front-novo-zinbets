"use client";
import { useSwiper, Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { useState } from "react";
import GameCard from "@/components/GameCard";

export default function CarouselItems() {
  const [swiper, setSwiper] = useState<any>({});

  const carousel = [
    {
      key: 1,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/games/mines.png`,
      alt: "Mines",
      name: "Mines",
      href: "/mines",
    },
    {
      key: 2,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/games/crash_zinbets.png`,
      alt: "Crash",
      name: "Crash",
      href: "/crash",
    },
    {
      key: 3,
      src: `/${process.env.NEXT_PUBLIC_SITE_NAME}/games/double_zinbets.png`,
      alt: "Double",
      name: "Double",

      href: "/double",
    },
  ];

  return (
    <div className="items">
      <div className="w-full mb-4 flex justify-between">
        <h2 className="text-base items-center flex gap-2 font-bold ">
          <span className="">Originais</span>
        </h2>

        {/*   <div className="flex gap-2">
          <Link href={"/"} className="text-[#8845fa]">
            Ver todos
          </Link>
        </div> */}
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={setSwiper}
        controller={{ control: swiper }}
        slidesPerView={2.7}
        autoplay
        breakpoints={{ 1024: { slidesPerView: 5, spaceBetween: 12 } }}
        spaceBetween={6}
        freeMode={true}
        className="w-full max-w-full z-10"
      >
        {carousel.map((item) => (
          <SwiperSlide key={item.key} className="rounded-3xl">
            <GameCard game={item} provider="Originais" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
