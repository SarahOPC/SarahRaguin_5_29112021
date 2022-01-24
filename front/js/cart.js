function getInformationFromLocalStorageId(productId){
    let productFromApi = "http://localhost:3000/api/products/" + productId;
    // requête http pour récupérer les informations des produits depuis l'API
    return fetch(productFromApi)
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
    .then (function(data){
        addElementsToCart(data);
    })
    .catch (function(err){
        console.log("Erreur : " + err)
    });
}

function addElementsToCart(product, productImage, productName){
    
    // Image
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    
    // H2 contenant le nom du produit
    productName.textContent = product.name;
    
    // Insertion du p contenant le prix dans cart__item__content__description
    document.querySelectorAll("#cart__item__content__description p")[1].textContent = product.price;
}

// Va chercher les éléments dans le localStorage
let actualCart = JSON.parse(localStorage.getItem("cart"));

let i = 0;
actualCart.forEach(product => {
    
    // Création des éléments du DOM
    while (product != null){
        i++;
    }
    let article = document.createElement("article" + i);
    
    let cart__item__img = document.createElement("cart__item__img")
    let productImage = document.createElement("img");
    
    let cart__item__content = document.createElement("div");
    cart__item__content.setAttribute("id", "cart__item__content");
    
    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.setAttribute("id", "cart__item__content__description");
    let productName = document.createElement("h2");
    let productColor = document.createElement("p");
    let productPrice = document.createElement("p");
    
    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.setAttribute("id", "cart__item__content__settings");
    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.setAttribute("id", "cart__item__content__settings__quantity");
    let pQuantity = document.createElement("p");
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.setAttribute("id", "cart__item__content__settings__delete");
        
    // Place le p de productPrice après le p de productColor
    productColor.after(productPrice);
    
    //Insertion des éléments du DOM
    document.getElementById("cart__items").appendChild(article);

    document.querySelector("article").appendChild(cart__item__img);
    document.querySelector("cart__item__img").appendChild(productImage);
    
    document.querySelector("article").appendChild(cart__item__content);
    
    document.getElementById("cart__item__content").appendChild(cart__item__content__description);
    document.getElementById("cart__item__content__description").appendChild(productName);
    document.getElementById("cart__item__content__description").appendChild(productColor);
    document.getElementById("cart__item__content__description").appendChild(productPrice);
    

    document.getElementById("cart__item__content").appendChild(cart__item__content__settings);
    document.getElementById("cart__item__content__settings").appendChild(cart__item__content__settings__quantity);
    document.getElementById("cart__item__content__settings__quantity").appendChild(pQuantity);
    document.getElementById("cart__item__content__settings").appendChild(cart__item__content__settings__delete);
    
    // Donne la couleur pour chaque item du localStorage
    document.querySelectorAll("#cart__item__content__description p")[0].textContent = product.colors;

    // Donne la quantité pour chaque item du localStorage
    document.getElementById("cart__item__content__settings__quantity").textContent = "Qté = " + product.quantity;
    
    // Récupère l'id du localStorage pour aller chercher les autres informations des produits dans l'API
    getInformationFromLocalStorageId(product.id);
});