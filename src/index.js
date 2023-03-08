import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './get-refs';
import { createMarkupCountryItem, createMarkupCountries } from './create-markup';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputField.addEventListener('input', debounce(inputNameCountry, DEBOUNCE_DELAY));

function inputNameCountry(e) {
    let inputCountry = e.target.value.trim();

    if (inputCountry) {
         return fetchCountries(inputCountry)
            .then(data => {
                countrySearch(data);
           })
           .catch(error => {
            //  console.log('error :>> ', error);
             Notify.failure('Oops, there is no country with that name');
           });
    };
    clearCountry();
}

function countrySearch(countriesArray) {
    if (countriesArray.length === 1) {
        refs.countryList.innerHTML = '';   
            return createMarkupCountries(countriesArray);
    }
    else if (countriesArray.length >= 2 && countriesArray.length <= 10) {
        refs.countryInfo.innerHTML = '';
            return createMarkupCountryItem(countriesArray);
    }
    return Notify.info(
        'Too many matches found. Please enter a more specific name.'
    );
}

const clearCountry = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
};


