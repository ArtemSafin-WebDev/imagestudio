import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function projectsLoadMore() {
    const elements = Array.from(document.querySelectorAll('.js-projects'));
    console.log('Script hrere')
    elements.forEach(element => {
        const loadMoreBtn = element.querySelector('.projects__load-more');
       
        if (!loadMoreBtn) return;
        const loadMoreTextElement = loadMoreBtn.querySelector('.projects__load-more-text');
        let loaded = false;
        const loadMoreLoadedText = element.getAttribute('data-loaded-text');
        const loadingURL = element.getAttribute('data-loading-url');
        const showMoreList = element.querySelector('.projects__grid');

        if (!loadingURL) {
            console.error('Loading URL not specified');
            return;
        }

       

        loadMoreBtn.addEventListener('click', event => {
            if (!loaded) {
                event.preventDefault();

                axios
                    .get(loadingURL)
                    .then(response => {
                        const parser = new DOMParser();
                        const nextPageHtml = parser.parseFromString(response.data, 'text/html');

                        const nextPageItems = Array.from(nextPageHtml.querySelectorAll('.projects__grid-item'));
                       

                        showMoreList.append(...nextPageItems);

                        if (typeof window.projectsCards.initializeCardSliders === 'function') {
                            window.projectsCards.initializeCardSliders();
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

                        loadMoreTextElement.textContent = loadMoreLoadedText;
                        loadMoreBtn.classList.add('loaded');
                        loaded = true;
                        ScrollTrigger.refresh();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });
    });
}
