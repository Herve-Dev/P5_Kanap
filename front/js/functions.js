function alertBasketEmpty() {
    let targetAlertValidate = document.querySelector('.msg-validate');
    let alertEmpty = document.querySelector('.alert');

    if (!alertEmpty) {

        if (targetAlertValidate) {
            targetAlertValidate.remove()
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
}

function alertValidateBasket() {
    let alertValidate = document.querySelector('.msg-validate'); 
    let targetAlertEmpty = document.querySelector('.alert');
    
    if (!alertValidate) {

        if (targetAlertEmpty) {
            targetAlertEmpty.remove()
        }
        
        let contentSettingsValidate = document.querySelector('.item__content__settings');
        let alertsValidate = document.createElement('div');
        alertsValidate.textContent = "Votre panier a bien été valider cliquer sur le lien panier pour passer commande";
        alertsValidate.className = "msg-validate";
        alertsValidate.style.backgroundColor = "green";
        alertsValidate.style.textAlign = "center";
        alertsValidate.style.borderRadius = "10px"
        contentSettingsValidate.appendChild(alertsValidate)
    } 
}


function checkOptionBasket(productBasket) {
    
    addBasketInLocalSrorage(productBasket);      
}
    


function addBasketInLocalSrorage(productBasket) {
    const foundId = window.location.search.split('?').join("");
    let basketInLocalStorage = JSON.parse(localStorage.getItem("basket"));
    
    const quantityUpdate = parseInt(document.getElementById('quantity').value)
    const colors = document.getElementById('colors').value

    if (basketInLocalStorage === null) {
        basketInLocalStorage = [];
    } 
        
    let comparativeIdAndColors = basketInLocalStorage.find(b => b.id === foundId && b.color === colors);

    if (comparativeIdAndColors) {

        basketInLocalStorage.forEach(product => {
            product.quantity = quantityUpdate
        })
        localStorage.setItem("basket", JSON.stringify(basketInLocalStorage))

    } else {

        basketInLocalStorage.push(productBasket);
        localStorage.setItem("basket", JSON.stringify(basketInLocalStorage))
    }
    
}

function totalCalculation(products) {
    
    let totalQuantity = 0;
    const productsBasket = JSON.parse(localStorage.getItem("basket"));
    const arrProductsId = products.map(product => product._id);
    const arrayPrice = productsBasket.map(productsBasket => {
        if (arrProductsId.includes(productsBasket.id)) {
            totalQuantity += productsBasket.quantity 
            const productPrice = products.find(product => product._id === productsBasket.id)['price'];
            return !!productPrice ? productsBasket.quantity * parseInt(productPrice, 10): 0;
        }
        return 0
    })

    
    const totalPrice = arrayPrice.reduce((accumulator, currentValue) => accumulator + currentValue)
    
    let templateQuantityTotal = document.getElementById('totalQuantity');
    let templatePriceTotal = document.getElementById('totalPrice');

    templateQuantityTotal.innerHTML = `${totalQuantity}`;
    templatePriceTotal.innerHTML = `${totalPrice}`;     
}

function styleErrorMsg() {

    let parentsErrorMsg = document.querySelectorAll('.cart__order__form__question > p')
    parentsErrorMsg.forEach(styleMsg => {
        styleMsg.style.backgroundColor = "red"
        styleMsg.style.textAlign = "center"
        styleMsg.style.borderRadius = "10px"
        styleMsg.style.marginTop = "10px"
        styleMsg.style.fontSize = "20px"
        styleMsg.style.fontWeight = "700"
        styleMsg.style.color = "white"
    })
}

function checkInput() {
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let adressInput = document.getElementById('address');
    let cityInput = document.getElementById('city');
    let emailInput = document.getElementById('email');

    let nameRGEX = /[a-zA-Z]+/i;
    let adressRGEX = /[0-9]+(\s+([a-zA-Z]+\s+)+)/i;
    let cityREGX = /[a-zA-Z]+/i;
    let emailREGX = /[a-zA-Z]+.@[a-zA-Z]+\.[a-zA-Z]+/i;
  
    let firstNameResult = nameRGEX.test(firstNameInput.value)
    let lastNameResult = nameRGEX.test(lastNameInput.value)
    let adressResult = adressRGEX.test(adressInput.value)
    let cityResult = cityREGX.test(cityInput.value)
    let emailResult = emailREGX.test(emailInput.value)
    
    if (firstNameResult && lastNameResult && adressResult
        && cityResult && emailResult) {

            let productsId = [];
            
            let idInLocalStorage = JSON.parse(localStorage.getItem("basket"))
            idInLocalStorage.forEach(elem => {
                productsId.push(elem.id)
            })

            let order = {
                contact : {
                    firstName : firstNameInput.value,
                    lastName : lastNameInput.value,
                    address : adressInput.value,
                    city : cityInput.value,
                    email : emailInput.value,
                } ,
                products : productsId
            };  
 
            console.log(order);

            const insertOrder = async function (data) {
                
                let response = await fetch('http://localhost:3000/api/products/order', {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                let responseData = await response.json()
                console.log(responseData);
                let productOrderId = responseData.orderId;
                window.location.href = `confirmation.html?orderId=${productOrderId}`  
                console.log(productOrderId);   
            }
            
            insertOrder(order)
         
    } else if (firstNameResult == false && lastNameResult == false && adressResult == false
                && cityResult == false && emailResult == false) {
        
        let formOrder = document.querySelector('.cart__order__form')
        let disclaimerMsg = document.createElement('div')
        disclaimerMsg.textContent = "Pensez à remplir correctement le formulaire pour passer votre commande"
        disclaimerMsg.style.backgroundColor = "orange"
        disclaimerMsg.style.marginTop = "35px"
        disclaimerMsg.style.padding = "20px"
        disclaimerMsg.style.borderRadius = "20px"
        disclaimerMsg.style.fontSize = "20px"
        disclaimerMsg.style.textAlign = "center"
        disclaimerMsg.style.fontWeight = "600"
        formOrder.appendChild(disclaimerMsg)
        
    } else if (firstNameResult == false) {

       let firstErrorMessage = document.getElementById('firstNameErrorMsg')
       let htmlErrorFirstName = `erreur dans votre prenom`
       firstErrorMessage.innerHTML = htmlErrorFirstName
       styleErrorMsg()

    } else if (lastNameResult == false) {
        
        let lastErrorMessage = document.getElementById('lastNameErrorMsg')
        let htmlErrorLastName = `erreur dans votre nom`
        lastErrorMessage.innerHTML = htmlErrorLastName
        styleErrorMsg()

    } else if (adressResult == false) {
        
        let addressErrorMessage = document.getElementById('addressErrorMsg')
        let htmlErrorAdress = `erreur dans l'adresse`
        addressErrorMessage.innerHTML = htmlErrorAdress
        styleErrorMsg()

    } else if (cityResult == false) {
        
        let cityErrorMessage = document.getElementById('cityErrorMsg')
        let htmlErrorCity = `erreur dans la ville`
        cityErrorMessage.innerHTML = htmlErrorCity
        styleErrorMsg()

    } else if (emailResult == false) {
        
        let emailErrorMessage = document.getElementById('emailErrorMsg')
        let htmlErrorEmail = `erreur dans votre email`
        emailErrorMessage.innerHTML = htmlErrorEmail
        styleErrorMsg()
    }
}
