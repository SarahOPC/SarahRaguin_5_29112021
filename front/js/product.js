let protocol = "http.//";
let domainName = "localhost:3000/api/products/";

// Pour récupérer l'id dans l'URL
let productUrlId = window.location.search;

// Pour extraire l'id avec URLSearchParams
let extractId = new URLSearchParams(productUrlId);

let finalExtractId = extractId.get("id");

//---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//


function getInformationOfProductById(){
    let currentProductApi = `http://localhost:3000/api/products/${finalExtractId}`;
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

    currentProduct.colors.forEach( currentColor => {
        let option = document.createElement("option");
        option.text = currentColor;
        select.add(option);
    } )

    let productImage = document.createElement("img");
    productImage.src = currentProduct.imageUrl;
    productImage.alt = currentProduct.altTxt;
    document.querySelector(".item__img").appendChild(productImage);
    // document.querySelector("") ==> Sélectionne le premier élément du selecteur donné
}

getInformationOfProductById();

//---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//

// Envoi au localStorage

document.getElementById("addToCart").addEventListener("click", putInStorage);

function putInStorage(){
    let objJs = {
        id : finalExtractId,
        quantity : document.getElementById("quantity").value,
        colors : document.getElementById("colors").value
    }
    
    let objJson = JSON.stringify(objJs);
    localStorage.setItem("cart", objJson);
    //verifyingIdAndColors();
}

// Vérifier si id et colors existe déjà ==>
// si oui ==> augmenter la quantité à l'objet déjà existant
// sinon ==> ajouter un nouvel objet

function verifyingIdAndColors(finalExtractId){
    let newObjJson = localStorage.getItem("cart");
    let newObjJs = JSON.parse(newObjJson);
    let currentColors = window.document.getElementById("colors").value;

    if (finalExtractId === newObjJs.id && currentColors === newObjJs.colors) {
        newObjJs.quantity += document.getElementById("quantity").value;
    } else {
        localStorage.setItem("cart", newObjJson);
    }
}