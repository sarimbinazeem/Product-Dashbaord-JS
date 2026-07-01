const search = document.querySelector("#search");
const category = document.querySelector("#category");
const sort = document.querySelector("#sort");
const productContainer = document.querySelector(".products");
const counter = document.querySelector(".counter");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const empty = document.querySelector(".empty");
const retry = document.querySelector("#retryBtn");

let allProducts = [];

async function fetchProducts() {
  try {
    showLoading();
    hideError();
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Page Not Found");
    }

    const data = await response.json();

    allProducts = data;
    hideLoading();
    updateProducts();
  } catch (err) {
    hideLoading();
    console.log(err);
    showError();
  }
}

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError() {
  error.classList.remove("hidden");
}

function hideError() {
  error.classList.add("hidden");
}

function display(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const categoryText = document.createElement("p");
    categoryText.textContent = product.category;

    const rating = document.createElement("p");
    rating.textContent = `⭐ ${product.rating.rate} (${product.rating.count})`;

    const price = document.createElement("h2");
    price.textContent = `$${product.price}`;

    const button = document.createElement("button");
    button.textContent = "View Details";

    card.append(image, title, categoryText, rating, price, button);

    productContainer.appendChild(card);
  });

  counter.textContent = `Showing ${products.length} products`;

  if (products.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
  }
}

function updateProducts()
{
    let filteredProducts = allProducts;
    const searchText = search.value;

    if(searchText)
    {
         const lowerSearch = search.value.trim().toLowerCase();
        
         filteredProducts = filteredProducts.filter((product) => {
          let lowerProduct = product.title.toLowerCase();
        
          return lowerProduct.includes(lowerSearch) ;
        });
        

    }

    let categoryText = category.value;

    if(categoryText !== "all")
    {
        const lowerCategory = categoryText.toLowerCase();
        filteredProducts = filteredProducts.filter((product) =>
        {
             let lowerProduct = product.category.toLowerCase();
        
          return lowerProduct === lowerCategory ;

        })
    }

    let sortText = sort.value;

    if(sortText === "low-high")
    {
       filteredProducts.sort((a, b) => a.price - b.price);
    }

    if(sortText === "high-low")
    {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    console.log(filteredProducts)
    display(filteredProducts);
}


fetchProducts();

search.addEventListener("input", updateProducts);
category.addEventListener("change",updateProducts);
sort.addEventListener("change", updateProducts);