let displayBasketCart = document.getElementById('cart__items');
let getBasket = JSON.parse(localStorage.getItem("basket"));

const urlApiBase = "http://localhost:3000/api/products/"
let articleById = []
articleById = getBasket.map(product => product.id)
const mapUrls = articleById.map( id => {
    return `${urlApiBase}/${id}`;
});

const fetchAll = async(mapUrls) => {
    return await Promise.all(
        mapUrls.map( async(urlApiBase) => {
            const resp = await fetch(urlApiBase);
            return resp.json()
        })
    )
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
                <p><span class="price-unit total-price-quantity-${products.id}">${products.price * products.quantity}</span> €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <span>Qté : </span></dpan><p class="quantity-unit qte-id-${products.id}">${products.quantity} </p>
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


fetchAll(mapUrls).then(values => {
    values.forEach(product => {
        document.querySelector(`.total-price-quantity-${product._id}`).innerHTML = `${product.price}`;
    });
    totalCalculation(values);
    addQuantity(values);
})


let btnOrder = document.getElementById('order');
btnOrder.addEventListener('click', (e) => {
    e.preventDefault();
    checkInput();  
})

function deleteProduct(getBasket) {
    const targetDelete = document.querySelectorAll('.deleteItem')
    targetDelete.forEach((btn) => {
        btn.addEventListener("click", () => {
            let cartItem = btn.closest(".cart__item");
            let cartId = cartItem.dataset.id;
            let cartColor = cartItem.dataset.color;
            let filter = getBasket.filter(p => p.id !== cartId && p.color !== cartColor);
            cartItem.remove();
            localStorage.setItem("basket", JSON.stringify(filter));
            //location.reload();
        })
    })  
}

deleteProduct(getBasket)

function addQuantity(products) {
    const searchQuantityLocalStorage = JSON.parse(localStorage.getItem("basket"))
    const targetQuantity = document.querySelectorAll(".itemQuantity")

    targetQuantity.forEach((inputQuantity) => {
        inputQuantity.addEventListener("change", (event) => {
            event.preventDefault();
            const articleItem = inputQuantity.closest(".cart__item");
            const articleId = articleItem.dataset.id;
            const articleColor = articleItem.dataset.color
            const productSearch = searchQuantityLocalStorage.find(q => q.id === articleId && q.color === articleColor);
            const newProduct = !!productSearch && !!products ? products.find(p => p._id === productSearch.id) : null;

            if (!!newProduct) {
                newProduct.quantity = parseInt(document.querySelector(`.quantity-${articleId}`).value)
               const updateQt = document.querySelector(`.qte-id-${articleId}`);
               const updateTotalPrice = document.querySelector(`.total-price-quantity-${articleId}`);


               const newTmpQt = `${newProduct.quantity}`;
               const newTmpTotalPrice = `${newProduct.price * newProduct.quantity}`;
               

               updateQt.innerHTML = newTmpQt;
               updateTotalPrice.innerHTML = newTmpTotalPrice;
            }
            localStorage.setItem("basket", JSON.stringify(searchQuantityLocalStorage));
            calculatePrice();
        })
    })
}

function calculatePrice() {
    const updateTotalQuantitySpan = document.getElementById('totalQuantity');
    const updateTotalPriceSpan = document.getElementById('totalPrice');

    const allUnitQty = document.querySelectorAll(`.quantity-unit`);
    const allPriceUnit = document.querySelectorAll(`.price-unit`);

    let totalPrice = 0;
    let totalQuantity = 0;
    allUnitQty.forEach((item) => {
       totalQuantity += parseInt(item.textContent, 10);
    });
    allPriceUnit.forEach( item => {
        totalPrice += parseInt(item.textContent, 10);
    })
    updateTotalQuantitySpan.innerHTML = `${totalQuantity}`;
    updateTotalPriceSpan.innerHTML = `${totalPrice}`;
}