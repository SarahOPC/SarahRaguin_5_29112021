// Pour écouter l'événement onclick

//document.getElementById("a").addEventListener(onclick, function(){
    // Pour récupérer l'id dans l'URL
    let productUrlId = window.location.search;
        
    // Pour extraire l'id avec URLSearchParams
    let extractId = new URLSearchParams(productUrlId);
    
    let finalExtractId = extractId.get("_id");
    alert(finalExtractId);
    //return finalExtractId;
//})


// Réinjecter l'id dans le code pour trouver les bonnes informations reliées au produit ciblé dans l'url
//faire un appel get de l'api avec id en paramètre

