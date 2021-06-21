import { Swiper, Pagination, EffectFade } from 'swiper';
import { primaryInput } from 'detect-it';
Swiper.use([Pagination, EffectFade]);

function initializeCardSlider(card) {
    const container = card.querySelector('.swiper-container');
    if (!container) return;
    let trackingCursor = false;
    let currentSlideIndex;
    const DEBUG = false;
    const instance = new Swiper(container, {
        watchOverflow: true,
        effect: 'fade',
        speed: 600,
        longSwipesRatio: 0.25,

        fadeEffect: {
            crossFade: true
        }
    });

    const slidesCount = instance.slides.length;

    if (primaryInput !== 'touch') {
        container.addEventListener('mouseenter', () => {
            trackingCursor = true;
        });
        container.addEventListener('mouseleave', () => {
            trackingCursor = false;
            instance.slideTo(0);
        });

        container.addEventListener('mousemove', e => {
            if (!trackingCursor) return;
            e.stopPropagation();

            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = parseInt(e.clientX - rect.left, 10);

            const width = e.currentTarget.offsetWidth;

            const progress = Math.ceil((offsetX / width) * slidesCount);
            let activeSlideIndex = progress - 1;

            if (DEBUG) {
                console.log({
                    activeSlideIndex,
                    progress,
                    offsetX
                });
            }

            if (activeSlideIndex !== currentSlideIndex) {
                instance.slideTo(activeSlideIndex);
            }
        });
    }
}

function initializeCardSliders() {
    const elements = Array.from(document.querySelectorAll('.js-projects-card-slider'));

    elements.forEach(card => {
        initializeCardSlider(card);
    });
}

window.projectsCards = {};
window.projectsCards.initializeCardSlider = initializeCardSlider;
window.projectsCards.initializeCardSliders = initializeCardSliders;

export default function projectsSlider() {
    initializeCardSliders();
}
