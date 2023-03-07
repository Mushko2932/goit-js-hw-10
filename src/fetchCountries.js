export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2';
  fetch(
    `${BASE_URL}/all?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('ERROR :>> ', error);
      });
}

