import { Swiper, Navigation, Controller } from 'swiper';

Swiper.use([Navigation, Controller]);

import { debounce } from 'lodash';

export default function reviewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-reviews-slider'));

    elements.forEach(element => {
        const mainContainer = element.querySelector('.reviews__slider-main .swiper-container');
        const thumbsContainer = element.querySelector('.reviews__slider-thumbs .swiper-container');
        const thumbsCards = Array.from(element.querySelectorAll('.reviews__slider-thumbs-card'));

        const setActiveThumbCard = index => {
            thumbsCards.forEach(card => card.classList.remove('active'));
            thumbsCards[index].classList.add('active');
            console.log('Setting active thumb card', thumbsCards[index])
        }


        const deboucedSetActiveThumb = debounce(setActiveThumbCard, 300)
        

        const mainSlider = new Swiper(mainContainer, {
            slidesPerView: 'auto',
            spaceBetween: 14,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            speed: 600,
            navigation: {
                nextEl: element.querySelector('.slider-arrows__btn--next'),
                prevEl: element.querySelector('.slider-arrows__btn--prev')
            },
            init: false,
            on: {
                init: (swiper) => {
                    // setActiveThumbCard(swiper.realIndex);

                    deboucedSetActiveThumb(swiper.realIndex);
                },
                slideChange: (swiper) => {
                    // setActiveThumbCard(swiper.realIndex);

                    deboucedSetActiveThumb(swiper.realIndex);
                }
            },
            breakpoints: {
                641: {
                    spaceBetween: 60
                }
            }
        });

        mainSlider.init();

        if (window.matchMedia('(max-width: 640px)').matches) {
            const thumbsSlider = new Swiper(thumbsContainer, {
                slidesPerView: 1,
                speed: 600,
                spaceBetween: 14,
                breakpoints: {
                    641: {
                        spaceBetween: 0
                    }
                }
            });
            mainSlider.controller.control = thumbsSlider;
            thumbsSlider.controller.control = mainSlider;
        }
    });
}
