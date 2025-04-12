import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ScreenshotSliderProps {
  screenshots: string[];
  title: string;
  onScreenshotClick?: (index: number) => void;
  currentIndex?: number;
}

export function ScreenshotSlider({
  screenshots,
  title,
  onScreenshotClick,
  currentIndex = 0,
}: ScreenshotSliderProps) {
  const [slidesPerView, setSlidesPerView] = useState(3);

  // 画面サイズに応じて表示枚数を調整
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize(); // 初期化時に実行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-6">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          initialSlide={currentIndex}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {screenshots.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div
                className={`border rounded-md overflow-hidden cursor-pointer
                  ${index === currentIndex ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => onScreenshotClick && onScreenshotClick(index)}
              >
                <div className="aspect-[9/16] w-full">
                  <img
                    src={imgSrc}
                    alt={`${title}のスクリーンショット ${index + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/icons/ImagePlaceholder.svg";
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* カスタムナビゲーションボタン */}
        <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-r-md z-10">
          &lt;
        </button>
        <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-l-md z-10">
          &gt;
        </button>

        {/* ページネーション */}
        <div className="swiper-pagination mt-4"></div>
      </div>
    </div>
  );
}
