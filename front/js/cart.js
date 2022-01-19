function getInformationFromLocalStorageId(productId){
    let productFromApi = "http://localhost:3000/api/products/" + productId;
    console.log(productFromApi);
    return fetch(productFromApi)
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
    .then (function(data){
        getElementsForCart(data);
    })
    .catch (function(err){
        console.log("Erreur : " + err)
    });
}

function getElementsForCart(product){
    document.getElementsByTagName("h2").textContent = product.name;
    console.log(product.name);
    let productImage = document.createElement("img");
        productImage.src = product.imageUrl;
        productImage.alt = product.altTxt;
        document.querySelector(".cart__item__img").appendChild(productImage);
    console.log(product.imageUrl);
    console.log(product.altTxt);
    document.querySelectorAll(".cart__item__content__description p")[1].textContent = product.price;
    console.log(product.price);
}

let actualCart = JSON.parse(localStorage.getItem("cart"));
actualCart.forEach(product => {
    document.querySelector(".cart__item__content__description p").textContent = product.colors;
    console.log(product.colors);
    document.getElementsByClassName("cart__item__content__settings__quantity").value = product.quantity;
    console.log(product.quantity);

getInformationFromLocalStorageId(product.id);
});