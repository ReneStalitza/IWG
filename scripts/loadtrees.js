var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function loadTrees() {
    fetch('https://raw.githubusercontent.com/snavas/InteractionWithGeoinformation/master/assets/osmtrees.geojson')
        .then(response => response.json())
        .then(data => places = data);

    setTimeout(() => {
        scene = document.querySelector('a-scene');

        navigator.geolocation.getCurrentPosition(success, error, options);

        var lat = document.querySelector('a-camera').getAttribute('latVal');
        var lon = document.querySelector('a-camera').getAttribute('lonVal');

        var pqueue = new PseudoPQueue(50);

        places.features.forEach((place) => {
            var dist = getDistance(lat, lon, place.geometry.coordinates[1], place.geometry.coordinates[0]);
            pqueue.enqueue(dist, place);
        });

        while (!pqueue.isEmpty()) {
            var currPlace = pqueue.deleteMin();
            addPlace(currPlace);
        }
        distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distance');
    }, 3000);
}

function addPlace(place) {
    const latitude = place.geometry.coordinates[1];
    const longitude = place.geometry.coordinates[0];
    const species = place.species;
    const icon = document.createElement('a-text');
    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
    icon.setAttribute('look-at', '[gps-camera]');
    icon.setAttribute('clickable', '');
    icon.setAttribute('description', '');
    icon.setAttribute('scale', '7 7 7');
    icon.setAttribute('geometry', 'primitive: ring; radiusInner: 0.11; radiusOuter: 0.14');
    icon.setAttribute('align', 'center');
    if (species == "" || species == undefined) {
        icon.setAttribute('species', rdmSpecies());
    } else {
        icon.setAttribute('species', species);
    }
    checkIfEndangered(icon);

    var rdmInt = Math.floor((Math.random() * 2) + 1);
    if (rdmInt == 1) {
        markTree(icon);
    }

    scene.appendChild(icon);
}

// Function to use as parameter for retrieving location
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Set location if retrieval was succesful
function success(pos) {
    var crd = pos.coords;
    document.querySelector('a-camera').setAttribute('latVal', crd.latitude);
    document.querySelector('a-camera').setAttribute('lonVal', crd.longitude);
    console.log(crd.latitude);
}
