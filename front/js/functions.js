// fonction pour communiquer avec l'API et récupérer les données.

function getProducts() {
    return fetch("http://localhost:3000/api/products")
        .then (function(response){
        if (response.ok){
            return response.json();
        }
        })
        .then (function(data){
            return getElements(data);
        })
        .catch (function(err){
            console.log("Erreur : " + err)
        });  
}

// va chercher les éléments un par un dans l'API pour chaque produit
function getElements(data){
    console.log(data [0].name);
    let products;
    for(let i = 0; i<data.length; i ++){
// variable stockant les éléments de chaque produit à chaque tour de boucle
        addElement(product);
    }
    return products;
}

// crée un nouvel élément et ajouter des éléments dedans
function addElement (product) {
    let myLink = document.createElement("a");
    myLink.href = product._id

  let newDiv = document.createElement("div");
    newDiv.appendChild( myLink )

  let newContent = document.createTextNode(product._id, product.name, product.imageUrl, product.altText, product.description);
  newDiv.appendChild(newContent);

// ajoute le nouvel élément créé et son contenu dans le DOM
  let currentDiv = document.getElementById('items');
  document.body.insertBefore(newDiv, currentDiv);
}

// JSON.parse(nomdelavariablejsonaparserpourtransformerdujsonenobjetjs)
// JSON.stringify(transformeunobjetjsennotationjson)
