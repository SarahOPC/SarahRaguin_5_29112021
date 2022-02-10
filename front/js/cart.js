/* 
1 - Mettre dans une variable le panier (du localStorage)
2 - Pour chaque élément du panier, faire un appel à l'API avec en paramètre l'id de l'élément courant
3 - Créer une balise article contenant les balises couleur, quantité, img, nom, ...
4 - AppendChild ces articles dans le DOM
 */
function getCartFromLocalStorage(){
    let actualCartJs = JSON.parse(localStorage.getItem("cart"));
    return actualCartJs;
}

function getProductFromApiById(productId){
    let productFromApi = "http://localhost:3000/api/products/" + productId;
    // requête http pour récupérer les informations des produits depuis l'API
    return fetch(productFromApi)
        .then (function(response){
            if (response.ok){
                return response.json();
            }
        }).catch (function(err){
            console.log("Erreur : " + err)
        });
}

function getArticleTag(currentProductFromLocalStorage, currentProductFromApi, i){
    // Création des balises

    // article
    let article = document.createElement("article");
    let currentArticleName = "cart__item__" + i;
    article.setAttribute("id", currentArticleName);
    article.setAttribute("class", "cart__item");

    // data-id et data-color
    article.setAttribute("data-id", currentProductFromLocalStorage.id);
    article.setAttribute("data-color", currentProductFromLocalStorage.colors);
    
    // cart__item__img et img
    let cart__item__img = document.createElement("div");
    let currentImgName = "cart__item__img__" + i;
    cart__item__img.setAttribute("id", currentImgName);
    cart__item__img.setAttribute("class", "cart__item__img");
    let productImage = document.createElement("img");
    
    // cart__item__content
    let cart__item__content = document.createElement("div");
    let currentContent = "cart__item__content__" + i;
    cart__item__content.setAttribute("id", currentContent);
    
    // cart__item__content__description
    let cart__item__content__description = document.createElement("div");
    let currentDescription = "cart__item__content__description__" + i;
    cart__item__content__description.setAttribute("id", currentDescription);
    
    // h2
    let productName = document.createElement("h2");
    let currentProductName = "productName__" + i;
    productName.setAttribute("id", currentProductName);
    
    // 1er p
    let productColor = document.createElement("p");
    let currentProductColor = "productColor__" + i;
    productColor.setAttribute("id", currentProductColor);
    
    // 2nd p
    let productPrice = document.createElement("p");
    let currentProductPrice = "productPrice__" + i;
    productPrice.setAttribute("id", currentProductPrice);
    
    // cart__item__content__settings
    let cart__item__content__settings = document.createElement("div");
    let currentSettings = "cart__item__content__settings__" + i;
    cart__item__content__settings.setAttribute("id", currentSettings);
    cart__item__content__settings.setAttribute("class", "cart__item__content__settings");
    
    // cart__item__content__settings__quantity
    let cart__item__content__settings__quantity = document.createElement("div");
    let currentQuantity = "cart__item__content__settings__quantity__" + i;
    cart__item__content__settings__quantity.setAttribute("id", currentQuantity);
    cart__item__content__settings__quantity.setAttribute("class", "cart__item__content__settings__quantity");
    
    // p quantité
    let pQuantity = document.createElement("p");
    let currentPQuantity = "pQuantity__" + i;
    pQuantity.setAttribute("id", currentPQuantity);
    pQuantity.textContent = "Qté : ";

    // input quantité
    let input = document.createElement("input");
    let currentInput = "itemQuantity__" + i;
    input.setAttribute("id", currentInput);
    input.setAttribute("type", "number");
    input.setAttribute("class", "itemQuantity");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.addEventListener('change', upDateValueOfInput);

    // cart__item__content__settings__delete
    let cart__item__content__settings__delete = document.createElement("div");
    let currentDelete = "cart__item__content__settings__delete__" + i;
    cart__item__content__settings__delete.setAttribute("id", currentDelete);
    cart__item__content__settings__delete.setAttribute("class", "cart__item__content__settings__delete");

    // p supprimer
    let pDelete = document.createElement("p");
    pDelete.setAttribute("class", "deleteItem");
    pDelete.setAttribute("id", "deleteItem__" + i);
    pDelete.textContent = "Supprimer";
    pDelete.addEventListener('click', removeArticle);

    
    // Insertion des éléments dans les différentes div dans l'article
    document.getElementById("cart__items").appendChild(article);
    
    // Image
    document.getElementById("cart\_\_item\_\_" + i).appendChild(cart__item__img);
    document.getElementById("cart\_\_item\_\_img\_\_" + i).appendChild(productImage);
    
    // Content
    document.getElementById("cart\_\_item\_\_" + i).appendChild(cart__item__content);
    
    // Description
    document.getElementById("cart\_\_item\_\_content\_\_" + i).appendChild(cart__item__content__description);
    document.getElementById("cart\_\_item\_\_content\_\_description\_\_" + i).appendChild(productName);
    document.getElementById("cart\_\_item\_\_content\_\_description\_\_" + i).appendChild(productColor);
    document.getElementById("cart\_\_item\_\_content\_\_description\_\_" + i).appendChild(productPrice);
    
    // Settings
    document.getElementById("cart\_\_item\_\_content\_\_" + i).appendChild(cart__item__content__settings);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_" + i).appendChild(cart__item__content__settings__quantity);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_quantity\_\_" + i).appendChild(pQuantity);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_quantity\_\_" + i).appendChild(input);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_" + i).appendChild(cart__item__content__settings__delete);
    document.getElementById("cart\_\_item\_\_content\_\_settings\_\_delete\_\_" + i).appendChild(pDelete);
    
    // Insertion des informations de chaque produit dans les div correspondantes
    productImage.setAttribute("src", currentProductFromApi.imageUrl); //-----------------------
    productImage.setAttribute("alt", currentProductFromApi.altTxt); //-------------------------
    productName.textContent = currentProductFromApi.name; //-----------------------------------
    productPrice.textContent = currentProductFromApi.price + " €"; //---------------------------------
    document.querySelectorAll("#cart\_\_item\_\_content\_\_description\_\_" + i + " p")[0].textContent = currentProductFromLocalStorage.colors;
    input.setAttribute("value", currentProductFromLocalStorage.quantity);
    
    return article;
}

