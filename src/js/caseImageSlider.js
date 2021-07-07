import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function caseImageSlider() {
    const elements = Array.from(document.querySelectorAll('.js-case-image-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: true,
            speed: 700,
            navigation: {
                nextEl: element.querySelector('.case-images-slider__arrow--next'),
                prevEl: element.querySelector('.case-images-slider__arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }
            }
        });
    });
}
