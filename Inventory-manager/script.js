let inventory = [];

// Add item using spread operator
function addItem(...newItems) {
    inventory = [...inventory, ...newItems];
}

// Remove items using rest operator
function removeItems(...itemNames) {
    inventory = inventory.filter(item => !itemNames.includes(item.name));
}

// Filter items based on quantity
function filterByQuantity(minQty) {
    return inventory.filter(item => item.quantity >= minQty);
}

// Display a summary
function getSummary() {
    const names = inventory.map(item => item.name);
    const totalQty = inventory.reduce((sum, item) => sum + item.quantity, 0);
    return {
        names,
        totalQty
    };
}

// UI Event Handlers
function handleAddItem() {
    const name = document.getElementById('itemName').value.trim();
    //parseInt() function converts a string into an integer (a whole number)
    const qty = parseInt(document.getElementById('itemQty').value);

    if (name && !isNaN(qty)) {
        addItem({ name, quantity: qty });
        alert(`Added ${name} (${qty})`);
        document.getElementById('itemName').value = '';
        document.getElementById('itemQty').value = '';
    }
}

function handleRemoveItems() {
    const raw = document.getElementById('removeNames').value;
    const names = raw.split(',').map(n => n.trim()).filter(Boolean);
    if (names.length) {
        removeItems(...names);
        alert(`Removed: ${names.join(', ')}`);
        document.getElementById('removeNames').value = '';
    }
}

function handleFilter() {
    const minQty = parseInt(document.getElementById('minQty').value);
    if (!isNaN(minQty)) {
        const filtered = filterByQuantity(minQty);
        const result = filtered.map(i => `${i.name} (${i.quantity})`).join('\n');
        document.getElementById('output').textContent = result || 'No items match the filter.';
    }
}

function handleSummary() {
    const summary = getSummary();
    document.getElementById('output').textContent =
    // \n is a special character in JavaScript used to represent a line break (a new line).
        `Items: ${summary.names.join(', ')}\nTotal Quantity: ${summary.totalQty}`;
}

