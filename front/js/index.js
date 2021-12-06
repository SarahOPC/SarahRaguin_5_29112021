fetch("http://localhost:3000/api/products")
    .then (function(response){
        if (response.ok){
            return response.json();
        }
    })
    .then (function(data){
        console.log(data);
    })
    .catch (function(err){
        console.log("Erreur : " + err)
    });