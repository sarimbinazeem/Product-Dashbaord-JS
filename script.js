const search = document.querySelector("#search");
const category = document.querySelector("#category");
const sort = document.querySelector("#sort");
const products = document.querySelector(".products");
const counter = document.querySelector(".counter");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const empty = document.querySelector(".empty");
const retry = document.querySelector("#retryBtn");

let allProducts = [];

async function fetchProducts()
{
    try
    {
        let response = await fetch("https://fakestoreapi.com/products");

        if(!response.ok)
        {
            throw new Error("Page Not Found");
        }

        let data = await response.json();

        allProducts = data;

    }
    catch(error)
    {
        console.log(error);
    }
}