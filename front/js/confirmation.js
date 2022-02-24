function getOrderId(){
    // Pour récupérer l'id dans l'URL
let orderUrlId = window.location.search;

// Pour extraire l'id avec URLSearchParams
let extractOrderId = new URLSearchParams(orderUrlId);

let finalOrderId = extractOrderId.get("id");

document.getElementById("orderId").finalOrderId;
}

getOrderId();