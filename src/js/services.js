import { debounce } from 'lodash';

export default function services() {
    const elements = Array.from(document.querySelectorAll('.js-services'));

    elements.forEach(element => {
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

            // link.addEventListener('mouseleave', () => {
            //     setActiveLayer(0);
            // })

            link.addEventListener('click', event => {
                event.preventDefault();
                setActiveLayer(linkIndex);
            });
        });

        document.addEventListener('click', event => {
            if (event.target.matches('.services__nav-link') || event.target.closest('.services__nav-link')) return;

            setActiveLayer(0);
        });
    });
}
