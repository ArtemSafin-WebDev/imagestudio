import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function cycle() {
    const elements = Array.from(document.querySelectorAll('.js-cycle'));
    elements.forEach(element => {
        const text = element.querySelector('.cycle__text');
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom+=20%',
                        scrub: 1,
                        end: 'center center'
                    }
                });

                tl.from(text, {
                    xPercent: -50,
                    duration: 2
                });
            }
        });
    });
}
