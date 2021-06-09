import { Swiper, Navigation, Controller } from 'swiper';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);
Swiper.use([Navigation, Controller]);

export default function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    elements.forEach(element => {
        const mainSliderContainer = element.querySelector('.intro__main-slider .swiper-container');
        const textSliderContainer = element.querySelector('.intro__text-slider .swiper-container');
        const nextArrow = element.querySelector('.intro__main-slider-arrow--next');
        const prevArrow = element.querySelector('.intro__main-slider-arrow--prev');
        const nextArrowProgress = nextArrow.querySelector('circle:nth-child(2)');
        const AUTOPLAY_DURATION = 8;
        const AUTOPLAY = true;
        const bullets = Array.from(element.querySelectorAll('.intro__main-slider-bullet'));

        console.log(mainSliderContainer, textSliderContainer);

        let activeIndex = 0;

        const mainSlider = new Swiper(mainSliderContainer, {
            slidesPerView: 1,
            watchOverflow: true,
            init: false,
            loop: false,
            spaceBetween: 14,
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
            },
            breakpoints: {
                641: {
                    spaceBetween: 0,
                    loop: true
                }
            }
        });

        mainSlider.init();

        const textSlider = new Swiper(textSliderContainer, {
            slidesPerView: 1,
            watchOverflow: true,
            init: false,
            spaceBetween: 14,
            loop: false,
            breakpoints: {
                641: {
                    loop: true,
                    spaceBetween: 0,
                }
            }
        });

        textSlider.init();

        mainSlider.controller.control = textSlider;
        textSlider.controller.control = mainSlider;

        if (AUTOPLAY) {
            nextArrow.classList.add('autoplay-enabled');
        }

        function autoplay(startIndex) {
            if (window.matchMedia('(max-width: 640px)').matches) return;
            bullets.forEach(bullet => {
                gsap.set(bullet, {
                    '--slider-progress': 0
                });
                gsap.killTweensOf(bullet);
            });

            gsap.set(nextArrowProgress, {
                drawSVG: '0% 0%'
            });
            gsap.killTweensOf(nextArrowProgress);

            bullets.forEach((bullet, bulletIndex) => {
                if (bulletIndex < startIndex) {
                    gsap.set(bullet, {
                        '--slider-progress': 1
                    });
                }
            });
            gsap.fromTo(
                bullets[startIndex],
                { '--slider-progress': 0 },
                {
                    '--slider-progress': 1,
                    duration: AUTOPLAY_DURATION,
                    ease: 'linear',
                    onComplete: () => {
                        mainSlider.slideNext();
                    }
                }
            );

            gsap.fromTo(
                nextArrowProgress,
                { drawSVG: '0% 0%' },
                {
                    duration: AUTOPLAY_DURATION,
                    drawSVG: '0% 100%',
                    ease: 'none'
                }
            );
        }
    });
}
