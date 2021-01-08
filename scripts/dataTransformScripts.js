const json_data = require('../src/data/orig_county_nearest_neighbors.json');
const centers_data = require('../src/data/centers.json');
const languages_data = require('./languages.json');

const fs = require('fs');

const findActualCenterId = (centerName) => {
  let finder = null;
  centers_data.forEach(center => {
    if (center.CenterName === centerName) {
      finder = center.Id;
    }
  })
  return finder;
}

const transform = () => {
  // console.log(JSON.stringify(json_data, null, 2))
  let new_data = {};
  for (const key in json_data) {
    let county = key;
    let matches = json_data[key];
    let newMatches = [];
    matches.forEach(centerName => {
      let actualCenterId = findActualCenterId(centerName);
      if (!actualCenterId) {
        console.log(centerName)
      } else {
        let newCounty = {};
        newCounty.Id = actualCenterId;
        newCounty.CountyName = centerName;
        newMatches.push(actualCenterId);
      }
    })
    new_data[county] = newMatches
  }
  let data = JSON.stringify(new_data, null, 2);
  console.log(data)
  fs.writeFileSync('count_nearest_neighbors_2.json', data);
}

const addRules = () => {

}

const getAllLanguages = () => {
  let final = {};
  let finalForQuestions = [];

  finalForQuestions = languages_data.map(lang => {
    let caps = lang;
    let language = lang.toLowerCase();
    return {
      "id": `language_${language}`,
      "name": {
        "en": caps
      }
    }
  })

  // console.log(finalForQuestions)

  let data = JSON.stringify(finalForQuestions, null, 2);
  console.log(data);
  // fs.writeFileSync('languages.json', data);
}

const transformCenters = () => {
  let centersData = centers_data;

  centersData.forEach(center => {
    let areasOfService = [];

    // transform AreasOfSevice
    center.AreasOfService.split(';').forEach(area => {
      if (!area) return;
      areasOfService.push(area)
    })
    center.AreasOfService = areasOfService;
  })
  

  // let data = JSON.stringify(centersData, null, 2);
  // fs.writeFileSync('centers2.json', data);
}

transformCenters();

// getAllLanguages();
// transform();