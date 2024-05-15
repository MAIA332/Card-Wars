document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-i');
    const dropzones = document.querySelectorAll('.dropzone');

    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart);
        card.addEventListener('dragend', dragend);
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragover);
        dropzone.addEventListener('dragenter', dragenter);
        dropzone.addEventListener('dragleave', dragleave);
        dropzone.addEventListener('drop', drop);
    });

    function dragstart() {
        this.classList.add("is-dragging");
    }

    function dragend() {
        this.classList.remove("is-dragging");
    }

    function dragenter(e) {
        e.preventDefault();
        this.classList.add('its-over');
    }

    function dragover(e) {
        e.preventDefault();
        const cardBeingDragged = document.querySelector('.is-dragging');
        this.appendChild(cardBeingDragged);
    }

    function dragleave() {
        this.classList.remove('its-over');
    }

    function drop() {
        this.classList.remove('its-over');
    }
});