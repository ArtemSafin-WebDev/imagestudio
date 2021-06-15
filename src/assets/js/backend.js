document.addEventListener('DOMContentLoaded', () => {
    var contactsForm = document.querySelector('#modal-contact-form');

    if (contactsForm) {
        var resetBtn = contactsForm.querySelector('.contact-form__success-send-again');
        contactsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (
                $(contactsForm)
                    .parsley()
                    .isValid()
            ) {
                contactsForm.classList.add('success');
            }
        });

        resetBtn.addEventListener('click', function(event) {
            event.preventDefault();
            contactsForm.classList.remove('success');
            contactsForm.reset();
            $(contactsForm)
                .parsley()
                .reset();
        });
    }
});
