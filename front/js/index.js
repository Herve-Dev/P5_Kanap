const productsInHTML = document.querySelector('.items');

let products;

// On crée une fonction qui contient notre fetch appelle de l'API.
let fetchProducts = async () => {

    // On appelle notre API elle sera contenu dans notre variable products. 
    products = await fetch('http://localhost:3000/api/products').then(res => res.json())
        .catch((err) => console.log(err));
}


// On crée une fonction qui affiche les résulats demander a l'API 
const showProduct = async () => {

    // On appelle notre fonction fetchProducts (elle fait un appelle mais n'affiche rien) dans notre fonction showProduct 
    await fetchProducts();

    
    let itemsProducts = "";
    let productsInHTML = document.querySelector('.items');

    for(let p = 0; p < products.length; p++) {

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

    productsInHTML.innerHTML = itemsProducts;

};

showProduct();
