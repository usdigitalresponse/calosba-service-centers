const json_data = require('../src/data/orig_county_nearest_neighbors.json');
const centers_data = require('../src/data/centers.json');
const languages_data = require('./languages.json');
const nearest1 = require('./../src/data/count_nearest_neighbors.json')
const nearest2 = require('./../src/data/count_nearest_neighbors2.json')


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
  let new_data = {};
  for (const key in json_data) {
    let county = key;
    let matches = json_data[key];
    let newMatches = [];
    matches.forEach(centerName => {
      let actualCenterId = findActualCenterId(centerName);
      if (!actualCenterId) {
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

  let data = JSON.stringify(finalForQuestions, null, 2);
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
}

const centerSchemaArray = [
  'id',
  'name',
  'languages',
  'geographicAreas',
  'hasStatewideService',
  'specificCommunities',
  'areasOfService',
  'streetAddress',
  'city',
  'county',
  'zipCode',
  'fullAddress',
  'latitude',
  'longitude',
  'email',
  'website',
  'phoneNumber',
  'socialMedia'
]

const transformCentersToTSSchema = () => {
  let final = [];
  let centersData = centers_data;
  centersData.forEach(center => {
    let newCenter = {};
    for (const key in center) {
      newCenter[key] = center[key]
      if (key === 'hasStatewideService') {
        if (newCenter[key] === '') {
          newCenter[key] = false;
        } else if (newCenter[key] === 'Yes') {
          newCenter[key] = true;
        }
      } 
    }
    final.push(newCenter)
  })
  let data = JSON.stringify(final, null, 2);
  fs.writeFileSync('centers3.json', data);
}

const findCentersWithMissingData = () => {
  let centersData = centers_data;
  centersData.forEach(center => {
    for (const key in center) {
      if (key === 'latitude' && center[key] === '') {
        console.log(center);
        break;
      }
    }
  })
}

const generateNewNearestNeighbors = () => {
  let result = {};
  for (const key in nearest2) {
    let obj = nearest2[key];
    result[obj.county] = obj.centers_distance_sorted
  }
  
  let data = JSON.stringify(result, null, 2);
  fs.writeFileSync('nearest3.json', data);
}

const setStateWideServiceBools = () => {
  const final = [];
  const data = centers_data;
  let trues = 0;

  data.forEach(center => {
    const current = center.hasStatewideService;
    if (current === "Yes") {
      trues++;
      center.hasStatewideService = true;
    } else {
      center.hasStatewideService = false;
    }
  })
  console.log(trues);
  let datum = JSON.stringify(data, null, 2);
  fs.writeFileSync('centers_2.json', datum);
}

const getAreasOfService = () => {
  const data = centers_data;
  let final = {};

  data.forEach(center => {
    center.areasOfService.forEach(area => {
      final[area] = true;
    })
  })

  let result = JSON.stringify(final, null, 2);
  fs.writeFileSync('areasOfService.json');
}

getAreasOfService();
// setStateWideServiceBools();

// generateNewNearestNeighbors();
// findCentersWithMissingData();
// transformCentersToTSSchema();

//   let data = JSON.stringify(centersData, null, 2);
//   fs.writeFileSync('centers2.json', data);


// transformCenters();

// getAllLanguages();
// transform()