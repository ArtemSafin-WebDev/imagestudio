import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function chooseSolution() {
    const elements = Array.from(document.querySelectorAll('.js-choose-solution'));

    elements.forEach(element => {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const cards = Array.from(element.querySelectorAll('.choose-solution__card'))
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        scrub: false,
                        end: 'bottom top'
                    }
                });

                tl.from(cards, {
                    xPercent: -100,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.3
                });
            }
        });
    });
}
