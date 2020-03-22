const fetch = require('node-fetch');
const { getTimedData, getChainedTimedData } = require('./helpers.js');

// 1 getTimedData()
try {
  getTimedData(2).then(function (data) {
    console.log(data)
  })
} catch {
  console.log('Something went wrong');
}

// 2 getChainedTimedData()
try {
  getChainedTimedData(1).then(function (secret) {
    console.log(secret);
    secret.secret.then(function (data) {
      console.log(data);
    })
  })
} catch {
  console.log('Something went wrong');
}

// 3 fetchPetrolStationsUsingPromise()
const fetchPetrolStationsUsingPromise = () => {
  return fetch('https://apis.is/petrol').then(res => res.json()).then(data => data);
}

fetchPetrolStationsUsingPromise().then(data => console.log(data));


// 4 fetchPetrolStationsUsingAsyncAwait()
async function fetchPetrolStationsUsingAsyncAwait() {
  var url = await fetch('https://apis.is/petrol');
  var result = await url.json();
  return result;
}

fetchPetrolStationsUsingAsyncAwait().then(result => console.log(result));

// 5 convertAveragePetrolPriceToUSDUsingPromise()
function convertAveragePetrolPriceToUSDUsingPromise() {
  var promise = new Promise(function(resolve, reject) {
    var totalPrice = 0;
    var averagePrice = 0;
    var data = fetchPetrolStationsUsingPromise();
    data.then(function (data){
      for (var i = 0; i < data.results.length; i++) {
        totalPrice += data.results[i].bensin95;
      }
      averagePrice = totalPrice / data.results.length;
    })
    var dollars = 0;
    var url = 'https://api.exchangeratesapi.io/latest?base=ISK';
    var exch = fetch(url).then(response => response.json());
    exch.then(function (data) {
      dollars = averagePrice * data.rates.USD;
      // console.log(dollars);
      resolve(dollars);
    });
  });
  return promise;
}

convertAveragePetrolPriceToUSDUsingPromise().then(function(data) {
  console.log(data);
})

// 6 convertAveragePetrolPriceToUSDUsingAsyncAwait()
async function convertAveragePetrolPriceToUSDUsingAsyncAwait() {
  var data = await fetchPetrolStationsUsingAsyncAwait();
  // console.log(data);
  var totalPrice = 0;
  var averagePrice = 0;
  for (var i = 0; i < data.results.length; i++) {
    // console.log(data.results[i].bensin95);
      totalPrice += data.results[i].bensin95;
    }
  averagePrice = totalPrice / data.results.length;
  // console.log(averagePrice);
  var dollars = 0;
  var url = 'https://api.exchangeratesapi.io/latest?base=ISK';
  var exch = fetch(url).then(response => response.json());
  exch.then(function (data) {
    dollars = averagePrice * data.rates.USD;
    // console.log(dollars);
    return dollars;
  });
}

convertAveragePetrolPriceToUSDUsingAsyncAwait().then(async function(data) {
  const tmp = await convertAveragePetrolPriceToUSDUsingPromise(data);
  console.log(tmp);
})