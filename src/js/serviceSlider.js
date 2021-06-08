import { Swiper, Navigation } from 'swiper';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

Swiper.use([Navigation]);

export default function serviceSlider() {
    const elements = Array.from(document.querySelectorAll('.js-service-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const links = Array.from(element.querySelectorAll('.service__slider-link'));
        const AUTOPLAY_DURATION = 7;

        const setActiveLink = index => {
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
        };
        let activeIndex = 0;
        const instance = new Swiper(container, {
            slidesPerView: 1,
            watchOverflow: true,
            spaceBetween: 20,
            speed: 500,
            loop: true,
            init: false,
            navigation: {
                nextEl: element.querySelector('.service__slider-arrow--next'),
                prevEl: element.querySelector('.service__slider-arrow--prev')
            },
            on: {
                init: swiper => {
                    setActiveLink(swiper.realIndex);
                    autoplay(swiper.realIndex);

                    activeIndex = swiper.realIndex;
                },
                slideChange: swiper => {
                    if (activeIndex === swiper.realIndex) return;
                    setActiveLink(swiper.realIndex);
                    autoplay(swiper.realIndex);

                    activeIndex = swiper.realIndex;
                }
            }
        });

        instance.init();

        function autoplay(startIndex) {
            links.forEach(link => {
                const linkProgress = link.querySelector('rect:nth-child(2)');
                gsap.set(linkProgress, {
                    drawSVG: '0% 0%'
                });
                gsap.killTweensOf(linkProgress);
            });

            const currentLink = links[startIndex];
            const currentLinkProgress = currentLink.querySelector('rect:nth-child(2)');

            const tl = gsap.timeline({
                onComplete: () => {
                    instance.slideNext();
                }
            });
            tl.fromTo(
                currentLinkProgress,
                { drawSVG: '0% 0%' },
                {
                    duration: AUTOPLAY_DURATION,
                    drawSVG: '0% 100%',
                    ease: 'none'
                }
            );
        }

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();

                instance.slideToLoop(linkIndex);
            });
        });
    });
}
