const json_data = require('../src/data/centers.json')

const transform = () => {
  let counter = 1;
  json_data.forEach(item => {
    item.Id = counter;
    counter++
  })
  console.log(JSON.stringify(json_data, null, 2))
}

transform();