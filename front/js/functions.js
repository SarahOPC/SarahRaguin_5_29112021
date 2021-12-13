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
// crée un nouvel élément et ajoute des éléments dedans
function getElements(data) {
    for(let products of data){

        let myLink = document.createElement("a");
        let myName = document.createElement("h3");
        let myImage = document.createElement("img");
        let myAltTxt = document.createElement("alt");
        let myDescription = document.createElement("p");
            
        myLink.textContent = products._id;
        myName.textContent = products.name;
        myImage.textContent = products.imageUrl;
        myAltTxt.textContent = products.altTxt;
        myDescription.textContent = products.description;

        let newDiv = document.createElement("div");
        newDiv.appendChild(myLink);
        newDiv.appendChild(myName);
        newDiv.appendChild(myImage);
        newDiv.appendChild(myAltTxt);
        newDiv.appendChild(myDescription);
        
        // ajoute le nouvel élément créé et son contenu dans le DOM
        document.getElementById('items').appendChild(newDiv);
        }
}