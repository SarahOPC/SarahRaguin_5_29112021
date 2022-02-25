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
    for(let products of data){
                
        creationOfTags();
        insertion();
        addingElements(products);
    }
}

getProducts();

function creationOfTags(){
    let myLink = document.createElement("a");
    let myName = document.createElement("h3");
    let myImage = document.createElement("img");
    let myAltTxt = document.createElement("alt");
    let myDescription = document.createElement("p");
    let newDiv = document.createElement("article");
    
    return {myLink, myName, myImage, myAltTxt, myDescription, newDiv};
    // fonction retourne un objet contenant les variables voulues(écriture abrégée de l'objet))
    // Since the names of the properties are the same as the variables, you can shorten it
}

function insertion(){
    let elements = creationOfTags();
    let myLink =  elements.myLink;
    let newDiv = elements.newDiv;
    myLink.appendChild(newDiv);
    let myName = elements.myName;
    newDiv.appendChild(myName);
    let myImage = elements.myImage;
    newDiv.appendChild(myImage);
    let myAltTxt = elements.myImage;
    newDiv.appendChild(myAltTxt);
    let myDescription = elements.myDescription;
    newDiv.appendChild(myDescription);

    // ajoute le nouvel élément créé et son contenu dans le DOM
        let items = document.getElementById("items").appendChild(myLink);
        return items;
}

function addingElements(products){
    let elements = creationOfTags();
    let myLink = elements.myLink;
    myLink.href = `product.html?id=${products._id}`;
    let myName = elements.myName;
    myName.textContent = products.name;
    let myImage = elements.myImage;
    myImage.src = products.imageUrl;
    myImage.alt = products.altTxt;
    let myDescription = elements.myDescription;
    myDescription.textContent = products.description;
}
