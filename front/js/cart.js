let protocol = "http://";
let domainName = "localhost:3000/api/products/";

// Mettre dans une variable le panier (du localStorage)
function getCartFromLocalStorage(){
    let actualCartJs = JSON.parse(localStorage.getItem("cart"));
    return actualCartJs;
}

// Pour chaque élément du panier, faire un appel à l'API avec en paramètre l'id de l'élément courant
function getProductFromApiById(productId){
    let productFromApi = protocol + domainName + productId;
    // requête http pour récupérer les informations des produits depuis l'API
    return fetch(productFromApi)
        .then (function(response){
            if (response.ok){
                return response.json();
            }
        })
        .catch (function(err){
            console.log("Erreur : " + err)
        });
}

async function buildCart(){
    let cartContentJs = getCartFromLocalStorage();
    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i = 0; i < cartContentJs.length; i ++){
        let currentProductFromLocalStorage = cartContentJs[i];
        let currentProductFromApi = await getProductFromApiById(currentProductFromLocalStorage.id);
        let currentArticleTag = creationOfDom(currentProductFromLocalStorage, currentProductFromApi, i);
        insertArticleTag(currentArticleTag);
        totalQuantity += currentProductFromLocalStorage.quantity;
        totalPrice += currentProductFromApi.price * currentProductFromLocalStorage.quantity;
    }
    await insertTotalQuantity(totalQuantity);
    await insertTotalPrice(totalPrice);
}

buildCart();

function insertArticleTag(currentArticleTag){
    document.getElementById("cart__items").appendChild(currentArticleTag);
}

function createArticle(currentProductFromLocalStorage, articleNumber){
    // article
    let article = document.createElement("article");
    let currentArticleName = "cart__item__" + articleNumber;
    article.setAttribute("id", currentArticleName);
    article.setAttribute("class", "cart__item");

    // data-id et data-color
    article.setAttribute("data-id", currentProductFromLocalStorage.id);
    article.setAttribute("data-color", currentProductFromLocalStorage.colors);
    
    return article;
}

function createImage(articleNumber){
    // cart__item__img et img
    let cart__item__img = document.createElement("div");
    let currentImgName = "cart__item__img__" + articleNumber;
    cart__item__img.setAttribute("id", currentImgName);
    cart__item__img.setAttribute("class", "cart__item__img");
    
    return cart__item__img;
}

function createContent(articleNumber) {
    // cart__item__content
    let cart__item__content = document.createElement("div");
    let currentContent = "cart__item__content__" + articleNumber;
    cart__item__content.setAttribute("id", currentContent);
    
    return cart__item__content;
}

function createContentDescription(articleNumber) {
    // cart__item__content__description
    let cart__item__content__description = document.createElement("div");
    let currentDescription = "cart__item__content__description__" + articleNumber;
    cart__item__content__description.setAttribute("id", currentDescription);
    
    return cart__item__content__description;
}

function createContentDescriptionName(articleNumber) {
    // h2 de descritpion (titre du produit)
    let productName = document.createElement("h2");
    let currentProductName = "productName__" + articleNumber;
    productName.setAttribute("id", currentProductName);
    
    return productName;
}

/**
 * 
 * @param {*} type : Type d'élément à créer
 * exemple : "Color" ou "Price"
 * @returns productColor ou productPrice
 */

function addSpecifications(type, articleNumber){
    let specification = document.createElement("p");
    let value = "product" + type + "__" + articleNumber;
    specification.setAttribute("id", value);
    return specification;
}

function createSettings(articleNumber){
    // cart__item__content__settings
    let cart__item__content__settings = document.createElement("div");
    let currentSettings = "cart__item__content__settings__" + articleNumber;
    cart__item__content__settings.setAttribute("id", currentSettings);
    cart__item__content__settings.setAttribute("class", "cart__item__content__settings");
    
    return cart__item__content__settings;
}

function createSettingsQuantity(articleNumber) {
    // cart__item__content__settings__quantity
    let cart__item__content__settings__quantity = document.createElement("div");
    let currentQuantity = "cart__item__content__settings__quantity__" + articleNumber;
    cart__item__content__settings__quantity.setAttribute("id", currentQuantity);
    cart__item__content__settings__quantity.setAttribute("class", "cart__item__content__settings__quantity");

    // p quantité
    let pQuantity = document.createElement("p");
    let currentPQuantity = "pQuantity__" + articleNumber;
    pQuantity.setAttribute("id", currentPQuantity);
    pQuantity.textContent = "Qté : ";

    // input quantité
    let input = document.createElement("input");
    let currentInput = "itemQuantity__" + articleNumber;
    input.setAttribute("id", currentInput);
    input.setAttribute("type", "number");
    input.setAttribute("class", "itemQuantity");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.addEventListener('change', upDateValueOfInput);

    let qtty = {cart__item__content__settings__quantity, pQuantity, input};
    return qtty;
}

