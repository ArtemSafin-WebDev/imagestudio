import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function moveUpBlocks() {
    const elements = Array.from(document.querySelectorAll('.js-move-up-block'));

    elements.forEach(element => {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        scrub: true,
                        end: 'center center'
                    }
                });

                tl.from(element, {
                    y: 100,
                    duration: 2
                });
            }
        });
    });
}
