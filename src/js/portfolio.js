import gsap from 'gsap';
import { debounce } from 'lodash';

export default function portfolio() {
    const elements = Array.from(document.querySelectorAll('.js-portfolio'));

    elements.forEach(element => {
        const links = Array.from(element.querySelectorAll('.portfolio__categories-link'));
        const tabs = Array.from(element.querySelectorAll('.portfolio__tab'));
        const indicator = document.createElement('div');
        indicator.classList.add('portfolio__categories-link-indicator');

        let activeIndex = 0;

        const setActiveLink = (index, forced = false) => {
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[index].classList.add('active');
            activeIndex = index;
            if (links.length) {
                const activeLinkOffsetX = links[index].offsetLeft;
                const activeLinkOffsetY = links[index].offsetTop;
                const activeLinkHeight = links[index].offsetHeight;
                const activeLinkWidth = links[index].offsetWidth;
                // console.log({
                //     activeLinkOffsetX,
                //     activeLinkOffsetY,
                //     activeLinkHeight,
                //     activeLinkWidth
                // })

                gsap.to(indicator, {
                    x: activeLinkOffsetX,
                    y: activeLinkOffsetY,
                    width: activeLinkWidth,
                    height: activeLinkHeight,
                    duration: forced ? 0 : 0.2
                });
            }
        };

        if (!links.length) return;

        links[0].parentElement.appendChild(indicator);

        setActiveLink(activeIndex);

        window.addEventListener(
            'resize',
            debounce(() => {
                setActiveLink(activeIndex, true);
            }),
            300
        );

        window.addEventListener('load', () => {
            setActiveLink(activeIndex, true);
        })

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                setActiveLink(linkIndex);
            });
        });
    });
}
