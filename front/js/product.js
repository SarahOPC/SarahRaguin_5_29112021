
// Pour récupérer l'id dans l'URL
let productUrlId = window.location.search;

// Pour extraire l'id avec URLSearchParams
let extractId = new URLSearchParams(productUrlId);

let finalExtractId = extractId.get("id");

//---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//

let currentProductApi = `http://localhost:3000/api/products/${finalExtractId}`;

function getInformationOfProductById(){
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
    for (let i = 0; i < currentProduct.colors.length; i ++){
        let currentColor = currentProduct.colors[i];
        let option = document.createElement("option");
        option.text = currentColor;
        select.add(option);
    }

    let productImage = document.createElement("img");
    productImage.src = currentProduct.imageUrl;
    productImage.alt = currentProduct.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(productImage);
}

getInformationOfProductById();

//---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//

// Réinjecter l'id dans le code pour trouver les bonnes informations reliées au produit ciblé dans l'url
//faire un appel get de l'api avec id en paramètre

