/*
 * Generate a spcies of tree randomly. To be used when no species is given.
 */
function rdmSpecies() {
    var rdmInt = Math.floor((Math.random() * 10) + 1);
    switch (rdmInt) {
        case 1:
            return "Oak";
        case 2:
            return "Pine";
        case 3:
            return "Cedar";
        case 4:
            return "Fir";
        case 5:
            return "Mallorn";
        case 6:
            return "Beech";
        case 7:
            return "Ilex";
        case 8:
            return "Lebethron";
        case 9:
            return "Birch";
        case 10:
            return "Ash";
    }
}

/*
 * Check whether species stored as attribute has an increased potential to be affected.
 * Must - for obvious reasons - be called after rdmSpecies(). 
 */
function checkIfEndangered(element) {
    var species = element.getAttribute('species');
    if (species == "Oak" || species == "Pine" || species == "Cedar" || species == "Fir") {
        element.setAttribute('color', 'orange');
        element.setAttribute('value', '!');
        element.setAttribute('material', {
            color: 'orange'
        });

        return;
    }
    element.setAttribute('color', 'white');
    element.setAttribute('value', 'i');
    element.setAttribute('material', {
        color: 'white'
    });
}
