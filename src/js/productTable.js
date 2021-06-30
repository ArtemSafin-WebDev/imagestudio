import Hammer from 'hammerjs';
import { primaryInput } from 'detect-it';

export default function productTable() {
    if (primaryInput === 'touch') return;
    const scrollableTables = Array.from(document.querySelectorAll('.js-product-table'));

    scrollableTables.forEach(element => {
        console.log('Element', element);
        const hammertime = new Hammer(element);

        let startX = 0;
        hammertime.on('panstart', function(event) {
            startX = element.scrollLeft;
        });
        hammertime.on('panmove', function(event) {
            element.scrollLeft = Math.floor(startX - event.deltaX);
        });
    });
}
