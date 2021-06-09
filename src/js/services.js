import { debounce } from 'lodash';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function services() {
    const elements = Array.from(document.querySelectorAll('.js-services'));

    elements.forEach(element => {
        if (window.matchMedia('(min-width: 641px)').matches) {
            const links = Array.from(element.querySelectorAll('.services__nav-link'));
            const imageLayers = Array.from(element.querySelectorAll('.services__slider-image-layer'));
            const textLayers = Array.from(element.querySelectorAll('.services__slider-text-item'));

            const setActiveLink = index => {
                links.forEach(item => item.classList.remove('active'));
                links[index].classList.add('active');
            };

            const setActiveSlides = index => {
                imageLayers.forEach(item => item.classList.remove('active'));
                textLayers.forEach(item => item.classList.remove('active'));
                imageLayers[index].classList.add('active');
                textLayers[index].classList.add('active');
            };

            const debouncedSetActiveSlides = debounce(setActiveSlides, 320);

            const setActiveLayer = index => {
                setActiveLink(index);
                debouncedSetActiveSlides(index);
            };

            if (!links.length) return;

            setActiveLayer(0);

            links.forEach((link, linkIndex) => {
                link.addEventListener('mouseenter', () => {
                    setActiveLayer(linkIndex);
                });

                link.addEventListener('click', event => {
                    event.preventDefault();
                    setActiveLayer(linkIndex);
                });
            });

            document.addEventListener('click', event => {
                if (event.target.matches('.services__nav-link') || event.target.closest('.services__nav-link')) return;

                setActiveLayer(0);
            });
        } else {
            const accordions = Array.from(element.querySelectorAll('.services__nav-accordion'));
            const images = Array.from(element.querySelectorAll('.services__slider-image-layer'));
            const textBlocks = Array.from(element.querySelectorAll('.services__slider-text-item'));
            const CLOSE_OTHER = true;
            const SPEED = 0.5;

            const openAccordion = element => {
                gsap.to(element, {
                    height: 'auto',
                    duration: SPEED,
                    onComplete: () => ScrollTrigger.refresh()
                });
            };
            const closeAccordion = element => {
                gsap.to(element, {
                    height: 0,
                    duration: SPEED,
                    onComplete: () => ScrollTrigger.refresh()
                });
            };

            accordions.forEach((accordion, accordionIndex) => {
                const content = accordion.querySelector('.services__nav-accordion-content-inner');
                content.appendChild(images[accordionIndex]);
                content.appendChild(textBlocks[accordionIndex]);
            });

            accordions.forEach(element => {
                const btn = element.querySelector('.services__nav-link');
                const content = element.querySelector('.services__nav-accordion-content');

                btn.addEventListener('click', event => {
                    event.preventDefault();

                    if (CLOSE_OTHER) {
                        accordions.forEach(otherElement => {
                            if (otherElement !== element) {
                                if (otherElement.classList.contains('active')) {
                                    const content = otherElement.querySelector('.services__nav-accordion-content');
                                    closeAccordion(content);
                                    otherElement.classList.remove('active');
                                    otherElement.closest('li').classList.remove('active');
                                }
                            }
                        });
                    }

                    if (element.classList.contains('active')) {
                        closeAccordion(content);
                    } else {
                        openAccordion(content);
                    }
                    element.classList.toggle('active');
                    element.closest('li').classList.toggle('active');
                });
            });
        }

        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top bottom-=10%',
                    toggleClass: { targets: 'body', className: 'services-header-collapsed' },
                    end: 'bottom top'
                });
            }
        });
    });
}
