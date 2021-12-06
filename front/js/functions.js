function getProducts(){
    fetch("http://localhost:3000/api/products")
        .then (function(data){
            if(data.ok){
                return data.json();
            }
        })
        .catch(function(err){
            console.log("Une erreur est survenue !!")
        });
}