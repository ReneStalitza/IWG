
/*
function openInfobox() {
    let infobox = document.querySelector("#infobox");
    infobox.classList.toggle("opened");
    let icon = document.querySelector(".md");
    icon.classList.toggle("open");
    
}
*/
      AFRAME.registerComponent('clickable', {
            init: function(){
                let el = this.el;
                let self = this;
                self.trees = [];              
                el.addEventListener("model-loaded", e =>{
                    let tree3D = el.getObject3D('mesh');
                    if (!tree3D){return;}    
                    tree3D.traverse(function(node){
                        if (node.isMesh){   
                          self.trees.push(node);
                            console.log(el);
                         
                        }
                    });
                });
                // set color on click dependent on index component
                el.addEventListener('click', e =>{  
                    alert(self.trees[0].el.components.species);
                    console.log(self.trees[0].el.components.species);
               
                });
             }
      });