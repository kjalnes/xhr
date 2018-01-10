(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    function addArticles () {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        if (data && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class='article'>
                <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
            </li>`)
            .join('') + '</ul>'
        } else {
            htmlContent = '<div class="error-no-articles">No articles found.</div>'
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }


    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=29a1414632f449d19f0637f0fe1466e7`);
    articleRequest.send();



})();


