"use client";
import { useSwiper, Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Radio } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { itemsLive } from "@/lib/itemsLive";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { useState } from "react";
import GameCard from "@/components/GameCard";

export default function CarouselItemsLive() {
  const [swiper, setSwiper] = useState<any>({});

  const carousel = itemsLive;

  return (
    <div className="items">
      <div className="w-full mb-4 flex justify-between">
        <h2 className="text-base items-center flex gap-2 font-bold ">
          <span className=" ml-3">Ao vivo</span>
        </h2>

        {/*  <div className="flex gap-2">
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
            <GameCard game={item} provider="Ao vivo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
