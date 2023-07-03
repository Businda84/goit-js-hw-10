import SlimSelect from 'slim-select'
import { fetchBreeds,fetchCatByBreed } from '../src/cat-api';
import axios from "axios";
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';
// 
axios.defaults.headers.common["x-api-key"] = 'live_B7QukuIsBSBJWkckmUZ9hvFxh84zQl6CmvCheiUdl52uZVO2YpBxrWK4lvLWUlY6';
const selectBreed = document.querySelector('select.breed-select'); 
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

errorEl.style.display = 'none';
loaderEl.style.display = 'none';

fetchBreeds().then(data => {
  console.log(data);
    const options = data.map(({ id, name }) => `<option value='${id}'>${name}</option>`).join('');
    selectBreed.insertAdjacentHTML('beforeend', options);
  new SlimSelect({
    select:'.breed-select',
   
    }
)
}).catch(err => {
  errorEl.style.display = 'block'
  return Notiflix.Notify.failure('Такого котика не знайдено')
}
  
   );


selectBreed.addEventListener('change', onSelect);

function onSelect(e) {
  loaderEl.style.display = 'block';
    e.preventDefault();
    const selectById = e.target.value;
   console.log(selectById);
  fetchCatByBreed(selectById)
    .then(data => {

           markUp(data);
        })
    .catch(err => Notiflix.Notify.failure('Котика не знайдено'));
    };

// створюємо розмітку
function markUp(item) {
   const catMarkUp = ({ url, breeds }) => {
console.log(url);
 `<img class='img-cat' src="${url}" alt="${breeds}"/>
<h2 class='cat-name'> ${breeds[0].name}</h2>
<p class='cat-description'>${breeds[0].description}</p>
<p class='cat-temperament>${breeds[0].temperament}</p>
  `};
    const markUpCat = item.map(obj => catMarkUp(obj)).join('');
  catInfo.innerHTML = markUpCat;
  loaderEl.style.display = 'none';
}



