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
        
        let myLink = document.createElement("a");
        let myName = document.createElement("h3");
        let myImage = document.createElement("img");
        let myAltTxt = document.createElement("alt");
        let myDescription = document.createElement("p");
        let newDiv = document.createElement("article");
        
        myLink.href = `product.html?id=${products._id}`;
        myName.textContent = products.name;
        myImage.src = products.imageUrl;
        myImage.alt = products.altTxt;
        myDescription.textContent = products.description;
        
        myLink.appendChild(newDiv);
        newDiv.appendChild(myName);
        newDiv.appendChild(myImage);
        newDiv.appendChild(myAltTxt);
        newDiv.appendChild(myDescription);
        
        // ajoute le nouvel élément créé et son contenu dans le DOM
        document.getElementById("items").appendChild(myLink);
    }
}

getProducts();
/*createElement et appendChild sont déjà utilisés dans la boucle*/