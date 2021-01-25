const json_data = require('../src/data/orig_county_nearest_neighbors.json');
const centers_data = require('../src/data/centers.json');
const nearest1 = require('./../src/data/count_nearest_neighbors.json')
const nearest2 = require('./../src/data/count_nearest_neighbors2.json');
const areas_of_service = require('../src/data/areas_of_service.json');
const specific_communities = require('../src/data/specific_communities.json');

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

  let array = Object.keys(final);
  let finalArray = []

  array.forEach(area => {
    let newObj = {};
    newObj.id = count;
    newObj.name = area;
    finalArray.push(newObj);
  })

  console.log(finalArray);

  let result = JSON.stringify(array, null, 2);
  // fs.writeFileSync('areasOfService.json', result);
}

const transformAreasOfService = () => {
  let count = 1;
  const areas = areas_of_service;
  const final = [];
  areas.forEach(area => {
    let newObj = {};
    newObj.id = count++;
    newObj.name = area
    final.push(newObj)
  })
  console.log(final);
  let result = JSON.stringify(final, null, 2);
  fs.writeFileSync('areasOfService2.json', result);
}

const findCommunities = () => {
  const centers = centers_data;
  const communitiesHash = {};

  centers.forEach(center => {
    if (center.specificCommunities) {
      communitiesHash[center.specificCommunities] = true;
    }
  })

  const communitiesFinal = [];
  let count = 1;
  Object.keys(communitiesHash).forEach(community => {
  
    let commObj = {
      id: count++,
      name: community
    }
    console.log(commObj);
    communitiesFinal.push(commObj);
  })
  let result = JSON.stringify(communitiesFinal, null, 2);
  fs.writeFileSync('specificCommunities.json', result);
}

const mapAreasAndCommunities = () => {
  let centers = centers_data;
  let areasData = areas_of_service;
  let communitiesData = specific_communities;

  let finalCenters = [];

  centers.forEach(center => {
    if (center.areasOfService.length) {
      let newAreas = [];
      center.areasOfService.forEach(area => {
        let found = areasData.find(areaObj => areaObj.name === area);
        newAreas.push(found.id)
      })
      center.areasOfService = newAreas
    } 

    let newCommunities = [];
    if (center.specificCommunities) {
      let found = communitiesData.find(communityObj => communityObj.name === center.specificCommunities);
      newCommunities.push(found.id);
    }
    center.specificCommunities = newCommunities;
  })

  let result = JSON.stringify(centers, null, 2);
  fs.writeFileSync('centers2.json', result);
}

mapAreasAndCommunities();

// findCommunities();
// transformAreasOfService();
// getAreasOfService();
// setStateWideServiceBools();

// generateNewNearestNeighbors();
// findCentersWithMissingData();
// transformCentersToTSSchema();

//   let data = JSON.stringify(centersData, null, 2);
//   fs.writeFileSync('centers2.json', data);


// transformCenters();

// getAllLanguages();
// transform()