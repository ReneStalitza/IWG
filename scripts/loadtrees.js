function loadtrees() {

    var maxLat = 51.968956;
    var minLat = 51.962976;
    var maxLon = 7.636953;
    var minLon = 7.620886;

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
                var array = [];

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
                // console.log(icon.getAttribute('species'));
                checkIfEndangered(icon);

                var rdmInt = Math.floor((Math.random() * 2) + 1);
                if (rdmInt == 1) {
                    markTree(icon);
                }

                scene.appendChild(icon);
            } else {};
        });
        distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distance');
    }, 3000);
}
