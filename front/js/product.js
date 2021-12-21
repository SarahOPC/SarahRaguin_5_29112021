
// Pour récupérer l'id dans l'URL
let productUrlId = window.location.search;

// Pour extraire l'id avec URLSearchParams
let extractId = new URLSearchParams(productUrlId);

let finalExtractId = extractId.get("id");

//---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//

let idUrl = `http://localhost:3000/api/products/${finalExtractId}`;
async function getInformationOfProductById(id){
    return fetch(idUrl)
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
    .then (function(data){
        return addInfoOfProductToDom(data);
    })
    .catch (function(err){
        console.log("Erreur : " + err)
    });  
}

function addInfoOfProductToDom(data){
    // pour chaque élément de mon json spécifié au bon id
    // si id ==>
        document.getElementById(/*" id de mon html "*/).textContent(/*" contenu de mon json "*/);
        // sinon
        document.getElementsByClassName(/*" nom de la classe "*/).textContent(/*" contenu de mon json "*/)
    }
    
    //---------------------------------------------------------------------//
//--------------------- Functions for Product Page---------------------//
//---------------------------------------------------------------------//

// Réinjecter l'id dans le code pour trouver les bonnes informations reliées au produit ciblé dans l'url
//faire un appel get de l'api avec id en paramètre

let returnInformationsOfProduct = getInformationOfProductById(finalExtractId);
