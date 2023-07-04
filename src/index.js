import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
// import axios from "axios";
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

//
// axios.defaults.headers.common["x-api-key"] = 'live_B7QukuIsBSBJWkckmUZ9hvFxh84zQl6CmvCheiUdl52uZVO2YpBxrWK4lvLWUlY6';

const selectBreed = document.querySelector('select.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

errorEl.style.display = 'none';
loaderEl.style.display = 'block';

selectBreed.addEventListener('change', onSelectResult);

function createOptions(e) {
  loaderEl.style.display = 'none';
  console.log(catInfo);

  fetchBreeds()
    .then(getAllIds)
    .catch(error => {
      if (error) {
        showError();
      }
    });
}
catInfo.innerHTML = '';
function getAllIds(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let value = arr[i].id;
    let text = arr[i].name;

    const optionsElement = document.createElement('option');
    optionsElement.value = value;
    optionsElement.text = text;
    selectBreed.appendChild(optionsElement);
  }

  new SlimSelect({
    select: '.breed-select',
  });
}

function showError() {
  Notiflix.Report.failure('Котика не знайдено');
}

createOptions();

//rendering by chosen cat breed
function onSelectResult() {
  const breedId = selectedBreed();

  fetchCatByBreed(breedId)
    .then(renderingCatImg)
    .catch(error => console.log(error));
}

function selectedBreed() {
  const selectedValue = selectBreed.options[selectBreed.selectedIndex];
  const selectedText = selectedValue.textContent;

  const selectedId = selectedValue.value;

  return selectedId;
}

function renderingCatImg(arr) {
  let imgUrl = arr.map(link => link.url);
  let catDesc = arr.map(desc => desc.breeds[0].description);
  let catTemp = arr.map(temp => temp.breeds[0].temperament);

  const markup = `<img class="cat-img" src="${imgUrl}" width="300" heigth="300">
  <div>
    <p><b>Description:</b> ${catDesc}</p>
    <p><b>Temperament:</b> ${catTemp}</p>
  </div>`;

  catInfo.insertAdjacentHTML('beforeend', markup);
}
