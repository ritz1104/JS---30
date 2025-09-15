const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];


fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
        cities.push(...data);
    });


function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}


function numberWithComas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches(event) {
    const wordToMatch = event.target.value;
    const matchArray = findMatches(wordToMatch, cities);

    const html = matchArray.map(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        const cityName = place.city.replace(regex, `<span class="h1">${wordToMatch}</span>`);
        const stateName = place.state.replace(regex, `<span class="h1">${wordToMatch}</span>`);

        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithComas(place.population)}</span>
            </li>
        `;
    }).join('');

    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
