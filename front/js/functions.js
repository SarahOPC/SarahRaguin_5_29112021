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
    for(let i = 0; i<data.length; i ++){
        let product = data[i];
        addElement();
}
}

// cré un nouvel élément et ajouter des éléments dedans
function addElement () {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(product._id, product.name, product.imageUrl, product.altText, product.description);
  newDiv.appendChild(newContent);

// ajoute le nouvel élément créé et son contenu dans le DOM
  let currentDiv = document.getElementById('items');
  document.body.insertBefore(newDiv, currentDiv);
}