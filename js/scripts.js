'use strict';

// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     console.log(this);
//     if (this.readyState === 4) {
//         console.log("XHR Response: ", this.response);
//     }
// }
// request.open('GET', 'https://api.chucknorris.io/jokes/random?category=dev');
// request.send();


document.addEventListener('DOMContentLoaded', function () {
    const generateQuote = document.querySelector('#getQuote');
    const chuckQuote = document.querySelector('#chuckQuote');
    const defaultCategory = 'dev';
    let currentCategory = defaultCategory;

    function fetchTheQuote(category) {
        fetch(
            `https://api.chucknorris.io/jokes/random?category=${category}`)
            .then(function (response) {
                return response.json();
        })
            .then(function (data) {
                updateQuote(data);
        });
    }
    function updateQuote(data) {
        const theQuote = data.value;
        chuckQuote.innerText = theQuote;
    }

    function fetchTheCategories() {
        fetch(
            'https://api.chucknorris.io/jokes/categories'
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateCategories(data);
        });
    }


    function updateCategories(categoryData) {
        const filteredList = categoryData.filter(function(category) {
            if (category !== 'explicit' && category !== 'political' && category !== 'sport') {
                return category;
            }
        })

        
        const categoryListForm = document.querySelector('#categoryList');
        const selectElement = document.createElement('select');

        filteredList.forEach(function (category) {
            const categoryOptionElement = document.createElement('option');
            categoryOptionElement.value = category;
            categoryOptionElement.text = category;
            if (category === currentCategory) {
                categoryOptionElement.setAttribute('selected', true);
            }
            selectElement.appendChild(categoryOptionElement);
        });

        categoryListForm.append(selectElement);

        selectElement.addEventListener('change', function (event) {
            const newCategoryName = event.target.value;
            currentCategory = newCategoryName;
            fetchTheQuote(newCategoryName);
        })
    }

    generateQuote.addEventListener('click', function () {
        console.log("current category: ", currentCategory );
        fetchTheQuote(currentCategory);
    });

    fetchTheQuote(currentCategory);
    fetchTheCategories();
});















