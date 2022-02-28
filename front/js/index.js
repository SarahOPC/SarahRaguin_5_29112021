//fonction pour communiquer avec l'API et récupérer les données.

async function getProducts() {
    return fetch("http://localhost:3000/api/products")
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
    .then (function(data){
        return addProductsDataToDom(data);
    })
    .catch (function(err){
        console.log("Erreur : " + err)
    });  
}

// va chercher les éléments un par un dans l'API pour chaque produit
// crée un nouvel élément et ajoute des éléments dedans

function addProductsDataToDom(data) {
    for(let product of data){
        let productCreated = createProductDiv(product);
        document.getElementById("items").appendChild(productCreated);
    }
}

function createProductDiv(product) {
    let myLink = document.createElement("a");
    let myName = document.createElement("h3");
    let myImage = document.createElement("img");
    let myAltTxt = document.createElement("alt");
    let myDescription = document.createElement("p");
    let newDiv = document.createElement("article");

    myLink.href = `product.html?id=${product._id}`;
    myName.textContent = product.name;
    myImage.src = product.imageUrl;
    myImage.alt = product.altTxt;
    myDescription.textContent = product.description;
    
    myLink.appendChild(newDiv);
    newDiv.appendChild(myName);
    newDiv.appendChild(myImage);
    newDiv.appendChild(myAltTxt);
    newDiv.appendChild(myDescription);

    return myLink;
}

getProducts();