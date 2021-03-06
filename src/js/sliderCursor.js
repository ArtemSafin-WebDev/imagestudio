import { primaryInput } from 'detect-it';

export default function sliderCursor() {
    if (primaryInput === 'touch') return;

    const sliderCursor = document.createElement('div');

    sliderCursor.className = 'slider-cursor';
    sliderCursor.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.63 43"><path d="M40.31,43a21.5,21.5,0,1,1,21.5-21.5A21.52,21.52,0,0,1,40.31,43Zm0-41a19.5,19.5,0,1,0,19.5,19.5A19.53,19.53,0,0,0,40.31,2Z"/><circle cx="40.31" cy="21.5" r="2.28"/><path d="M72.58,30.8a1.38,1.38,0,0,1-.85-.3,1.3,1.3,0,0,1-.33-.41,1.39,1.39,0,0,1-.15-.5,1.46,1.46,0,0,1,.06-.51,1.22,1.22,0,0,1,.25-.46l6-7.12-5.74-7.14a1.35,1.35,0,0,1-.29-1,1.39,1.39,0,0,1,.15-.5,1.45,1.45,0,0,1,.34-.4,1.47,1.47,0,0,1,.47-.27,1.42,1.42,0,0,1,.54-.05,1.37,1.37,0,0,1,.52.16,1.29,1.29,0,0,1,.41.36l6.42,8a1.34,1.34,0,0,1,0,1.69l-6.65,8a1.33,1.33,0,0,1-1.1.48Z"/><path d="M8.05,30.8a1.38,1.38,0,0,0,.85-.3,1.65,1.65,0,0,0,.33-.41,1.2,1.2,0,0,0,.14-.5,1.25,1.25,0,0,0,0-.51,1.38,1.38,0,0,0-.25-.46L3.12,21.5l5.74-7.14a1.35,1.35,0,0,0,.29-1,1.23,1.23,0,0,0-.16-.5,1.26,1.26,0,0,0-.33-.4,1.47,1.47,0,0,0-.47-.27,1.42,1.42,0,0,0-.54-.05,1.32,1.32,0,0,0-.52.16,1.29,1.29,0,0,0-.41.36l-6.42,8a1.34,1.34,0,0,0,0,1.69l6.65,8a1.33,1.33,0,0,0,1.1.48Z"/>
    </svg>
    `;

    document.body.appendChild(sliderCursor);

    document.addEventListener('mousemove', e => {
        const xmouse = e.clientX || e.pageX;
        const ymouse = e.clientY || e.pageY - pageYOffset;
        sliderCursor.style.left = xmouse + 'px';
        sliderCursor.style.top = ymouse + 'px';
    });

    // document.addEventListener('mouseover', event => {
    //     if (event.target.matches('.js-cursor-slider-area') || event.target.closest('.js-cursor-slider-area')) {
    //         document.body.classList.add('slider-cursor-active');
    //     }
    // });
    // document.addEventListener('mouseout', event => {
    //     document.body.classList.remove('slider-cursor-active');
    // });

    const sliderAreas = Array.from(document.querySelectorAll('.js-cursor-slider-area'));

    sliderAreas.forEach(area => {
        area.addEventListener('mouseenter', () => {
            document.body.classList.add('slider-cursor-active');
        })
        area.addEventListener('mouseleave', () => {
            document.body.classList.remove('slider-cursor-active');
        })
    })
}
