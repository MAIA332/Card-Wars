const icons = document.querySelectorAll('.icon');

let draggingIcon = null;

icons.forEach(icon => {
    icon.addEventListener('dragstart', dragStart);
    icon.addEventListener('dragend', dragEnd);
});

function dragStart() {
    draggingIcon = this;
    setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
    draggingIcon = null;
    this.style.display = 'block';
}

const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
    this.classList.add('.its-over');
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('.drag-enter');
}

function dragLeave() {
    this.classList.remove('.is-dragging');
}

function drop() {
    this.classList.remove('.is-dragging');
    this.appendChild(draggingIcon);
}