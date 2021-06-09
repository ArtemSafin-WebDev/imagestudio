import { lockScroll, unlockScroll } from "./scrollBlocker";

export default function menu() {
    const menu = document.querySelector('.page-header__menu');
    const burger = document.querySelector('.page-header__burger');
    let menuOpen = false;

    const openMenu = () => {
        if (menuOpen) return;
        lockScroll(menu);
        document.body.classList.add('menu-open');
        menuOpen = true;

    }
    const closeMenu = () => {
        if (!menuOpen) return;
        unlockScroll();
        document.body.classList.remove('menu-open');
        menuOpen = false;
    }

    window.openMenu = openMenu;
    window.closeMenu = closeMenu;

    burger.addEventListener('click', event => {
        event.preventDefault();

        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    })

    menu.addEventListener('click', event => {
        if (event.target === menu) {
            closeMenu();
        }
    })


}