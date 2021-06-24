import gsap from 'gsap';
import { primaryInput } from 'detect-it';

export default function features() {
    const elements = Array.from(document.querySelectorAll('.js-feature'));
    console.log('Elements', elements);

    elements.forEach(element => {
        const content = element.querySelector('.features__card-text');
        const plus = element.querySelector('.features__card-plus');
        const openCard = () => {
            element.classList.add('active');
            gsap.to(content, {
                height: 'auto',
                duration: 0.65,
                autoAlpha: 1
            });
        };

        const closeCard = () => {
            element.classList.remove('active');
            gsap.to(content, {
                height: 0,
                duration: 0.65,
                autoAlpha: 0
            });
        };

        if (primaryInput !== 'touch') {
            element.addEventListener('mouseenter', event => {
                openCard();
            });
            element.addEventListener('mouseleave', event => {
                closeCard();
            });
        }

        element.addEventListener('click', event => {
            event.preventDefault();
            if (element.classList.contains('active')) {
                closeCard();
            } else {
                openCard();
            }
        });
    });
}
