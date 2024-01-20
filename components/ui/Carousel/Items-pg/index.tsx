"use client";
import GameCard from "@/components/GameCard";
import { ItemsPg } from "@/lib/itemspg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CarouselItemsPg() {
  const [swiper, setSwiper] = useState<any>({});
  const carousel = ItemsPg;

  return (
    <div className="items">
      <div className="w-full mb-4 flex justify-between">
        <h2 className="text-base items-center flex gap-2 font-bold ">
          <span className="">Slots</span>
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
        {carousel.map((item, index) => (
          <SwiperSlide key={item.key} className="rounded-3xl">
            <GameCard key={index} game={item} provider="Pg Soft" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
