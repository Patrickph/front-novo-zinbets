"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper"

import Image from "next/image"
import Link from "next/link"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "./styles.css"

export default function CarouselBanner() {
  const carousel = [
    {
      key: 0,
      src: `/banner_1.png`,
      alt: "banner4",
      link: "#",
    },
  ]

  return (
    <div className="banner">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full max-w-full lg:h-[361px] aspect-[1113/361] rounded-2xl z-10"
      >
        {carousel.map(item => (
          <SwiperSlide key={item.key}>
            <Link href={item.link}>
              <Image src={item.src} alt={item.alt} fill />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