function createSettingsDelete(articleNumber){
    // cart__item__content__settings__delete
    let cart__item__content__settings__delete = document.createElement("div");
    let currentDelete = "cart__item__content__settings__delete__" + articleNumber;
    cart__item__content__settings__delete.setAttribute("id", currentDelete);
    cart__item__content__settings__delete.setAttribute("class", "cart__item__content__settings__delete");

    // p supprimer
    let pDelete = document.createElement("p");
    pDelete.setAttribute("class", "deleteItem");
    pDelete.setAttribute("id", "deleteItem__" + articleNumber);
    pDelete.textContent = "Supprimer";
    pDelete.addEventListener('click', removeArticle);
    
    let supp = {cart__item__content__settings__delete, pDelete};
    return supp;
}

function creationOfDom(currentProductFromLocalStorage, currentProductFromApi, articleNumber){
    // Insertion des éléments dans les différentes div dans l'article
    let article = createArticle(currentProductFromLocalStorage, articleNumber);
    let cartItemArticle = document.getElementById("cart__items").appendChild(article);
    let cart__item__img = createImage(articleNumber);
    document.getElementById("cart__item__" + articleNumber).appendChild(cart__item__img);
    let productImage = document.createElement("img");
    document.getElementById("cart__item__img__" + articleNumber).appendChild(productImage);
    let cart__item__content = createContent(articleNumber);
    document.getElementById("cart__item__" + articleNumber).appendChild(cart__item__content);
    let cart__item__content__description = createContentDescription(articleNumber);
    document.getElementById("cart__item__content__" + articleNumber).appendChild(cart__item__content__description);
    let productName = createContentDescriptionName(articleNumber);
    document.getElementById("cart__item__content__description__" + articleNumber).appendChild(productName);
    let productColor = addSpecifications("Color", articleNumber);
    let productPrice = addSpecifications("Price", articleNumber);
    document.getElementById("cart__item__content__description__" + articleNumber).appendChild(productColor);
    document.getElementById("cart__item__content__description__" + articleNumber).appendChild(productPrice);
    let cart__item__content__settings = createSettings(articleNumber);
    document.getElementById("cart__item__content__" + articleNumber).appendChild(cart__item__content__settings);
    let qtty = createSettingsQuantity(articleNumber);
    let cart__item__content__settings__quantity = qtty.cart__item__content__settings__quantity;
    document.getElementById("cart__item__content__settings__" + articleNumber).appendChild(cart__item__content__settings__quantity);
    let pQuantity = qtty.pQuantity;
    document.getElementById("cart__item__content__settings__quantity__" + articleNumber).appendChild(pQuantity);
    let input = qtty.input;
    document.getElementById("cart__item__content__settings__quantity__" + articleNumber).appendChild(input);
    let supp = createSettingsDelete(articleNumber);
    let cart__item__content__settings__delete = supp.cart__item__content__settings__delete;
    document.getElementById("cart__item__content__settings__" + articleNumber).appendChild(cart__item__content__settings__delete);
    let pDelete = supp.pDelete;
    document.getElementById("cart__item__content__settings__delete__" + articleNumber).appendChild(pDelete);
    
    // Insertion des informations de chaque produit dans les div correspondantes
    productImage.setAttribute("src", currentProductFromApi.imageUrl);
    productImage.setAttribute("alt", currentProductFromApi.altTxt);
    productName.textContent = currentProductFromApi.name;
    productPrice.textContent = currentProductFromApi.price + " €";
    let firstP = document.getElementById("cart__item__content__description__" + articleNumber);
    firstP.querySelector("p").textContent = currentProductFromLocalStorage.colors;
    input.setAttribute("value", currentProductFromLocalStorage.quantity);

    return cartItemArticle;
}

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
    let newValue = parseInt(this.value);
    let input = document.getElementById(inputId);

    changeValueInDom(newValue, input);
    let newCartJs = changeValueInLocalStorage(input, newValue);
    putNewValueInStorage(newCartJs);
}

function changeValueInDom(newValue, input) {
    
    // Changement de la value dans le DOM
    input.removeAttribute("value");
    input.setAttribute("value", newValue);
}

function changeValueInLocalStorage(input, newValue){
    // Récupération des data-id et data-color
    let articleId = input.closest("article").dataset.id;
    let articleColor = input.closest("article").dataset.color;
    
    // Changement de la value dans le localStorage
    let cartStorage = localStorage.getItem("cart");
    let cartJs = JSON.parse(cartStorage);
    
    for (let i = 0; i < cartJs.length; i ++){
        if (cartJs[i].id === articleId && cartJs[i].colors === articleColor){
            cartJs[i].quantity = newValue;
            return cartJs;
        }
    };
    
}

