import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function polygraphySlider() {
    const elements = Array.from(document.querySelectorAll('.js-poligraphy-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 14,
            speed: 400,
            slidesPerGroup: 2,
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            },
            breakpoints: {
                641: {
                    slidesPerGroup: 6
                }
            }
        });
    });
}