function insertArticleTag(currentArticleTag){
    document.getElementById("cart__items").appendChild(currentArticleTag);
}

async function buildCart(){
    let cartContentJs = getCartFromLocalStorage();
    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i = 0; i < cartContentJs.length; i ++){
        let currentProductFromLocalStorage = cartContentJs[i];
        let currentProductFromApi = await getProductFromApiById(currentProductFromLocalStorage.id);
        let currentArticleTag = getArticleTag(currentProductFromLocalStorage, currentProductFromApi, i);
        insertArticleTag(currentArticleTag);
        totalQuantity += currentProductFromLocalStorage.quantity;
        totalPrice += currentProductFromApi.price * currentProductFromLocalStorage.quantity;
    }
    await insertTotalQuantity(totalQuantity);
    await insertTotalPrice(totalPrice);
}

buildCart();

/*
1 - Récupérer les quantités de chaque article du localStorage et les ajouter
2 - Mettre ce total dans l'id "totalQuantity"
3 - Récupérer les prix de chaque article du localStorage et les ajouter
4 - Mettre ce total dans l'id "totalPrice"

5 - Modifier les quantités des articles dans le DOM et le localStorage :
6 - Utiliser le addEventListener (change, upDateLocalStorage()) sur l'input
7 - Créer la fonction upDateLocalStorage() contenant :
8 - localStorage.setItem("nouvelle valeur");
9 - "nouvelle valeur" provenant de la lecture du value de l'input ie inputValue
10 - Supprimer un article :
11 - Utiliser le element.closest() et les id et colors
12 - Utiliser localStorage.removeItem
13 - let deletingOnClick = document.getElementById("pDelete")
14 - deletingOnClick.addEventListener("click", removingItem());
15 - removingItem() ===> if(inputValue === 0) alors localStorage.removeItem de l'article courant
16 - article courant retrouvé grâce à element.closest(productId, colors)
 */

// TotalQuantity
function insertTotalQuantity(totalQuantity){
    document.getElementById("totalQuantity").textContent = totalQuantity;
}

// TotalPrice
function insertTotalPrice(totalPrice){
    document.getElementById("totalPrice").textContent = totalPrice;
}

// Modification des inputs

function upDateValueOfInput(){
    let inputId = this.id;
    let input = document.getElementById(inputId);
    let newValue = parseInt(this.value);
    
    // Changement de la value dans le DOM
    input.removeAttribute("value");
    input.setAttribute("value", newValue);
    
    // Récupération des data-id et data-color
    let articleId = input.closest("article").dataset.id;
    let articleColor = input.closest("article").dataset.color;
    
    // Changement de la value dans le localStorage
    let cartStorage = localStorage.getItem("cart");
    let cartJs = JSON.parse(cartStorage);
    
    for (let i = 0; i < cartJs.length; i ++){
        if (cartJs[i].id === articleId && cartJs[i].colors === articleColor){
            cartJs[i].quantity = newValue;
        }
    };

    cartStorage = JSON.stringify(cartJs);
    localStorage.setItem("cart", cartStorage);

    return newValue;
}

// Suppression d'un article
// Array.splice(indice, nb d'élémént à supprimer)

function removeArticle(){

    let deleteId = this.id;
    let deleteP = document.getElementById(deleteId);
    
    let articleIdToDelete = deleteP.closest("article").dataset.id;
    let articleColorToDelete = deleteP.closest("article").dataset.color;

    let cartStorage = localStorage.getItem("cart");
    let cartJs = JSON.parse(cartStorage);
    console.log(cartJs);

    // récupérer l'id du dom (dataset.id) et le comparer à l'id de l'objet ==> object.id === dataset.id
    cartJs.forEach(item => {
        if (item.id === articleIdToDelete && item.colors === articleColorToDelete){
            let index = cartJs.findIndex(key => key.id === articleIdToDelete && key.colors === articleColorToDelete);
            cartJs.splice(index, 1);
            window.location.reload();
    };
    
    cartStorage = JSON.stringify(cartJs);
    localStorage.setItem("cart", cartStorage);
    });
}