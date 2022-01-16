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
    

    productBasket = {
        id : productsItem._id,
        image : productsItem.imageUrl,
        name: productsItem.name,
        price : productsItem.price,
        description : productsItem.description,
    }
     

    document.querySelector('.item__img').innerHTML = 
    `
    <img src="${productsItem.imageUrl}" alt="Photographie d'un canapé">
    `

    document.getElementById('title').innerHTML = 
    `
    ${productsItem.name}
    `

    document.getElementById('price').innerHTML = 
    `
    ${productsItem.price}
    `

    document.getElementById('description').innerHTML = 
    `
    ${productsItem.description}
    ` 

    let select = document.getElementById('colors'); 
    productsItem.colors.forEach(colors => {
        let options = document.createElement('option');
        options.innerHTML = ` ${colors} `;
        options.value = ` ${colors} `;
        select.appendChild(options);
    });

}
    
showMeproducts();


function validateBasket() {  

    let colorSlected = document.getElementById('colors');
    let quantitySelected = parseInt(document.getElementById('quantity').value, 10)
        
        if (colorSlected.value.length == 0 && quantitySelected <= 0
             || quantitySelected <= 0 && colorSlected.value.length != 0 
             || quantitySelected >= 1 && colorSlected.value.length == 0 ) {

            console.log(colorSlected.value);
            alertBasket(); 
            
        } else {
    
            alertValidate()
            let colorAdd = {color : colorSlected.value};
            let quantityAdd = {quantity:  quantitySelected};
            Object.assign(productBasket, colorAdd, quantityAdd) // productBasket variable globale faire attention
            checkOptionBasket(productBasket);
            //console.log(productBasket);
        }   
    
}
 
let buttonAdd = document.getElementById('addToCart');
buttonAdd.addEventListener('click', () => {
    
    validateBasket()
})

