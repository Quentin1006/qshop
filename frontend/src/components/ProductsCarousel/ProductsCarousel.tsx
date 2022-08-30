'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import Image from 'next/image';

export default function () {
  return (
    <div className="flex h-[230px]">
      <Swiper
        className="h-100 w-full"
        style={{ overflow: 'visible' }}
        navigation={true}
        modules={[Navigation]}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {['carousel-1', 'carousel-2', 'carousel-3', 'carousel-4'].map((imgName) => (
          <SwiperSlide key={imgName}>
            <div className="flex max-h-[230px] justify-center">
              <div className="before:z-1 before-right-0 before:z-1 relative flex h-[600px] w-full before:absolute before:top-[250px] before:bottom-0 before:left-0 before:right-0 before:bg-gradient-to-b before:from-transparent before:to-gray-300 before:content-['']">
                <Image
                  className="block h-full w-full max-w-none object-cover"
                  src={`/${imgName}.jpg`}
                  alt={imgName}
                  width={1200}
                  height={400}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
