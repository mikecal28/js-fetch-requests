/* 
Homework 6/28/2022 -
While a fetch request is automatically a promise, I want you to promisify a fetch call anyways.
- wrap a fetch call with a promise 
- appropriately resolve and reject from that promise
- store this promise in a variable
- at least 2 statements
   - 1st: log the data
   - 2nd: log a specific data point (drill down to something interesting)
- use swapi documentation to help with your requests. I don't care which route / data you fetch - https://www.swapi.tech/documentation
- Make this dynamic (use a function with arguments or something), use alerts, prompts, whatever you want
*/

const url = [`https://www.swapi.tech/api/planets?page=1&limit=60`];

const planets = [];
const descriptions = [];
let counter = 0;

const promisifiedFetch = () =>
  new Promise((resolve, reject) => {
    if (counter === 0) {
      fetch(url[0])
        .then((response) => response.json())
        .then((message) => {
          if (message.results) {
            return message.results;
          } else {
            descriptions.push(message.result);
            return message.result;
          }
        })
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    } else if (counter === 1) {
      fetch(url[1])
        .then((response) => response.json())
        .then((message) => {
          if (message.results) {
            return message.results;
          } else {
            descriptions.push(message.result);
            return message.result;
          }
        })
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    }
  });

const fetchArray = [];
const fetchedPlanets = {};
const fetchedDescription = {};

async function doFetch() {
  await promisifiedFetch()
    .then((response) => response)
    .then((response) => {
      for (let item in response) {
        if (counter === 0) {
          fetchedPlanets[String(Number(item) + 1)] = response[item].name;
        } else if (counter === 1) {
          fetchedDescription["properties"] = response.properties;
        }
      }
    });
}

async function doAfterFetch() {
  while (counter < 2) {
    if (counter === 1) {
      console.log(fetchedPlanets);
      planetNumber = prompt(
        "To see more info about a planet, enter a planet's index number from the list in the console:"
      );
      const descriptionUrl = `https://www.swapi.tech/api/planets/${planetNumber}`;
      url.push(descriptionUrl);
    }
    await doFetch();
    counter++;
  }
  console.log(fetchedDescription);
}

doAfterFetch();
