import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function portfolioSlider() {
    const elements = Array.from(document.querySelectorAll('.js-portfolio-slider'));

    function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.portfolio__slider-card'));
        const container = element.querySelector('.swiper-container');
        const singleCards = [];
        const tupleCards = [];

        cards.forEach((card, cardIndex) => {
            if (card.matches(':nth-child(3n + 1)')) {
                // console.log('Card with index matches 1 criteria', cardIndex);
                singleCards.push(card);
            }

            if (card.matches(':nth-child(3n - 1)')) {
                // console.log('Card with index matches 2 criteria', cardIndex);
                tupleCards.push(card);
            }
        });

        tupleCards.forEach(card => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('swiper-slide');
            wrapper.classList.add('swiper-slide-tuple');

            const nextElement = card.nextElementSibling;

            wrap(card, wrapper);

            if (nextElement) {
                wrapper.appendChild(nextElement);
            }
        });

        singleCards.forEach(card => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('swiper-slide');
            wrapper.classList.add('swiper-slide-single');

            wrap(card, wrapper);
        });

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            touchStartPreventDefault: false,
            // watchOverflow: true
        });
    });
}