function putNewValueInStorage(cartJs) {
    cartStorage = JSON.stringify(cartJs);
    localStorage.setItem("cart", cartStorage);
    window.location.reload();
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

// Regex testées sur https://regexr.com/
// et https://regex101.com/

// Regex pour adresse
//     /(^[0-9]{1,5}[A-Za-z-\séèçàêùî]+)/g // En début de ligne 1 à 5 chiffres compris entre 0 et 9 puis lettres majuscules ou minuscules, -, lettres avec accent

// Regex pour nom, prenom et ville
//     /([a-zA-Z-\séèçàêùî]+[^0-9])/g // minuscules, majuscules, - et espaces, lettres avec accent, pas de chiffres

// Regex pour email
//     /([\w\.-]\S+@[\w\.-]\S+\.[a-z\.\S]{2,})/g // lettres, chiffres et _  et . et - puis @ puis lettres, chiffres et _ et . puis . puis au moins 2 lettres

let regexAdress = /(^[0-9]{1,5}[A-Za-z-\séèçàêùî]+)/g;
let regexNameAndCity = /([a-zA-Z-\séèçàêùî]+[^0-9])/g;
let regexEmail = /([\w\.-]\S+@[\w\.-]\S+\.[a-z\.\S]{2,})/g;
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");
let submitButton = document.getElementById("order");
let form = document.querySelector(".cart__order__form");
    
function addPlaceholders(){
    inputFirstName.placeholder = "Jean";
    inputLastName.placeholder = "Dupont";
    inputAddress.placeholder = "123 Rue Des Champs Elysées";
    inputCity.placeholder = "Paris";
    inputEmail.placeholder = "jean.dupont@mail.fr";
}

addPlaceholders();

function validationOfEachInput(){
    
    inputFirstName.addEventListener("change", validationOfInput.bind(event, regexNameAndCity, inputFirstName, "Merci d'entrer un prénom valide", "firstNameErrorMsg"));
    inputLastName.addEventListener("change", validationOfInput.bind(event, regexNameAndCity, inputLastName, "Merci d'entrer votre nom de famille usuel", "lastNameErrorMsg"));
    inputAddress.addEventListener("change", validationOfInput.bind(event, regexAdress, inputAddress, "Nous avons besoin du numéro et du nom de la rue", "addressErrorMsg"));
    inputCity.addEventListener("change", validationOfInput.bind(event, regexNameAndCity, inputCity, "Quelle est le nom exact de la ville où vous habitez ?", "cityErrorMsg"));
    inputEmail.addEventListener("change", validationOfInput.bind(event, regexEmail, inputEmail, "Nous aimerions une adresse mail valide, pensez bien au @", "emailErrorMsg"));
}

validationOfEachInput();

function validationOfInput(regex, input, errorMessage, validationTag){
    regex.lastIndex = 0;
    
    if (regex.test(input.value)){
        document.getElementById(validationTag).textContent = "Merci ;)";
        document.getElementById(validationTag).style.color = "#90EE90";
        return true;
    }
    
    document.getElementById(validationTag).textContent = errorMessage;
    document.getElementById(validationTag).style.color = "#D22B2B";
    document.getElementById(validationTag).style.fontWeight = "700";
    return false;
}

form.addEventListener("submit", validationOfRegex);

function validationOfRegex(){
    let validationOfFirstName = validationOfInput(regexNameAndCity, inputFirstName, "Merci d'entrer un prénom valide", "firstNameErrorMsg");
    let validationOfLastName = validationOfInput(regexNameAndCity, inputLastName, "Merci d'entrer votre nom de famille usuel", "lastNameErrorMsg");
    let validationOfAdress = validationOfInput(regexAdress, inputAddress, "Nous avons besoin du numéro et du nom de la rue", "addressErrorMsg");
    let validationOfCity = validationOfInput(regexNameAndCity, inputCity, "Quelle est le nom exact de la ville où vous habitez ?", "cityErrorMsg");
    let validationOfEmail = validationOfInput(regexEmail, inputEmail, "Nous aimerions une adresse mail valide, pensez bien au @", "emailErrorMsg");
    
    if (validationOfFirstName && validationOfLastName && validationOfAdress && validationOfCity && validationOfEmail){
        submitButton.removeAttribute("disabled");
        postForm();
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}

function returnProductId(){
    let actualCartJs = JSON.parse(localStorage.getItem("cart"));
    let result = [];
    for (let i = 0; i < actualCartJs.length; i ++){
        let productId = actualCartJs[i].id;
        result.push(productId);
    }
    return result;
}

function createNewUser(){
    let firstName = inputFirstName.value;
    let lastName = inputLastName.value;
    let address = inputAddress.value;
    let city = inputCity.value;
    let email = inputEmail.value;
    let products = returnProductId();
    
    let newUser = {
        "contact": {
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "city": city,
            "email": email
        },
        "products": products
    };
    return newUser;
}

function postForm(){
    fetch ("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(createNewUser())
    })
    .then (function(response) {
        return response.json();
    })
    .then (function(data){
        let orderId = data.orderId;
        window.location.replace("../html/confirmation.html?orderId=" + orderId);
        // Ne laisse pas la possibilité à l'utilisateur de revenir en arrière
    })
    .catch(err => console.log(err));
}