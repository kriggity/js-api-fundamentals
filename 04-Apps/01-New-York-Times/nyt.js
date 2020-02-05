const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'ESkFSqoOcAMaZXRzrJwTCLhDjpSB0isC';
let url;

// Search Form
const searchTerm = document.querySelector('.search');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const pageNum = document.getElementById('pageNum');

// Results Nav
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

// Results Section
const section = document.querySelector('section');

nav.style.display = 'none';
let pageNumber = 0;
let displayNav = false;

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
    e.preventDefault();

    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`;
    if (startDate.value !== '') {
        url += '&begin_date=' + startDate.value;
    };

    if (endDate.value !== '') {
        url += '&end_date=' + endDate.value;
    };
    // console.log('url: ', url);

    fetch(url)
        .then(function (result) {
            return result.json();
        })
        .then(function (json) {
            displayResults(json);
        });
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs;

    if (articles.length === 0) {
        console.log("no results");
    } else {
        for (let i = 0; i < articles.length; i++) {
            let article = document.createElement('article');
            if (articles.length === 10) {
                nav.style.display = 'flex';
                nextBtn.disabled = false;
                if (pageNumber === 0) {
                    previousBtn.disabled = true;
                } else {
                    previousBtn.disabled = false;
                }
            } else {
                if (pageNumber > 0 && articles.length < 10) {
                    nav.style.display = 'flex';
                    previousBtn.disabled = false;
                    nextBtn.disabled = true;
                }
            }
            pageNum.innerText = `Page: ${pageNumber + 1}`;
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let para = document.createElement('p');
            let clearfix = document.createElement('div');

            let current = articles[i];
            // console.log("Current: ", current);

            link.href = current.web_url;
            link.target = '_blank';
            link.textContent = current.headline.main;

            para.textContent = 'Keywords: ';

            for (let j = 0; j < current.keywords.length; j++) {
                let span = document.createElement('span');
                span.textContent += current.keywords[j].value + " ";
                para.appendChild(span);
            }

            if (current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            clearfix.setAttribute('class', 'clearfix');

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    // console.log("Page number: ", pageNumber);
}

function previousPage(e) {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    // console.log("Page: ", pageNumber);
}