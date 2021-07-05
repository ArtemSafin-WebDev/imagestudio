import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function cases() {
    const elements = Array.from(document.querySelectorAll('.js-cases'));

    const SPEED = 0.7;

    const openDropdown = element => {
        gsap.to(element, {
            height: 'auto',
            autoAlpha: 1,
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };
    const closeDropdown = element => {
        gsap.to(element, {
            height: 0,
            autoAlpha: 0,
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };

    elements.forEach(element => {
        const mainCategories = Array.from(element.querySelectorAll('.cases__filters-checkbox-input'));
        const dropdowns = Array.from(element.querySelectorAll('.cases__filters-subcategories-dropdown'));

        let activeDropdown = null;

        mainCategories.forEach(category => {
            category.addEventListener('change', () => {
                const checkedRadio = mainCategories.find(radio => radio.checked);
                const value = checkedRadio.value;

                const dropdownToOpen = dropdowns.find(element => element.matches(`[data-parent="${value}"]`));

                if (activeDropdown) {
                    activeDropdown.classList.remove('active');
                    closeDropdown(activeDropdown);
                    activeDropdown = null;
                }

                if (dropdownToOpen) {
                    console.log('Dropdown to open', dropdownToOpen);
                    openDropdown(dropdownToOpen);
                    dropdownToOpen.classList.add('active');
                    activeDropdown = dropdownToOpen;
                } else {
                    console.log('No dropdown to open');
                }

                console.log('Checked radio', value);
            });
        });


        if (window.matchMedia("(max-width: 640px)").matches) {
            const categories = Array.from(element.querySelectorAll('.cases__filters-category'));
            categories.forEach(category => {
                const radioCategory = category.querySelector('.cases__filters-checkbox-input').value;

                const matchingDropdown = dropdowns.find(dropdown => dropdown.matches(`[data-parent="${radioCategory}"]`));

                if (matchingDropdown) {
                    category.appendChild(matchingDropdown);
                }

                console.log("Radio category", radioCategory)
            })
        }

        dropdowns.forEach(dropdown => {
            const resetBtn = dropdown.querySelector('.cases__filters-reset');
            const checkboxes = Array.from(dropdown.querySelectorAll('.cases__filters-subcategories-checkbox-input'));

            resetBtn.addEventListener('click', event => {
                event.preventDefault();
                checkboxes.forEach(box => (box.checked = false));
                resetBtn.classList.remove('shown');
            });

            checkboxes.forEach(box => {
                box.addEventListener('change', () => {
                    const checkedBox = checkboxes.find(box => box.checked);
                    if (checkedBox) {
                        resetBtn.classList.add('shown');
                    } else {
                        resetBtn.classList.remove('shown');
                    }
                });
            });
        });
    });
}
