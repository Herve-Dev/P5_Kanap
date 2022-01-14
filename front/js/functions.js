function alertBasket() {
    if (document.querySelector('.alert')) {
        document.querySelector('.alert').remove();
    }
    let contentSettings = document.querySelector('.item__content__settings')
    let alerts = document.createElement('div')
    alerts.textContent = " Veuillez choisir une couleur et/ou une quantité pour valider votre panier";
    alerts.className = "alert";
    alerts.style.backgroundColor = "red";
    alerts.style.textAlign = "center";
    alerts.style.borderRadius = "10px";
    contentSettings.appendChild(alerts)
}

function alertValidate() {
    if (document.querySelector('.alert')) {
        document.querySelector('.alert').remove();
    } else if (document.querySelector('.msg-validate')) {
        document.querySelector('.msg-validate').remove();
    }
    let contentSettingsValidate = document.querySelector('.item__content__settings');
    let alertsValidate = document.createElement('div');
    alertsValidate.textContent = "Votre panier à bien été valider cliquer sur le lien panier pour passer commande";
    alertsValidate.className = "msg-validate";
    alertsValidate.style.backgroundColor = "green";
    alertsValidate.style.textAlign = "center";
    alertsValidate.style.borderRadius = "10px"
    contentSettingsValidate.appendChild(alertsValidate)
}

function removeAlert() {
    let deleteAlert = document.querySelector('.alert');
    deleteAlert.remove()
    console.log('le remove marche');
}

function checkOptionBasket(productBasket) {
    
    addBasketInLocalSrorage(productBasket);      
}
    


function addBasketInLocalSrorage(productBasket) {
    let foundId = window.location.search.split('?').join("");
    let basketInLocalStorage = JSON.parse(localStorage.getItem("basket"));
    
    let quantityUpdate = parseInt(document.getElementById('quantity').value)
    let colors = document.getElementById('colors').value

    if (basketInLocalStorage == null) {
        basketInLocalStorage = [];
    } 
        
    let comparativeIdAndColors = basketInLocalStorage.find(b => b.id == foundId && b.color == colors);

    if (comparativeIdAndColors) {

        basketInLocalStorage.forEach(product => {
            product.quantity = quantityUpdate
        })
        console.log('je suis dans mon if de comprativeId');
        localStorage.setItem("basket", JSON.stringify(basketInLocalStorage))

    } else {

        console.log('je suis dans mon else de comparativeId');
        basketInLocalStorage.push(productBasket);
        localStorage.setItem("basket", JSON.stringify(basketInLocalStorage))
    }
    
}

/*function checkConditionProduct(basketInLocalStorage ,productBasket) {

    let foundId = window.location.search.split('?').join("");
    let checkLocalStorage = JSON.parse(localStorage.getItem("basket"))
    let colorFind = document.getElementById('colors').value
    let quantityFound = parseInt(document.getElementById('quantity').value)
    let btnAdd = document.getElementById('addToCart')
    
    if (checkLocalStorage) {
        if (checkLocalStorage.find(x => x.id == foundId && x.color == colorFind && x.quantity == quantityFound)) {

            console.log('condition dans le if');
            checkLocalStorage.forEach( productQuant => {
                productQuant.quantity++
            })
            localStorage.setItem("basket", JSON.stringify(checkLocalStorage))
            console.log(checkLocalStorage);

        } else if (checkLocalStorage.find(x => x.id == foundId && x.color != colorFind)) {
            
            console.log('condition dans le else if');
            checkLocalStorage.forEach(productInLocal => {
                productInLocal.color.push(colorFind)
                productInLocal.quantity = productInLocal.quantity + quantityFound
            })
            localStorage.setItem("basket", JSON.stringify(checkLocalStorage))
            console.log(checkLocalStorage);
            
        }             
    } 

    basketInLocalStorage.push(productBasket);
    localStorage.setItem("basket", JSON.stringify(basketInLocalStorage))
    console.log(basketInLocalStorage);
       
}*/




function totalCalculation() {
    const getLocalStorage = JSON.parse(localStorage.getItem("basket"));

    let arrayQuantity = [];
    let arrayPrice = [];
    let arrayPriceAndQuantity = []; // a vérifier (en parler a mon mentor)

    getLocalStorage.forEach( element => {
        
        arrayPriceAndQuantity.push(element.price)
        arrayQuantity.push(element.quantity);
        arrayPrice.push(element.price * element.quantity)
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = arrayPrice.reduce(reducer);
    let totalQuantity = arrayQuantity.reduce(reducer)

    let templateQuantityTotal = document.getElementById('totalQuantity');
    let templatePriceTotal = document.getElementById('totalPrice');


    templateQuantityTotal.innerHTML = `${totalQuantity}`;
    templatePriceTotal.innerHTML = `${totalPrice}`;     
}

