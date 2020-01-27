'use strict';

// put your own value below!
const apiKey = 'WjWmSy8YSUzzMoYuuSgkAx8vybb60zFgWdyVQfb8'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
$('#results-list').empty();
console.log("responseJson:", responseJson);
responseJson.data.forEach((park) => {
 $('#results-list').append(
    `<li>
      <h3><a href="${park.url}" target="_blank">${park.name}</a></h3>
      <p>${park.states}</p>
      <p>${park.description}</p>
    </li>`
   )
  });
 $('#results').removeClass('hidden');
}


function getParks(query, maxResults) {
  const params = {
    stateCode: query,
    limit: maxResults,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val().toUpperCase().split(' ', 3);
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
