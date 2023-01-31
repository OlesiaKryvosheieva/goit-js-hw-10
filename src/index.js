import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;



const nameOfCountry = document.querySelector('[id="search-box"]')

nameOfCountry.addEventListener('input', debounce(searchInfoOfCountry, DEBOUNCE_DELAY))


function searchInfoOfCountry() {
    fetchCountries('nameOfCountry.value');
    
}

// console.log(fetchCountries(name));