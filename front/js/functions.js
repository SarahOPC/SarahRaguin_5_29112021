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
// variable stockant les éléments de chaque produit à chaque tour de boucle
        let product = data[i];
// variable permettant de stocker les éléments Json de chaque produit dans un objet js
        let products = JSON.parse(product);
// retourne les éléments de chaque produit dans le html
        addElement();
}
}

// cré un nouvel élément et ajouter des éléments dedans
function addElement () {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(products._id, products.name, products.imageUrl, products.altText, products.description);
  newDiv.appendChild(newContent);

// ajoute le nouvel élément créé et son contenu dans le DOM
  let currentDiv = document.getElementById('items');
  document.body.insertBefore(newDiv, currentDiv);
}

// JSON.parse(nomdelavariablejsonaparserpourtransformerdujsonenobjetjs)
// JSON.stringify(transformeunobjetjsennotationjson)
