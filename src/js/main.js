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
   
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
