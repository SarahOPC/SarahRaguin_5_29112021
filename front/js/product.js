// Pour écouter l'événement onclick

document.getElementById("a").addEventListener(onclick, function(){
    // Pour récupérer l'id dans l'URL
    let productUrlId = window.location.search;
        
    // Pour extraire l'id avec URLSearchParams
    let extractId = new URLSearchParams(productUrlId);
    
    let finalExtractId = extractId.get("_id");

    return finalExtractId;

})