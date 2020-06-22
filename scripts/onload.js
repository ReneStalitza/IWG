/*
 * Basic on-load functionality for the application. 
 * Loads all trees from data, displays those which are relevant (= close enough) to the current position. 
 */
var places;
// Set max/min coordinates to interact in a smaller area TODO: change to var values
var maxLat = 51.968956;
var minLat = 51.962976;
var maxLon = 7.636953;
var minLon = 7.620886;

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
                icon.setAttribute('clickable','');
                icon.setAttribute('scale', '10 10 10');
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
    }, 4000);
};


function openInfobox() {
    let infobox = document.querySelector("#infobox");
    infobox.classList.toggle("opened");
    let icon = document.querySelector(".md");
    icon.classList.toggle("open");
}

 AFRAME.registerComponent('clickable', {
            init: function(){
                let el = this.el;
                let self = this;
                self.trees = [];  
            //    console.log(el);
          /*      el.addEventListener("model-loaded", e =>{
                    let tree3D = el.getObject3D('mesh');
                    if (!tree3D){return;}    
                    tree3D.traverse(function(node){
                        if (node.isMesh){   
                          self.trees.push(node);
                            console.log(el);
                         
                        }
                    });
                }); */
                // set color on click dependent on index component
                el.addEventListener('click', e =>{  
            document.getElementById('treeSpecies').innerHTML= el.getAttribute('species');
             console.log(el.getAttribute('species'));
                
                });
             }
      });


/*
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
    
    document.getElementById("info").innerHTML =`Latitude : ${crd.latitude} Longitude: ${crd.longitude} max: ${crd.longitude + 0.5} ` ;
  
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

*/
