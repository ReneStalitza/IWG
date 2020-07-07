function markTree(item) {

    if (item.hasAttribute('affected')) {
        item.removeAttribute('affected');
        document.getElementById('isAffected').innerHTML = 'No';
        checkIfEndangered(item);
    } else {
        item.setAttribute('value', 'X');
        item.setAttribute('color', 'red');
        item.setAttribute('material', {
            color: 'red'
        });
        item.setAttribute('affected', '');
        document.getElementById('isAffected').innerHTML = 'Yes';
    }
}


function markTreeButton() {
    if (active == "" || active == undefined) {
      //  alert("Please select a tree");
    } else {
        item = active;
        markTree(item);
    }
}
