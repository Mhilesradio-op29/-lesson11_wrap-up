// CONTACT FORM HANDLER
newFunction();
function newFunction() {
    document.getElementById('contactForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // TABLE SORTING
    document.addEventListener('DOMContentLoaded', () => {
        const table = document.querySelector('table');
        if (!table) return; // Exit if no table exists

        const headers = table.querySelectorAll('th button');
        const tbody = table.querySelector('tbody');

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const columnKey = header.getAttribute('data-sort');
                const currentDir = header.getAttribute('data-sort-dir');
                const newDirection = (currentDir === 'asc') ? 'desc' : 'asc';

                // Clear previous sort directions
                headers.forEach(h => h.removeAttribute('data-sort-dir'));
                header.setAttribute('data-sort-dir', newDirection);

                const rows = Array.from(tbody.querySelectorAll('tr'));

                const sortedRows = rows.sort((rowA, rowB) => {
                    const cellA = rowA.querySelector(`td:nth-child(${getColumnIndex(header)})`);
                    const cellB = rowB.querySelector(`td:nth-child(${getColumnIndex(header)})`);

                    let valA = cellA.textContent.trim();
                    let valB = cellB.textContent.trim();

                    // Numeric sort for certain columns
                    if (['items', 'avg-score'].includes(columnKey)) {
                        valA = parseFloat(valA) || 0;
                        valB = parseFloat(valB) || 0;
                        return newDirection === 'asc' ? valA - valB : valB - valA;
                    }

                    // Alphabetical sort
                    return newDirection === 'asc'
                        ? valA.localeCompare(valB)
                        : valB.localeCompare(valA);
                });

                // Update table
                tbody.innerHTML = '';
                sortedRows.forEach(row => tbody.appendChild(row));
            });
        });

        function getColumnIndex(headerButton) {
            const allHeaders = Array.from(headerButton.closest('tr').querySelectorAll('th button'));
            return allHeaders.indexOf(headerButton) + 1;
        }
    });

    // IMAGE MODAL
    const modal = document.createElement('div');
    modal.id = 'img-modal';
    modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;
    document.body.appendChild(modal);

    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modal.appendChild(modalImg);

    // Close modal on click
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Clickable gallery images
    document.querySelectorAll('.thumb img').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.style.display = 'flex';
        });
    });
}

