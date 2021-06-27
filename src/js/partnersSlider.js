import Swiper from 'swiper';

export default function partnersSlider() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    const elements = Array.from(document.querySelectorAll('.js-partners-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            slidesPerView: 'auto',
            slidesPerColumn: 3,
            slidesPerColumnFill: 'row',
            spaceBetween: 24
        });
    });
}
