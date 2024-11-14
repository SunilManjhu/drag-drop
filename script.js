// Get all grid cells
const gridCells = document.querySelectorAll('.grid-cell');

let draggedItem = null;
let validDropTarget = null; // Track the valid drop target

// Handle drag start
gridCells.forEach(cell => {
    cell.addEventListener('dragstart', (e) => {
        draggedItem = cell;
        draggedItem.style.opacity = '0.5'; // Make dragged item semi-transparent
    });

    // Handle drag end
    cell.addEventListener('dragend', () => {
        draggedItem.style.opacity = '1'; // Restore opacity
        draggedItem = null;
    });

    // Handle drag over
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        
        // Highlight the target cell if it is empty
        if (!cell.querySelector('img')) {
            cell.classList.add('highlight-drop');
            validDropTarget = cell; // Set the valid drop target
        }
    });

    // Handle drag leave
    cell.addEventListener('dragleave', () => {
        // Remove the highlight when dragging out of the cell
        cell.classList.remove('highlight-drop');
        if (validDropTarget === cell) {
            validDropTarget = null; // Clear the valid drop target if we leave it
        }
    });

    // Handle drop
    cell.addEventListener('drop', (e) => {
        e.preventDefault();
        // Remove highlight from all cells
        gridCells.forEach(c => c.classList.remove('highlight-drop'));

        // Only perform drop if the cell is the valid target
        if (cell !== draggedItem && validDropTarget === cell) {
            const draggedImage = draggedItem.querySelector('img');
            const targetImage = cell.querySelector('img');

            if (draggedImage) {
                // If target cell is empty, move the image there
                if (!targetImage) {
                    cell.appendChild(draggedImage);
                } else {
                    // Swap images if target cell has an image
                    draggedItem.appendChild(targetImage);
                    cell.appendChild(draggedImage);
                }
            }
        }
        validDropTarget = null; // Reset the valid drop target after drop
    });
});
