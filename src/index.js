import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notiflix, Notify } from 'notiflix';
import { getRefs } from './get-refs';

const DEBOUNCE_DELAY = 300;

fetchCountries();

const refs = getRefs();

refs.textField.addEventListener(
  'input',
  debounce(inputNameCountry, DEBOUNCE_DELAY)
);


// const BASE_URL = 'https://restcountries.com/v2/name';
// fetch(`${BASE_URL}/all?fields=name,capital,population,flags,languages`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data); 
//         markupCountries(data);
//     })
//     .catch(error => {
//         console.log('ERROR', error);
//     });


function inputNameCountry(e) {
    const inputCountry = e.target.value.trim();

    if (inputCountry) {
        return fetchCountries(inputCountry)
            .then(data => {
                makeInterface(data);
                markupCountries(data);
            })
            .catch(error => {
                Notify.failure('Oops, there is no country with that name');
            });
    };

    
}

const createMarkupCountry = (country) => 
    `<li>
        <h1>${country.name}</h1>
        <p>${country.capital}</p>
        <p>${country.population}</p>
        <img src="${country.flags}" alt="${country.name}">
        <p>${country.language}</p>
    </li>`;


const generateContent = (array) =>
    array.reduce((acc, country) => acc + createMarkupCountry(country), '');

const markupCountries = (array) => {
const markup = generateContent(array);
  refs.countryList.insertAdjacentHTML('beforeend', markup);
};

function makeInterface(countriesArray) {
    if (countriesArray.length === 1) {
        refs.countryList.innerHTML = '';   
        return markupCountries(countriesArray);
    }
    if (countriesArray.length >= 2 && countriesArray.length <= 10) {
        refs.countryInfo.innerHTML = '';
        return fn(countriesArray);
    }
    return Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
}

