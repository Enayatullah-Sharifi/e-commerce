import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "../api/getProduct";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    data: imgs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  const prevSlide = () => {
    const firstSlide = currentSlide === 0;
    const nextSlide = firstSlide ? imgs?.length - 1 : currentSlide - 1;
    setCurrentSlide(nextSlide);
  };
  const nextSlide = () => {
    const lastSlide = currentSlide === imgs?.length - 1;
    const nextSlide = lastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);
  };

  const moveToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [moveToSlide]);

  return (
    <div>
      {isError && (
        <h1 className="text-center text-red-500 font-bold">{error?.message}</h1>
      )}
      {isLoading && (
        <Loader2
          className="w-full animate-spin flex items-center justify-center"
          size={40}
        />
      )}
      {imgs && (
        <div className="max-w-[700px] h-[400px] w-full m-auto relative p-3">
          <img
            src={imgs[currentSlide]}
            alt=""
            className="bg-cover w-full h-full bg-center rounded-2xl duration-1000"
          />

          <div
            className="bg-white shadow-2xl p-1 absolute top-[50%] left-[8%] md:left-[3%] rounded-full dark:bg-white/40"
            onClick={prevSlide}
          >
            <BsChevronCompactLeft size={20} />
          </div>
          <div
            className="bg-white shadow-2xl p-1 absolute top-[50%] md:right-[3%] right-[8%] rounded-full dark:bg-white/40"
            onClick={nextSlide}
          >
            <BsChevronCompactRight size={20} />
          </div>

          <div className="flex items-center justify-center">
            {imgs.map((img, index) => (
              <div key={index} onClick={() => moveToSlide(index)}>
                <RxDotFilled
                  className={`${
                    currentSlide === index ? "size-9" : "size-6"
                  } dark:text-white/40`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
