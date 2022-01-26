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

// Va chercher les éléments dans le localStorage
let actualCart = JSON.parse(localStorage.getItem("cart"));

let i = 0;
actualCart.forEach(product => {
    // Création des éléments du DOM
    let article = document.createElement("article");
    let currentArticleName = "cart__item__" + i;
    article.setAttribute("id", currentArticleName);

    let cart__item__img = document.createElement("div");
    let currentImgName = "cart__item__img__" + i;
    cart__item__img.setAttribute("id", currentImgName);
    let productImage = document.createElement("img");
    let currentImg = "img__" + i;
    productImage.setAttribute("id", currentImg);
    


    productImage.setAttribute("src", productImage.src);
    productImage.setAttribute("alt", productImage.alt);
    
    let cart__item__content = document.createElement("div");
    let currentContentName = "cart__item__content__" + i;
    cart__item__content.setAttribute("id", currentContentName);
    
    let cart__item__content__description = document.createElement("div");
    let currentDescriptionName = "cart__item__content__description__" + i;
    cart__item__content__description.setAttribute("id", currentDescriptionName);
    let productName = document.createElement("h2");
    let currentProductName = "productName__" + i;
    productName.setAttribute("id", currentProductName);
    let productColor = document.createElement("p");
    let currentProductColor = "productColor__" + i;
    productColor.setAttribute("id", currentProductColor);
    let productPrice = document.createElement("p");
    let currentProductPrice = "productPrice__" + i;
    productPrice.setAttribute("id", currentProductPrice);
    
    let cart__item__content__settings = document.createElement("div");
    let currentSettings = "cart__item__content__settings__" + i;
    cart__item__content__settings.setAttribute("id", currentSettings);
    let cart__item__content__settings__quantity = document.createElement("div");
    let currentQuantity = "cart__item__content__settings__quantity__" + i;
    cart__item__content__settings__quantity.setAttribute("id", currentQuantity);
    let pQuantity = document.createElement("p");
    let currentPQuantity = "pQuantity__" + i;
    pQuantity.setAttribute("id", currentPQuantity);
    let cart__item__content__settings__delete = document.createElement("div");
    let currentDelete = "cart__item__content__settings__delete__" + i;
    cart__item__content__settings__delete.setAttribute("id", currentDelete);
    
    //Insertion des éléments du DOM
    document.getElementById("cart__items").appendChild(article);
    
    document.getElementById("cart\_\_item\_\_" + i).appendChild(cart__item__img);
    document.getElementById("cart\_\_item\_\_img\_\_" + i).appendChild(productImage);
    
    document.getElementById("cart\_\_item\_\_" + i).appendChild(cart__item__content);
    
    document.getElementById("cart\_\_item\_\_content\_\_" + i).appendChild(cart__item__content__description);
    document.getElementById("cart\_\_item\_\_content\_\_description\_\_" + i).appendChild(productName);
    document.getElementById("cart\_\_item\_\_content\_\_description\_\_" + i).appendChild(productColor);
    document.getElementById("cart\_\_item\_\_content\_\_description\_\_" + i).appendChild(productPrice);
    
    
    document.getElementById("cart\_\_item\_\_content\_\_" + i).appendChild(cart__item__content__settings);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_" + i).appendChild(cart__item__content__settings__quantity);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_quantity\_\_" + i).appendChild(pQuantity);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_" + i).appendChild(cart__item__content__settings__delete);
    
    // Donne la couleur pour chaque item du localStorage
    document.querySelectorAll("#cart\_\_item\_\_content\_\_description\_\_" + i + " p")[0].textContent = product.colors;
    
    // Donne la quantité pour chaque item du localStorage
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_quantity\_\_" + i).textContent = "Qté = " + product.quantity;
    
    // Récupère l'id du localStorage pour aller chercher les autres informations des produits dans l'API
    getInformationFromLocalStorageId(product.id);
    i++;
});