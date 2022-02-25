let protocol = "http://";
let domainName = "localhost:3000/api/products/";

// Pour récupérer l'id dans l'URL
let productUrlId = window.location.search;

// Pour extraire l'id avec URLSearchParams
let extractId = new URLSearchParams(productUrlId);

let finalExtractId = extractId.get("id");

function getInformationOfProductById(){
    let currentProductApi = `http://localhost:3000/api/products/${finalExtractId}`;
    return fetch(currentProductApi)
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
    .then (function(data){
        addInformationToDom(data);
    })
    .catch (function(err){
        console.log("Erreur : " + err)
    });
}

function addInformationToDom(currentProduct){
    document.getElementById("title").textContent = currentProduct.name;
    document.title = currentProduct.name;
    document.getElementById("price").textContent = currentProduct.price;
    document.getElementById("description").textContent = currentProduct.description;
    let select = document.getElementById("colors");

    currentProduct.colors.forEach( currentColor => {
        let option = document.createElement("option");
        option.text = currentColor;
        select.add(option);
    } )

    let productImage = document.createElement("img");
    productImage.src = currentProduct.imageUrl;
    productImage.alt = currentProduct.altTxt;
    document.querySelector(".item__img").appendChild(productImage);
    // document.querySelector("") ==> Sélectionne le premier élément du selecteur donné
}

getInformationOfProductById();

//---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//

// Envoi au localStorage

document.getElementById("addToCart").addEventListener("click", function() {
  this.style.backgroundColor = "darkblue";
});

document.getElementById("addToCart").addEventListener("click", saveInStorage);

function putInStorage(cartStorage){
    // Créer un panier vide si n'existe pas déjà
    if(cartJs == null){
        cartJs = [];
    }
    // Créer l'objet Js avec ses valeurs
    let objJs = {
        id : finalExtractId,
        quantity : parseInt(document.getElementById("quantity").value),
        colors : document.getElementById("colors").value
    }

    // Ajouter l'objet Js au panier
    cartJs.push(objJs);

    // Le passer en Json pour le mettre dans le localStorage
    cartStorage = JSON.stringify(cartJs); // Passe du Js au JSON
    localStorage.setItem("cart", cartStorage);
    return cartStorage;
}

// Vérifie si id et colors existe déjà dans le panier
function productExist(finalExtractId, currentColors, cartStorage){
    // Cherche et renvoit la valeur du premier élément respectant les conditions données
    return cartStorage.find(product => product.id == finalExtractId && product.colors == currentColors);
}

function saveInStorage(){
    // Pour récupérer l'id dans l'URL
    let productUrlId = window.location.search;

    // Pour extraire l'id avec URLSearchParams
    let extractId = new URLSearchParams(productUrlId);
    let id_url = extractId.get("id");

    // Aller chercher le panier
    let cartStorage = localStorage.getItem("cart");
    cartJs = JSON.parse(cartStorage); // Passe du Json au Js
    let currentColors = window.document.getElementById("colors").value;

    if(cartJs != null && productExist(id_url, currentColors, cartJs)) {
        let product_exist = productExist(id_url, currentColors, cartJs);

        cartJs.forEach(product => {
            if( product.id == product_exist.id &&
                product.colors == product_exist.colors ){

                let oldQuantity = parseInt(product.quantity);
                let newQuantity = parseInt(document.getElementById("quantity").value);
                product.quantity = oldQuantity + newQuantity;
            }
        })
    
        cartStorage = JSON.stringify(cartJs);
        localStorage.setItem("cart", cartStorage);
        
    } else {
        putInStorage(cartStorage);
    }
}