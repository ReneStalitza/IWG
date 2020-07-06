function markTree(item) {
    if (item.hasAttribute('affected')) {
        item.removeAttribute('affected');
        checkIfEndangered(item);
    } else {
        item.setAttribute('value', '!');
        item.setAttribute('color', 'red');
        item.setAttribute('material', {
            color: 'red'
        });
        item.setAttribute('affected', '');
    }
}
