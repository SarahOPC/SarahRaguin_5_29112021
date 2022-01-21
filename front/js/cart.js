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

function addElementsToCart(product){
    
    // Image
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    
    // H2 contenant le nom du produit
    productName.textContent = product.name;    
    
    // Insertion du p contenant le prix dans cart__item__content__description
    document.querySelectorAll(".cart__item__content__description p")[1].textContent = product.price;
}

// Va chercher les éléments dans le localStorage
let actualCart = JSON.parse(localStorage.getItem("cart"));
actualCart.forEach(product => {
    
    // Création des éléments du DOM
    let article = document.createElement("article");
    
    let cart__item__img = document.createElement("cart__item__img")
    let productImage = document.createElement("img");
    
    let cart__item__content = document.createElement("div");
    cart__item__content.classList.add("cart__item__content");
    
    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.classList.add = "cart__item__content__description";
    let productName = document.createElement("h2");
    let productColor = document.createElement("p");
    let productPrice = document.createElement("p");
    
    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.classList.add = "cart__item__content__settings";
    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.classList.add = "cart__item__content__settings__quantity";
    let pQuantity = document.createElement("p");
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
        
    // Place le p de productPrice après le p de productColor
    productColor.after(productPrice);
    
    //Insertion des éléments du DOM
    document.getElementById("cart__items").appendChild(article);

    document.getElementsByTagName("article")[0].appendChild(cart__item__img);
    document.querySelector("cart__item__img").appendChild(productImage);
    
    document.getElementsByTagName("article")[0].appendChild(cart__item__content);
    
    document.getElementsByClassName("cart__item__content")[0].appendChild(cart__item__content__description);
    document.querySelector("cart__item__content__description").appendChild(productName);
    document.querySelector("cart__item__content__description").appendChild(productColor);
    document.querySelector("cart__item__content__description").appendChild(productPrice);
    

    document.getElementsByClassName("cart__item__content")[0].appendChild(cart__item__content__settings);
    document.getElementsByClassName("cart__item__content__settings")[0].appendChild(cart__item__content__settings__quantity);
    document.getElementsByClassName("cart__item__content__settings__quantity")[0].appendChild(pQuantity);
    document.getElementsByClassName("cart__item__content__settings")[0].appendChild(cart__item__content__settings__delete);
    
    // Donne la couleur pour chaque item du localStorage
    document.querySelector("cart__item__content__description p").textContent = product.colors;

    // Donne la quantité pour chaque item du localStorage
    document.getElementsByClassName("cart__item__content__settings__quantity")[0].textContent = "Qté = " + product.quantity;

// Récupère l'id du localStorage pour aller chercher les autres informations des produits dans l'API
getInformationFromLocalStorageId(product.id);
});