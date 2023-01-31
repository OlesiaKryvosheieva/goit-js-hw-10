import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const nameOfCountry = document.querySelector('[id="search-box"]');
const infoOfCountry = document.querySelector('.country-info');
const listOfCountries = document.querySelector('.country-list');
const debounceSearch = debounce(searchInfoOfCountry, DEBOUNCE_DELAY);

nameOfCountry.addEventListener('input', e => {
  infoOfCountry.innerHTML = '';
  listOfCountries.innerHTML = '';

  debounceSearch(e);
});

function searchInfoOfCountry(e) {
  const searchQuery = e.target.value.trim();
  const optionalPromise = fetchCountries(searchQuery);
  if (!optionalPromise) {
    return;
  }
  optionalPromise
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (countries.length >= 2 && countries.length < 10) {
        const html = countries.reduce(
          (markUp, country) => createListOfCountries(country) + markUp,
          ''
        );
        listOfCountries.innerHTML = html;
      } else {
        const html = countries.reduce(
          (markUp, country) => createMarkUp(country) + markUp,
          ''
        );
        infoOfCountry.innerHTML = html;
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkUp({ name, capital, population, flags, languages }) {
  const langEl = Object.values(languages).join(', ');

  return `
<h2> Name: ${name.official} </h2>
<img src="${flags.svg}" width="100px" heigth="100px">
<p>Capital: ${capital} </p>
<p>Population: ${population} </p>
<p>Languages: ${langEl}</p>
 `;
}

function createListOfCountries({ flags, name }) {
  return `
    <li class="country-item"><img src="${flags.svg}" width="40px" heigth="40px" class="country-flag">${name.official}
    </li>`;
}
