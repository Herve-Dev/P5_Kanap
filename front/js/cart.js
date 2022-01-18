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
                <p>${products.price * products.quantity} €</p>
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
    e.preventDefault();
    
    checkInput();  
})

function deleteProduct(getBasket) {
    let targetDelete = document.querySelectorAll('.deleteItem')
    targetDelete.forEach((btn) => {
        btn.addEventListener("click", () => {
            let cartItem = btn.closest(".cart__item");
            let cartId = cartItem.dataset.id;
            let cartColor = cartItem.dataset.color;
            let filter = getBasket.filter(p => p.id != cartId && p.color != cartColor);
            cartItem.remove();
            localStorage.setItem("basket", JSON.stringify(filter));
            location.reload();
        })
    })  
}

deleteProduct(getBasket)

function addQuantity() {
    let searchQuantityLocalStorage = JSON.parse(localStorage.getItem("basket"))
    let targetQuantity = document.querySelectorAll(".itemQuantity")
    targetQuantity.forEach((inputQuantity) => {
        inputQuantity.addEventListener("change", () => {
            let articleItem = inputQuantity.closest(".cart__item");
            let articleId = articleItem.dataset.id;
            let articleColor = articleItem.dataset.color
            let find = searchQuantityLocalStorage.find(q => q.id == articleId && q.color == articleColor)
            if (find) {
                find.quantity = parseInt(document.querySelector('.itemQuantity').value)
                
            }
            
            localStorage.setItem("basket", JSON.stringify(searchQuantityLocalStorage))
            /*let updateContentQuantity = document.querySelector(".cart__item__content__settings__quantity > p");
            let updateTotalQuantity = document.getElementById("totalQuantity");
            let updateTotalCalculationQuantityPrice = document.querySelector(".cart__item__content__description ");

            let newContentQuantity = "";
            let newTotalQuantity = "";
            let newCalculationQuantityPrice = "";
            searchQuantityLocalStorage.forEach(product => {
                newContentQuantity = ` <p>Qté :${product.quantity} </p> `;
                newTotalQuantity = ` ${product.quantity} `;
                newCalculationQuantityPrice = `${product.price * product.quantity} `
            })
            updateTotalCalculationQuantityPrice.lastElementChild.innerHTML = newCalculationQuantityPrice
            updateTotalQuantity.innerHTML = newTotalQuantity
            updateContentQuantity.innerHTML = newContentQuantity*/
            
        })
    })
}

addQuantity();



