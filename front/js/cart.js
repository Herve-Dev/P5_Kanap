let displayBasketCart = document.getElementById('cart__items');
let getBasket = JSON.parse(localStorage.getItem("basket"));

const fetchProducts = async () => {

    let id;
    getBasket.forEach(idHtml => {
        id = idHtml.id
    })

    products = await fetch(`http://localhost:3000/api/products/${id}`).then(res => res.json())
        .then((promise) => {

            productsItem = promise;      

        }).catch((err) => console.log(err));
}

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
                <p id="total-price-quantity-${products.id}">${products.price * products.quantity} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p class ="qté-id-${products.id}">Qté :${products.quantity} </p>
                    <input type="number" class="itemQuantity quantity-${products.id} " name="itemQuantity" min="1" max="100" value="${products.quantity}">
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

const priceAPI = async () => {
    await fetchProducts();

    
    let div = document.querySelector('.cart__item__content__description')
    let newP = document.createElement('p')
    let newQté = document.createTextNode(`${productsItem.price} €`)
    div.prepend(newP)
    div.append(newQté)
    
}

priceAPI()

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
            //location.reload();
        })
    })  
}

deleteProduct(getBasket)

function addQuantity() {
    let searchQuantityLocalStorage = JSON.parse(localStorage.getItem("basket"))
    let targetQuantity = document.querySelectorAll(".itemQuantity")
    console.log(targetQuantity);

    targetQuantity.forEach((inputQuantity) => {
        inputQuantity.addEventListener("change", () => {
            let articleItem = inputQuantity.closest(".cart__item");
            let articleId = articleItem.dataset.id;
            let articleColor = articleItem.dataset.color
            let find = searchQuantityLocalStorage.find(q => q.id == articleId && q.color == articleColor)
            
            if (find) {
               find.quantity = parseInt(document.querySelector(`.quantity-${articleId}`).value)
               console.log(find);

               const updateQté = document.querySelector(`.qté-id-${articleId}`);
               const updateTotalPrice = document.getElementById(`total-price-quantity-${articleId}`);
               const updateTotalQuantitySpan = document.getElementById('totalQuantity');
               const updateTotalPriceSpan = document.getElementById('totalPrice');

               const newTmpQté = `<p>Qté :${find.quantity} </p>`;
               const newTmpTotalPrice = `${find.price * find.quantity} €`;
               const newTmpTotalQuantitySpan = `${find.quantity}`;
               const newTmpTotalPriceSpan = `${find.price * find.quantity}` //regler ce probleme important 
               

               updateQté.innerHTML = newTmpQté;
               updateTotalPrice.innerHTML = newTmpTotalPrice;
               updateTotalQuantitySpan.innerHTML = newTmpTotalQuantitySpan;
               updateTotalPriceSpan.innerHTML = newTmpTotalPriceSpan;
            }
            localStorage.setItem("basket", JSON.stringify(searchQuantityLocalStorage))
            //location.reload();
        })
    })
}

addQuantity();



