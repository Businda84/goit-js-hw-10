API_KEY =
  'live_B7QukuIsBSBJWkckmUZ9hvFxh84zQl6CmvCheiUdl52uZVO2YpBxrWK4lvLWUlY6';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

// повертаємо проміс з данними про кота по ID
function fetchBreeds() {
  return fetch(BASE_URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
export { fetchBreeds, fetchCatByBreed };
