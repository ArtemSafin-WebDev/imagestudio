import Swiper from "swiper";

export default function howWeWorkSlider() {
    const elements = Array.from(document.querySelectorAll('.js-how-we-work-slider'));
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 40,
            watchOverflow: true
        })
    })
}