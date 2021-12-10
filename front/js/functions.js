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
    let products;
    for(let i = 0; i<data.length; i ++){
        console.log(data[i]._id);
        console.log(data[i].name);
        console.log(data[i].imageUrl);
        console.log(data[i].altTxt);
        console.log(data[i].description);
// variable stockant les éléments de chaque produit à chaque tour de boucle
        addElement(product);
    }
    return products;
}

// crée un nouvel élément et ajouter des éléments dedans
function addElement (product) {
    let myLink = document.createElement("a");
    myLink.href = product._id;

    let myName = document.createElement("h3");
    myName.h3 = product.name;

    let myImage = document.createElement("img");
    myImage.img = product.imageUrl;

    let myAltTxt = document.createElement("alt");
    myAltTxt.alt = product.altTxt;

    let myDescription = document.createElement("p");
    myDescription.p = product.description;


    let newDiv = document.createElement("div");
    newDiv.appendChild(myLink);
    newDiv.appendChild(myName);
    newDiv.appendChild(myImage);
    newDiv.appendChild(myAltTxt);
    newDiv.appendChild(myDescription);

// ajoute le nouvel élément créé et son contenu dans le DOM
  let currentDiv = document.getElementById('items');
  document.body.insertBefore(newDiv, currentDiv);
}