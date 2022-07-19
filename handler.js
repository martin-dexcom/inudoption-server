const fs = require('fs');

// All supported animal arrays 
const animals = ["Dog", "Cat", "Bird"]

// Cached pets from the Array
const pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));

module.exports.inudoption = (event, context, callback) => {
  // Default number of animals to return
  let count = 30;
  // Default species if no query params exist
  let species = "Dog"

  if(event.queryStringParameters && event.queryStringParameters.count) {
    console.log("Received count:", event.queryStringParameters.count);
    count = Number(event.queryStringParameters.count);
  }

  if(event.queryStringParameters && event.queryStringParameters.species) {
    console.log("Received species:", event.queryStringParameters.species);
    species = event.queryStringParameters.species;
  }

  // Get pet array
  var requestedPets = []
  // Filter them by species
  const filteredPetArray = pets.filter(pet => pet.animal == species)

  for(var p = 0; p < count; p++) {
    requestedPets.push(filteredPetArray[p]);
  }

  // Response
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      "x-custom-header": "inudoptionrocks"
    },
    body: JSON.stringify(requestedPets)
  };

  callback(null, response);
};