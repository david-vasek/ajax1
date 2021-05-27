'use strict'

// XHR Example
// const request = new XMLHttpRequest();
// request.onreadystatechange = function() {
//     console.log(this);
//     if (this.readyState === 4) {
//         console.log("Response is: ", this.response);
//     }
// }
// request.open('GET', 'https://api.chucknorris.io/jokes/random?category=dev');
// request.send();

function fetchTheQuote(category) {
    fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
    ).then(function (response) {
        return response.json();
    }).then(function (data) {
        updateQuote(data);
    });
}

function fetchTheCategories() {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then(function (response) {
            return response.json();
    })
    .then(function(data) {
        console.log("category data is: ", data);
        updateCategories(data);
    });
}

const chuckQuote = document.querySelector('#chuckQuote');
const quoteButton = document.querySelector('#getQuote');
quoteButton.addEventListener('click', function() {
    fetchTheQuote();
});


function updateCategories(categoryData) {
    const categoryListForm = document.querySelector("#categoryList");
    const selectElement = document.createElement('select');
    categoryData.forEach(function (category) {
        const categoryOptionElement = document.createElement('option');
        categoryOptionElement.value = category;
        categoryOptionElement.text = category;
        selectElement.appendChild(categoryOptionElement);
    });
    categoryListForm.appendChild(selectElement);

    selectElement.addEventListener('change', function(event) {
        console.log("the event is", event.target.value);
        const categoryName = event.target.value;
        fetchTheQuote(categoryName);
    });
}

function updateQuote(dataFromFetch) {
    const theQuote = dataFromFetch.value;
    console.log(theQuote);
    chuckQuote.innerText = theQuote;
}

fetchTheQuote('dev');
fetchTheCategories();
