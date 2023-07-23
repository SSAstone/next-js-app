"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle';
import { Autoplay, EffectFade, Navigation } from 'swiper';
import mainSlider from '@/data/mainSlider';
import SingleSlider from './SingleSlider';

const Slider = () => {
    return (
        <div className='main-slider'>
            <Swiper
                slidesPerView={1}
                loop
                navigation
                effect='fade'
                autoplay
                modules={[Navigation, EffectFade, Autoplay]}
            >
                {
                    mainSlider.map((slide, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <SingleSlider slide={slide}></SingleSlider>
                            </SwiperSlide>
                        )
                    })
                }
                {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                
            </Swiper>
        </div>
    );
};

export default Slider;