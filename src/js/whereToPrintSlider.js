import Swiper from 'swiper';

export default function whereToPrintSlider() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    const elements = Array.from(document.querySelectorAll('.js-where-top-print-slider'));
    console.log('elements', elements);
    function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }
    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
       

       

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 12,
            watchOverflow: true
        });
    });
}
