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
    // Création de l'article et insertion dans cart__items
    let article = document.createElement("article");
    document.getElementById("cart__items").appendChild(article);

    // Création de l'image
    let productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    let imageClasse = document.querySelector(".cart__item__img").appendChild(productImage);
    // Insertion de l'image dans l'article
    document.getElementsByTagName("article").appendChild(imageClasse);
    
    // Création de cart__item__content
    let cart__item__content = document.createElement("div");
    div.className = "cart__item__content";
    // Insertion dans article
    document.getElementsByTagName("article").appendChild(cart__item__content);

    // Création de cart__item__content__description
    let cart__item__content__description = document.createElement("div");
    div.className = "cart__item__content__description";
    // Insertion dans cart__item__content
    document.getElementsByClassName(".cart__item__content").appendChild(cart__item__content__description);

    // Création du h2 contenant le nom du produit dans cart__item__content__description
    let productName = document.createElement("h2");
    productName.textContent = product.name;
    // Insertion dans cart__item__content__description
    document.querySelector("cart__item__content__description").appendChild(productName);

    // Création du p contenant la couleur et insertion dans cart__item__content__description
    let productColor = document.createElement("p");
    document.querySelector("cart__item__content__description").appendChild(productColor);

    // Création du p contenant le prix et insertion dans cart__item__content__description
    let productPrice = document.createElement("p")
    document.querySelector("cart__item__content__description").appendChild(productPrice);
    // Place le p de productPrice après le p de productColor
    productColor.after(productPrice);
    document.querySelectorAll(".cart__item__content__description p")[1].textContent = product.price;
}
// Va chercher les éléments dans le localStorage
let actualCart = JSON.parse(localStorage.getItem("cart"));
actualCart.forEach(product => {
    // Donne la couleur pour chaque item du localStorage
    document.querySelector(".cart__item__content__description p").textContent = product.colors;
    // Donne la quantité pour chaque item du localStorage
    document.getElementsByClassName("cart__item__content__settings__quantity").value = product.quantity;
    
// Récupère l'id du localStorage pour aller chercher les autres informations des produits dans l'API
getInformationFromLocalStorageId(product.id);
});