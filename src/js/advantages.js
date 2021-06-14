import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function advantages() {
    const elements = Array.from(document.querySelectorAll('.js-advantages'));

    elements.forEach(element => {
        const star = element.querySelector('.advantages__star-inner-wrapper');
        const starWrapper = element.querySelector('.advantages__star-wrapper')

       
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top top+=10%',

                    end: () => `+=${element.offsetHeight - starWrapper.offsetHeight}`,
                    pin: star,
                    pinSpacing: false,
                    markers: false
                });
            }
        });
    });
}
