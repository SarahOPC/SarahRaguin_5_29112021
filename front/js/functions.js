// fonction pour communiquer avec l'API et récupérer les données.

function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then (function(response){
        if (response.ok){
            return response.json();
        }
        })
        .then (function(data){
            return addElement();
        })
        .catch (function(err){
            console.log("Erreur : " + err)
        });  
}

// va chercher les éléments un par un dans l'API pour chaque produit
function getElements(){
    for(let product of data){
    document.getElementById("_id");
    document.getElementById("imageUrl");
    document.getElementById("altText")
    document.getElementById("name");
    document.getElementById("description");
//Va chercher les élements dans le html et non dans le json ? A revoir !!!
}
}

// cré un nouvel élément et ajouter des éléments dedans
function addElement () {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(getElements());
  newDiv.appendChild(newContent);

// ajoute le nouvel élément créé et son contenu dans le DOM
  let currentDiv = document.getElementById('items');
  document.body.insertBefore(newDiv, currentDiv);
}