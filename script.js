/*
API: application programming interface
    - allow applications to communicate with one another
    - code that allow access points to server (not the DB or server)
        - come in the form of an endpoint: direct to accessable sets of data

        Asynchronous Programming
        - generally code is read line-by-line (syncronous programming)
        - asynchronous programming allows code to continue to run while waiting for an API response

        fetch() method
        - built into the browser window
        - asynchronous
        - starts the process of fetching a resource from the network
        - returns a Promise
            - represents a value that is initially unknown when the Promise is created
                1. pending: initial state; neither fulfilled nor rejected
                2. fulfilled: operation completed successfully
                3. rejected: operation failed and returns an error
            - will resolve into a Response object
                - represents the response of the request made
*/
const baseURL = 'https://api.spacexdata.com/v3';

const searchForm = document.querySelector('form');

const spaceShips = document.querySelector('ul');

const rocketImages = document.getElementById('rocketImages');

searchForm.addEventListener('submit', fetchSpace);

function fetchSpace(event) {
    event.preventDefault();
    fetch(`${baseURL}/rockets`)
        .then(response => response.json()) // jsonify response
        .then(json => displayRockets(json)) // pass json to displayRockets function
}

function displayRockets(data) {
    // console.log(data);
    data.forEach(rocket => {
        let rocketName = document.createElement('li');
        rocketName.innerText = rocket.rocket_name;
        // rocketName.innerHTML = `<img src='${rocket.flickr_images[0]}' />`;
        spaceShips.appendChild(rocketName);

    });
}