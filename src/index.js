import {fetchCountries} from './fetchCountries';
import debounce from  'lodash.debounce';
import {Notiflix} from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetchCountries();    

const refs = {
    textField: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
} 

refs.textField.addEventListener(
  'input',
  debounce(inputNameCountry, DEBOUNCE_DELAY)
);

function inputNameCountry(e) {
    e.preventDefault();
    console.log(e.target.value);
}