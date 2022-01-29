const productsInHTML = document.querySelector('.items');

let products;

/**********************************  On crée une fonction qui contient notre fetch appelle de l'API. **********************************/
let fetchProducts = async () => {

    // On appelle notre API elle sera contenu dans notre variable products. 
    products = await fetch('http://localhost:3000/api/products').then(res => res.json())
        .catch((err) => console.log(err));
}
//**************************************************************************************************************************************



/************************************ On crée une fonction async qui affiche les résulats demander a l'API **********************************/
const showProduct = async () => {

    // On appelle notre fonction fetchProducts (elle fait un appelle mais n'affiche rien) dans notre fonction showProduct. 
    await fetchProducts();

    //On crée une variable vide pour apres utilisez cette valeur avec un innerHTML.
    let itemsProducts = "";

    //On cible l'element que nous voulons utiliser pour insérer nos datas de l'API.
    let productsInHTML = document.querySelector('.items');

    //On boucle sur la variable products stocké dans notre fonction fetchProducts() pour récupérer les données de l'API.
    for (let p = 0; p < products.length; p++) {

        itemsProducts += `
            <a class="link-param-id" href="./product.html?${products[p]._id}">
                <article>
                    <img src="${products[p].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                    <h3 class="productName">${products[p].name}</h3>
                    <p class="productDescription">${products[p].description}</p>
                </article>
            </a> 
        `
    }

    // On appelle notre variable productsInHTML on lui ajoute un innerHTML avec notre variable itemsProducts.
    productsInHTML.innerHTML = itemsProducts;

};


// On apelle notre fonction sinon rien n'est afficher a l'écran. 
showProduct();

//Resultat final nous avons récupéré toute les données de l'API et ont les a afficher a l'écran.