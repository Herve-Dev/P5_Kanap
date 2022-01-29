//On récupére l'id du produit cliqué précédemment.
products = window.location.search.split('?').join("");


//On crée une fonction async qui récupére les info du produit delectionné via son Id
const fetchProducts = async () => {

    products = await fetch(`http://localhost:3000/api/products/${products}`).then(res => res.json())
        .then((promise) => {

            productsItem = promise;

        }).catch((err) => console.log(err));

}

// on créé une variable qui contiendra un objet qui contient les parametres du produit(utilisez pour etres stocké dans le localStorage)
let productBasket;

//on créé une fonction qui affichera les infos du produit dans le DOM et qui créé un objet qui contient les infos du produit
const showMeproducts = async () => {

    //on appelle notre fonction qui contient notre promise on pourra ainsi afficher les infos de notre produits
    await fetchProducts();

    /*********************************** On appelle et on affiche nos datas via des innerHTML ***********************************/
    const tmpProductImg = ` <img src="${productsItem.imageUrl}" alt="Photographie d'un canapé"> `;
    document.querySelector('.item__img').innerHTML = tmpProductImg;


    const tmpProductName = ` ${productsItem.name} `;
    document.getElementById('title').innerHTML = tmpProductName;

    const tmpProductPrice = `${productsItem.price} `;
    document.getElementById('price').innerHTML = tmpProductPrice;


    const tmpProductDescription = ` ${productsItem.description} `;
    document.getElementById('description').innerHTML = tmpProductDescription;


    let select = document.getElementById('colors');
    productsItem.colors.forEach(colors => {
        let options = document.createElement('option');
        options.innerHTML = ` ${colors} `;
        options.value = ` ${colors} `;
        select.appendChild(options);
    });
    //******************************************************************************************************************************

    //On stock en parallele notre objet dans la variable créé precedemment
    productBasket = {
        id: productsItem._id,
        image: productsItem.imageUrl,
        name: productsItem.name,
        //price : productsItem.price, // ne pas stocker prix dans le localStorage
        description: productsItem.description,
    }
}

//On appelle notre fonction pour afficher notre résultat dans le navigateur 
showMeproducts();


//On créé une fonction qui vérifie les conditions çi on peu valider le produit dans le panier
function validateBasket() {

    //On cible notre input colors
    let colorSlected = document.getElementById('colors');

    //On cible la valeur du input select on convertie cette valeur en number entier pour pouvoir la traiter avec le prix  
    let quantitySelected = parseInt(document.getElementById('quantity').value, 10)

    //On créé une condition if/else qui verifie si l'utilisateur a bien rempli les conditions pour valider le produit dans le panier
    if (colorSlected.value.length == 0 && quantitySelected <= 0
        || quantitySelected <= 0 && colorSlected.value.length != 0
        || quantitySelected >= 1 && colorSlected.value.length == 0) {

        /*Si la conction est true on appelle notre fonction alertBasketEmpty créé dans le fichier function.js 
          ce méssage affiche un message alerte dans le html*/    
        alertBasketEmpty();

    } else {

        /*Sinon si la condition est bonne on appelle notre fonction alertValidateBasket() créé dans le fichier function.js
          ce message affiche un message de validation dans le html*/ 
        alertValidateBasket()

        //On continu avec la création d'une variable qui stock la valeur de l'input colors
        let colorAdd = { color: colorSlected.value };

        //On fait la meme chose avec la quantité
        let quantityAdd = { quantity: quantitySelected };

        //On assigne les 2 nouvelle valeur à notre objet productBasket
        Object.assign(productBasket, colorAdd, quantityAdd)

        /* On appelle notre fonction checkOptionBasket()(on passe en parametre notre productBasket) créé dans le fichier function.js
           cette fonction s'occupe de savoir ci le produit est deja existant dans le localStorage ci il est pas existant il ajoute 
           au localStorage */  
        checkOptionBasket(productBasket);
    }

}

//on cible le bouton qui appelera au click notre fonction validateBasket()
let buttonAdd = document.getElementById('addToCart');
buttonAdd.addEventListener('click', () => {

    validateBasket()
})

