// fonction pour communiquer avec l'API et récupérer les données.

function getProducts() {
    fetch("http://localhost:3000/api/products")
            .then (function(response){
            if (response.ok){
                return response.json();
            }
        })
        .then (function(data){
            for(let infoProduct of data){
                document.write(infoProduct.imageUrl - infoProduct.name - infoProduct.description);
            }
        })
        .catch (function(err){
            console.log("Erreur : " + err)
        });  
}


/* var mycars = [{name:'Susita'}, {name:'BMW'}];

for (var car of mycars) 
{
  document.write(car.name + "<br />");
}
 */