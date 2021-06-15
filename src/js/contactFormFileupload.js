function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

export default function contactFormFileUpload() {
    const elements = Array.from(document.querySelectorAll('.js-contact-form-file-upload'));

    elements.forEach(element => {
        const input = element.querySelector('input[type="file"]');
        const label = element.querySelector('.contact-form__file-upload-text');
        const originalLabelText = label.textContent;
        const loadedLabelText = element.getAttribute('data-loaded-text');

        let fileInfo = null;

        input.addEventListener('change', () => {
            if (input.files.length) {
                label.textContent = loadedLabelText;

                if (fileInfo) {
                    fileInfo.remove();
                    fileInfo = null;
                }

                fileInfo = document.createElement('div');

                fileInfo.classList.add('contact-form__file-upload-info');
                fileInfo.innerHTML = `
                    <div class="contact-form__file-upload-info-content">
                        <div class="contact-form__file-upload-info-name">
                            ${input.files[0].name}
                        </div>
                        <div class="contact-form__file-upload-info-size">
                        ${returnFileSize(input.files[0].size)}
                        </div>
                    </div>
                    <div class="contact-form__file-upload-info-close">
                        <svg width="14" height="14" aria-hidden="true" class="icon-cross">
                            <use xlink:href="#cross"></use>
                        </svg>
                    </div>
                `;

                element.appendChild(fileInfo);
                element.classList.add('file-loaded');
            } else {
                label.textContent = originalLabelText;
                element.classList.remove('file-loaded');
            }
        });

        element.addEventListener('click', event => {
            if (event.target.matches('.contact-form__file-upload-info') || event.target.closest('.contact-form__file-upload-info')) {
                event.preventDefault();
                input.value = '';
                label.textContent = originalLabelText;
                element.classList.remove('file-loaded');

                if (fileInfo) {
                    fileInfo.remove();
                }
            }
        });
    });
}
