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
        hideError();
        showLoading();
        const response = await fetch("https://fakestoreapi.com/products");

        if(!response.ok)
        {
            throw new Error("Page Not Found");
        }

        const data = await response.json();

        allProducts = data;
        hideLoading();
    }
    catch(err)
    {
        hideLoading();
        console.log(err);
        showError();
    }
}

function showLoading()
{
    loading.classList.remove("hidden");
}

function hideLoading()
{
    loading.classList.add("hidden");
}

function showError()
{
    error.classList.remove("hidden");
}

function hideError()
{
    error.classList.add("hidden");
}