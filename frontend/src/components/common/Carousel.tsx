import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Carousel = ({
  images,
  height = 'h-72',
}: {
  images?: string[];
  height?: string;
}) => {
  if (!images?.length) return <div className={`${height} w-screen `}></div>;

  return (
    <Swiper>
      {images?.map((image, index) => (
        <SwiperSlide key={`${image}_${index}`}>
          <div
            className={`${height} w-screen bg-cover bg-content`}
            style={{ backgroundImage: `url(${image})` }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
