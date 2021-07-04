import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function historySlider() {
    const elements = Array.from(document.querySelectorAll('.js-history'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 900,
            slidesPerGroup: 1,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.history__arrows-btn--next'),
                prevEl: element.querySelector('.history__arrows-btn--prev')
            },
            breakpoints: {
                641: {
                    slidesPerGroup: 2
                }
            }
        });
    });
}
