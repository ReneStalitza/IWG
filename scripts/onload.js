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

var active;

window.onload = () => {
    loadTrees();
};

AFRAME.registerComponent('clickable', {
    init: function () {
        let el = this.el;

        // set color on click dependent on index component
        el.addEventListener('click', e => {

            el.setAttribute('geometry', 'radiusOuter: 0.2');
            if (active == "" || active == undefined) {} else {
                active.setAttribute('geometry', 'radiusOuter: 0.14');
            };

            active = el;
            document.getElementById('treeSpecies').innerHTML = el.getAttribute('species');

            if (el.components.text.data.color == 'orange' || el.components.text.data.color == 'red') {
                document.getElementById('pot').innerHTML = 'Yes';
                document.getElementById('afButton').style.display = "block"
            } else {
                document.getElementById('pot').innerHTML = 'No';
                document.getElementById('afButton').style.display = "none";

            }

            if (el.components.text.data.color == 'red') {
                document.getElementById('isAffected').innerHTML = 'Yes';
            } else {
                document.getElementById('isAffected').innerHTML = 'No';
            }

            document.getElementById("myList").innerHTML = '';
            let len = el.components.description.data.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    document.getElementById("myList").appendChild(el.components.description.data[i]);
                }
            } else {
                document.getElementById("myList").innerHTML = '';
            }

        });
    }
});

AFRAME.registerComponent('description', {
    schema: {
        type: 'array',
        default: []
    }
});


function openInfobox() {
    let infobox = document.querySelector("#infobox");
    infobox.classList.toggle("opened");
    let button = document.querySelector(".button-in");
    button.classList.toggle("open");
}

function addInfo() {
    if (active == "" || active == undefined) {
        //alert("Please select a tree");
    } else {
        var node = document.createElement("LI");
        var text = document.getElementById('des').value;
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);

        active.components.description.data.push(node);

        document.getElementById('des').value = "";
    }
}
