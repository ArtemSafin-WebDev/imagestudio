import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function modalDetailsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-modal-details-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 4,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.modal__details-modal-slider-arrow--next'),
                prevEl: element.querySelector('.modal__details-modal-slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        });
    });
}
