const express = require('express')
const axios = require('axios').default;
const app = express()
const port = 3000
var fs = require('fs');

app.use(express.json()) // for parsing application/json

const animals = ['Dog', 'Cat', 'Bird']
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/randomAnimal', (req, res) => {
  var array = JSON.parse(fs.readFileSync('pet-names.json', 'utf8'));
  let i = randomIndex(array.length - 1)
  let randAnimalIndex = randomIndex(animals.length - 1)
  const dob = randomDate(new Date(2012, 0, 1), new Date());
  var animal = animals[randAnimalIndex]
  console.log(animal)

  if (animal == 'Cat') {
  axios.get('https://some-random-api.ml/animal/cat')
    .then(function (response) {
      var dog = { 'name': array[i], 'image': response.data.image, 'animal': 'Cat', 'fact': response.data.fact, 'dateOfBirth': dob}
      res.json(dog)
    })
    .catch(function (error) {
      res.status(500).jsonp({ error })
    })
}
if (animal == 'Dog') {
  axios.get('https://some-random-api.ml/animal/dog')
    .then(function (response) {
      var dog = { 'name': array[i], 'image': response.data.image, 'animal': 'Dog', 'fact': response.data.fact, 'dateOfBirth': dob}
      res.json(dog)
    })
    .catch(function (error) {
      res.status(500).jsonp({ error })
    })
  }

  if (animal == 'Bird') {
    axios.get('https://some-random-api.ml/animal/bird')
      .then(function (response) {
        var dog = { 'name': array[i], 'image': response.data.image, 'animal': 'Bird', 'fact': response.data.fact, 'dateOfBirth': dob}
        res.json(dog)
      })
      .catch(function (error) {
        res.status(500).jsonp({ error })
      })
  }
})

const randomIndex = (maxIndex) => Math.floor(Math.random() * (maxIndex + 1))
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

const d = randomDate(new Date(2012, 0, 1), new Date());

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 5000}`)
})
