'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  // fetch /fortune url
  fetch('/fortune')
    .then( response => response.text())
    .then( responseData => {
      //this line of codes assigns the fortune into the fortune text div
      document.querySelector('#fortune-text').innerHTML = responseData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode: zipcode}).toString();
  const sendUrl = url + "?" + queryString;

  fetch(sendUrl)
    .then(response => response.json())
    .then(responseData => {
      document.querySelector('#weather-info').innerHTML =
       `${responseData['temp']}, ${responseData['forecast']}`
    });
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  // create a dict to store inputs
  const formInputs = {
    qty: document.querySelector("#qty-field").value,
    melon_type: document.querySelector("#melon-type-field").value,
  };

  // fetch with method post
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      
      const orderStatus = document.querySelector('#order-status');
      
      if(responseJson['code'] === "ERROR"){
        orderStatus.classList.add('order-error')
      } 
      // if already contains order error, remove
      else if (orderStatus.classList.contains('order-error')) {
        orderStatus.classList.remove('order-error');
      }

      orderStatus.innerText = `${responseJson['msg']}`;
    });
  // send dictionary in body
  // look into what headers are doing here
  
  // get the response as json
  // use response, function to show result message
  //    if the result code contains "ERROR", change class of div to .order-error

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
