import { Swiper, Navigation, Controller } from 'swiper';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);
Swiper.use([Navigation, Controller]);

export default function productInfoSlider() {
    const elements = Array.from(document.querySelectorAll('.js-product-info-slider'));
    elements.forEach(element => {
        const AUTOPLAY_DURATION = 8;
        const AUTOPLAY = true;
        const nextArrow = element.querySelector('.product-intro__slider-arrow--next');
        const prevArrow = element.querySelector('.product-intro__slider-arrow--prev');
        const nextArrowProgress = nextArrow.querySelector('circle:nth-child(2)');
        let activeIndex = 0;
        const container = element.querySelector('.swiper-container');
       
        const mainSlider = new Swiper(container, {
            slidesPerView: 1,
            watchOverflow: true,
            init: false,
            loop: false,
            speed: 600,
            spaceBetween: 14,
            breakpoints: {
                641: {
                    loop: true,
                    spaceBetween: 0
                }
            },
            navigation: {
                nextEl: nextArrow,
                prevEl: prevArrow
            },
            on: {
                init: swiper => {
                    autoplay(swiper.realIndex);
                    activeIndex = swiper.realIndex;
                },
                slideChange: swiper => {
                    if (activeIndex === swiper.realIndex) return;
                    autoplay(swiper.realIndex);
                    activeIndex = swiper.realIndex;
                }
            }
        });

        mainSlider.init();

        if (AUTOPLAY) {
            nextArrow.classList.add('autoplay-enabled');
        }

        function autoplay() {
            if (window.matchMedia('(max-width: 640px)').matches) return;

            gsap.set(nextArrowProgress, {
                drawSVG: '0% 0%'
            });
            gsap.killTweensOf(nextArrowProgress);

            gsap.fromTo(
                nextArrowProgress,
                { drawSVG: '0% 0%' },
                {
                    duration: AUTOPLAY_DURATION,
                    drawSVG: '0% 100%',
                    ease: 'none',
                    onComplete: () => {
                        mainSlider.slideNext();
                    }
                }
            );
        }
    });
}
