import { Swiper, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function teamSlider() {
    const elements = Array.from(document.querySelectorAll('.js-team'));

    elements.forEach(element => {
        const topSliderContainer = element.querySelector('.team__top-slider .swiper-container');
        const bottomSliderContainer = element.querySelector('.team__bottom-slider .swiper-container');

        new Swiper(topSliderContainer, {
            slidesPerView: 'auto',
            spaceBetween: 14,
            speed: 700,

            watchOverflow: true,
            breakpoints: {
                641: {
                    spaceBetween: 60
                }
            },
            navigation: {
                nextEl: element.querySelector('.team__top-slider-btn--next'),
                prevEl: element.querySelector('.team__top-slider-btn--prev')
            },
            pagination: {
                el: element.querySelector('.team__top-slider-pagination'),
                type: 'fraction',
                formatFractionCurrent: number => number.toString().padStart(2, '0'),
                formatFractionTotal: number => number.toString().padStart(2, '0')
            }
        });

        new Swiper(bottomSliderContainer, {
            slidesPerView: 'auto',
            spaceBetween: 14,
            watchOverflow: true,
            breakpoints: {
                641: {
                    slidesPerView: 4
                }
            },
            navigation: {
                nextEl: element.querySelector('.team__bottom-slider-btn--next'),
                prevEl: element.querySelector('.team__bottom-slider-btn--prev')
            }
        });
    });
}
