import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function projectsShowMore() {
    let loadPageCounter = 1;
    document.addEventListener('click', event => {
        if (event.target.matches('.js-projects-load-more') || event.target.closest('.js-projects-load-more')) {
            event.preventDefault();

            console.log("Loading more");
            const showMoreList = document.querySelector('.projects__grid');

            if (!showMoreList) return;

            axios
                .get(window.location.href, {
                    params: {
                        PAGEN_1: ++loadPageCounter
                    }
                })
                .then(response => {
                    const parser = new DOMParser();
                    const nextPageHtml = parser.parseFromString(response.data, 'text/html');

                    const nextPageItems = Array.from(nextPageHtml.querySelectorAll('.projects__grid-item'));
                    const nextPageShowMore = nextPageHtml.querySelector('.js-projects-load-more');

                    showMoreList.append(...nextPageItems);

                    if (typeof window.projectsCards.initializeCardSliders === 'function') {
                        window.projectsCards.initializeCardSliders()
                    }

                    gsap.fromTo(
                        nextPageItems,
                        {
                            autoAlpha: 0
                        },
                        {
                            autoAlpha: 1,
                            duration: 0.3,
                            stagger: 0.15
                        }
                    );

                    if (!nextPageShowMore) {
                        const currentShowMore = document.querySelector('.js-projects-load-more');
                        currentShowMore.remove();
                    }

                    ScrollTrigger.refresh();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });
}
