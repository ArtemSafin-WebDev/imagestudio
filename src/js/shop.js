import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function shop() {
    const elements = Array.from(document.querySelectorAll('.js-shop'));

    elements.forEach(element => {
        const image = element.querySelector('.shop__image');

        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        scrub: 1,
                        end: 'bottom top'
                    }
                });

                tl.fromTo(image, {
                    yPercent: 50,
                    
                }, {
                    yPercent: -13,
                    duration: 2
                })
            }
        });
    });
}
