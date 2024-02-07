"use client";
import CarouselBanner from "@/components/ui/Carousel/Banner";
import CarouselItems from "@/components/ui/Carousel/Items";
import CarouselItemsLive from "@/components/ui/Carousel/Items-live";
import CarouselItemsPg from "@/components/ui/Carousel/Items-pg";

import CarouselItemsCrash from "@/components/ui/Carousel/Items-crash";
import { useEffect } from "react";

export default async function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ///@ts-ignore
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "z00t30ir",
      });
    }
  }, []);

  return (
    <>
      <div className="w-full z-10">
        <CarouselBanner />
      </div>

      {/*   <Destaques /> */}
      <div className="w-full z-10">
        <CarouselItemsPg />
      </div>
      <div className="w-full z-10">
        <CarouselItems />
      </div>

      <div className="w-full z-10">
        <CarouselItemsLive />
      </div>
      <div className="w-full z-10">
        <CarouselItemsCrash />
      </div>
    </>
  );
}
