import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import phoneMask from './phoneMask';
import onlyNumeric from './onlyNumeric';
import fileUpload from './fileUpload';
import polygraphySlider from './poligraphySlider';
import serviceSlider from './serviceSlider';
import services from './services';
import portfolio from './portfolio';
import portfolioSlider from './portfolioSlider';
import intro from './intro';
import menu from './menu';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cycle from './cycle';
import moveUpBlocks from './moveUpBlocks';
import shop from './shop';
import advantages from './advantages';
import sliderCursor from './sliderCursor';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    intro();
    validation();
    customSelects();
    phoneMask();
    onlyNumeric();
    fileUpload();
    polygraphySlider();
    serviceSlider();
    services();
    portfolio();
    portfolioSlider();
    menu();
    cycle();
    shop();
    advantages();
    sliderCursor();
    moveUpBlocks();
    

    const mq = window.matchMedia('(max-width: 640px)');

    function screenTest(e) {
        location.reload();
    }

    mq.addListener(screenTest);
});

const handleLoad = () => {
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
};

setTimeout(() => {
    document.body.classList.add('animatable');
    handleLoad();
}, 2500);

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => {
        document.body.classList.add('animatable');
        handleLoad();

      
    }, 300);
});
