products = window.location.search.split('?').join("");



const fetchProducts = async () => {

    products = await fetch(`http://localhost:3000/api/products/${products}`).then(res => res.json())
        .then((promise) => {

            productsItem = promise;
            
        }).catch((err) => console.log(err));

}

let productBasket;

const showMeproducts = async () => {

    await fetchProducts();
     
    const tmpProductImg = ` <img src="${productsItem.imageUrl}" alt="Photographie d'un canapé"> `;
    document.querySelector('.item__img').innerHTML = tmpProductImg;
    

    const tmpProductName = ` ${productsItem.name} `;
    document.getElementById('title').innerHTML = tmpProductName;
    
    const tmpProductPrice = `${productsItem.price} `;
    document.getElementById('price').innerHTML =  tmpProductPrice;
    

    const tmpProductDescription = ` ${productsItem.description} `; 
    document.getElementById('description').innerHTML = tmpProductDescription;
    

    let select = document.getElementById('colors'); 
    productsItem.colors.forEach(colors => {
        let options = document.createElement('option');
        options.innerHTML = ` ${colors} `;
        options.value = ` ${colors} `;
        select.appendChild(options);
    });

    productBasket = {
        id : productsItem._id,
        image : productsItem.imageUrl,
        name: productsItem.name,
        //price : productsItem.price, // ne pas stocker prix dans le local storage
        description : productsItem.description,
    }
}
    
showMeproducts();


function validateBasket() {  

    let colorSlected = document.getElementById('colors');
    let quantitySelected = parseInt(document.getElementById('quantity').value, 10)
        
        if (colorSlected.value.length == 0 && quantitySelected <= 0
             || quantitySelected <= 0 && colorSlected.value.length != 0 
             || quantitySelected >= 1 && colorSlected.value.length == 0 ) {

            console.log(colorSlected.value);
            alertBasketEmpty(); 
            
        } else {
    
            alertValidateBasket()
            let colorAdd = {color : colorSlected.value};
            let quantityAdd = {quantity:  quantitySelected};
            Object.assign(productBasket, colorAdd, quantityAdd) // productBasket variable globale faire attention
            checkOptionBasket(productBasket);
        }   
    
}
 
let buttonAdd = document.getElementById('addToCart');
buttonAdd.addEventListener('click', () => {
    
    validateBasket()
})

