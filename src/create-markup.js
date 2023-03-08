import { getRefs } from './get-refs';

const refs = getRefs();

export function createMarkupCountryItem(countries) {
  const markupItem = countries
    .map(
      country =>
        `<li class="country-item">
            <img src="${country.flags.svg}" alt="${country.name.official}" width="30" height="20" class="flag-item"> 
            <h2>${country.name.official}</h2>
        </li>`
    )
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', markupItem);
}

export function createMarkupCountries(countries) {
  const markup = countries
    .map(
      country =>
        `<li class="country">
            <div class="country-flag">
              <img src="${country.flags.svg}" alt="${
              country.name.official
              }" width="60" height="40" class="flag">
              <h2>${country.name.official}</h2>
            </div>
            <p> <span class="title">Capital: </span>${country.capital}</p>
            <p> <span class="title">Population: </span>${country.population}</p>
            
            <p> <span class="title">Language: </span>${Object.values(country.languages)}</p>
        </li>`
    )
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}
