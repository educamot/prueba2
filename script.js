document.addEventListener("DOMContentLoaded", () => {
    const numbersContainer = document.getElementById('numbers');
    const dropzonesContainer = document.getElementById('dropzones');
    const checkButton = document.getElementById('checkButton');
    let numbers = [...Array(10).keys()].sort(() => Math.random() - 0.5);
    
    function createBoxes() {
        numbers.forEach(number => {
            const box = document.createElement('div');
            box.className = 'box';
            box.textContent = number;
            box.draggable = true;
            box.addEventListener('dragstart', dragStart);
            numbersContainer.appendChild(box);
        });

        for (let i = 0; i < 10; i++) {
            const dropzone = document.createElement('div');
            dropzone.className = 'dropzone';
            dropzone.addEventListener('dragover', dragOver);
            dropzone.addEventListener('drop', drop);
            dropzonesContainer.appendChild(dropzone);
        }
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const number = e.dataTransfer.getData('text/plain');
        if (e.target.classList.contains('dropzone')) {
            e.target.textContent = number;
            e.target.classList.remove('dropzone');
            e.target.classList.add('filled');
            e.target.dataset.number = number; // Store the number in the dropzone
        }
    }

    function checkCompletion() {
        const filledZones = document.querySelectorAll('.filled');
        const filledNumbers = Array.from(filledZones).map(zone => zone.dataset.number);
        if (filledNumbers.length === 10) {
            if (filledNumbers.join('') === '0123456789') {
                showAlert('FELICITACIONES', 'Has organizado correctamente los números!');
            } else {
                showAlert('Inténtalo otra vez', 'Los números no están en el orden correcto.');
            }
        } else {
            Swal.fire('Por favor, completa todos los cuadros antes de comprobar.');
        }
    }

    function showAlert(title, text) {
        Swal.fire({
            title: title,
            text: text,
            icon: title === 'FELICITACIONES' ? 'success' : 'error',
            confirmButtonText: 'OK'
        }).then(() => {
            resetGame();
        });
    }

    function resetGame() {
        numbersContainer.innerHTML = '';
        dropzonesContainer.innerHTML = '';
        numbers = [...Array(10).keys()].sort(() => Math.random() - 0.5);
        createBoxes();
    }

    checkButton.addEventListener('click', checkCompletion);
    
    createBoxes();
});
