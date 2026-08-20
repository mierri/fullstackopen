const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return fetch(`${baseUrl}/all`).then(response => response.json())
}

export default { getAll }
