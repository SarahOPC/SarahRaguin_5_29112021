function getInformationFromLocalStorageId(){
    let productFromApi = `http://localhost:3000/api/products/${product.id}`;
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

function getElementsForCart(data){
    let actualCart = JSON.parse(localStorage.getItem("cart"));
    actualCart.forEach(product => {
        let productId = product.id;
        let productQuantity = product.quantity;
        let productColor = product.colors});

//Grâce aux id, aller chercher dans l'api les informations relatives aux produits

//let varTitle = document.getElementsByTagName("h2");
//let colorTitle = varTitle.querySelector("p");
//let priceOfTitle = varTitle.querySelectorAll("p")[1];



}