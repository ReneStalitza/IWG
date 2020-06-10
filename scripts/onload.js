/*
 * Basic on-load functionality for the application. 
 * Loads all trees from data, displays those which are relevant (= close enough) to the current position. 
 */
var places;
// Set max/min coordinates to interact in a smaller area TODO: change to var values
var maxLat = 51.968956;
var minLat = 51.962976;
var maxLon = 7.641953;
var minLon = 7.611886;

window.onload = () => {
    fetch('https://raw.githubusercontent.com/snavas/InteractionWithGeoinformation/master/assets/osmtrees.geojson')
        .then(response => response.json())
        .then(data => places = data);

    setTimeout(() => {
        scene = document.querySelector('a-scene');
        places.features.forEach((place) => {
            const latitude = place.geometry.coordinates[1];
            const longitude = place.geometry.coordinates[0];
            const species = place.species;
            // just add trees of selected area
            if (latitude < maxLat && latitude > minLat && longitude < maxLon && longitude > minLon) {

                const icon = document.createElement('a-text');
                icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                icon.setAttribute('look-at', '[gps-camera]');
                icon.setAttribute('scale', '10 10 10');
                icon.setAttribute('value', 'X');
                icon.setAttribute('geometry', 'primitive: ring; radiusInner: 0.11; radiusOuter: 0.14');
                icon.setAttribute('align', 'center');
                if (species == "" || species == undefined) {
                    icon.setAttribute('species', rdmSpecies());
                } else {
                    icon.setAttribute('species', species);
                }
               // console.log(icon.getAttribute('species'));
                checkIfEndangered(icon);
                scene.appendChild(icon);
            } else {};
        });
        distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distance');
    }, 5000);
};
