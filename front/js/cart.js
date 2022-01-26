/* 
1 - Mettre dans une variable le panier (du localStorage)
2 - Pour chaque élément du panier, faire un appel à l'API avec en paramètre l'id de l'élément courant
3 - Créer une balise article contenant les balises couleur, quantité, img, nom, ...
4 - AppendChild ces articles dans le DOM
 */
function getCartFromLocalStorage(){
    let actualCart = JSON.parse(localStorage.getItem("cart"));
    return actualCart;
}

function getProductFromApiById(productId){
    let productFromApi = "http://localhost:3000/api/products/" + productId;
    // requête http pour récupérer les informations des produits depuis l'API
    return fetch(productFromApi)
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
}

function getArticleTag(currentProductFromLocalStorage, currentProductFromApi){
    let article = document.createElement("article");
    let currentArticleName = "cart__item__" + i;
    article.setAttribute("id", currentArticleName);

    let cart__item__img = document.createElement("div");
    let currentImgName = "cart__item__img__" + i;
    cart__item__img.setAttribute("id", currentImgName);
    let productImage = document.createElement("img");
    let currentImg = "img__" + i;
    productImage.setAttribute("id", currentImg);
    //productImage.setAttribute("src", currentProductFromApi.imageUrl); //-----------------------
    //productImage.setAttribute("alt", currentProductFromApi.altTxt); //-----------------------
    
    let cart__item__content = document.createElement("div");
    let currentContent = "cart__item__content__" + i;
    cart__item__content.setAttribute("id", currentContent);
    
    let cart__item__content__description = document.createElement("div");
    let currentDescription = "cart__item__content__description__" + i;
    cart__item__content__description.setAttribute("id", currentDescription);

    let productName = document.createElement("h2");
    let currentProductName = "productName__" + i;
    productName.setAttribute("id", currentProductName);
    productName.textContent = currentProductFromApi.name; //--------------------------

    let productColor = document.createElement("p");
    let currentProductColor = "productColor__" + i;
    productColor.setAttribute("id", currentProductColor);
    productColor.textContent = currentProductFromLocalStorage.colors; //-----------------------

    let productPrice = document.createElement("p");
    let currentProductPrice = "productPrice__" + i;
    productPrice.setAttribute("id", currentProductPrice);
    productPrice.textContent = currentProductFromApi.price; //---------------------------
    
    let cart__item__content__settings = document.createElement("div");
    let currentSettings = "cart__item__content__settings__" + i;
    cart__item__content__settings.setAttribute("id", currentSettings);

    let cart__item__content__settings__quantity = document.createElement("div");
    let currentQuantity = "cart__item__content__settings__quantity__" + i;
    cart__item__content__settings__quantity.setAttribute("id", currentQuantity);

    let pQuantity = document.createElement("p");
    let currentPQuantity = "pQuantity__" + i;
    pQuantity.setAttribute("id", currentPQuantity);
    pQuantity.textContent = currentProductFromLocalStorage.quantity; //--------------------------

    let cart__item__content__settings__delete = document.createElement("div");
    let currentDelete = "cart__item__content__settings__delete__" + i;
    cart__item__content__settings__delete.setAttribute("id", currentDelete);
    
    let result = "<article>" + 
    
    + "</article>";
    return result;
}

function insertArticleTag(currentArticleTag){

}

function buildCart(){
    let cartContent = getCartFromLocalStorage();
    let i = 0
    cartContent.forEach(currentProductFromLocalStorage => {
        let currentProductFromApi = getProductFromApiById(currentProductFromLocalStorage.id);
        let currentArticleTag = getArticleTag(currentProductFromLocalStorage, currentProductFromApi);
        insertArticleTag(currentArticleTag);
        i ++;
    });
}

buildCart();