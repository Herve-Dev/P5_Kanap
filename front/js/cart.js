let displayBasketCart = document.getElementById('cart__items');
let getBasket = JSON.parse(localStorage.getItem("basket"));

let contentCart = "";

getBasket.forEach( products => {
    contentCart += 
    `
    <article class="cart__item" data-id="${products.id}" data-color="${products.color}">
        <div class="cart__item__img">
            <img src="${products.image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${products.name}</h2>
                <p>${products.color}</p>
                <p>${products.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :${products.quantity} </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" >Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `
});

displayBasketCart.innerHTML = contentCart;

totalCalculation();


let btnOrder = document.getElementById('order');
btnOrder.addEventListener('click', (e) => {
    


    
})


function checkInput() {
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let adressInput = document.getElementById('address');
    let cityInput = document.getElementById('city');
    let emailInput = document.getElementById('email');

    let nameRGEX = /[a-zA-Z]+/i;
    let adressRGEX = /[0-9]+(\s+([a-zA-Z]+\s+)+)/i;
    let cityREGX = /[a-zA-Z]+-/i;
    let emailREGX = /[a-zA-Z]+.@[a-zA-Z]+\.[a-zA-Z]+/i;
  
    let firstNameResult = nameRGEX.test(firstNameInput.value)
    let lastNameResult = nameRGEX.test(lastNameInput.value)
    let adressResult = adressRGEX.test(adressInput.value)
    let cityResult = cityREGX.test(cityInput.value)
    let emailResult = emailREGX.test(emailInput.value)
    
    if (firstNameResult && lastNameResult && adressResult
        && cityResult && emailResult) {

            let contact = {
                firstName : firstNameInput.value,
                lastName : lastNameInput.value,
                adress : adressInput.value,
                city : cityInput.value,
                email : emailInput.value,
            }

            let productsId = [];
            
            let idInLocalStorage = JSON.parse(localStorage.getItem("basket"))
            idInLocalStorage.forEach(elem => {
                productsId.push(elem.id)
            })
            
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

    /***************************A TRAVAILLER ***********************/
    let sendOrder = async function (contact, productsId) {
        await fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact, productsId})
        })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (res) {
            console.log(res);
        })
    }

     sendOrder()
}

checkInput();