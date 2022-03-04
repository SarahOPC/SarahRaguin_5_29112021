function getOrderId(){
    // Pour récupérer l'id dans l'URL
    let orderUrlId = window.location.search;

    // Pour extraire l'id avec URLSearchParams
    let extractOrderId = new URLSearchParams(orderUrlId);

    let finalOrderId = extractOrderId.get("orderId");

    let orderId = document.getElementById("orderId");
    orderId.textContent = finalOrderId;

    localStorage.clear();
}

getOrderId();