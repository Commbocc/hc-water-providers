var GeoJSON = require('geojson');
var fs = require('fs');

var providers = [
  {
    id: 0,
    label: 'Plant City',
    website: 'https://www.plantcitygov.com/54/Public-Works'
  },
  {
    id: 1,
    label: 'Hillsborough County',
    website: 'https://www.hillsboroughcounty.org/residents/property-owners-and-renters/water-and-sewer'
  },
  {
    id: 2,
    label: 'City of Tampa',
    website: 'https://www.tampagov.net/water'
  }
];

//
fs.writeFile(
  __dirname + '/dist/providers.json',
  JSON.stringify(providers),
  { flag: 'w+' },
  function(err) {
    if (err) { return console.error(err); }

    console.log('Saved!', providers);
  }
);

// /* https://www.npmjs.com/package/geojson */
// for (var i = 0; i < providers.length; i++) {
//   providers[i].lat = null;
//   providers[i].lng = null;
// }

// var geojson = GeoJSON.parse(providers, {Point: ['lat', 'lng']});

// fs.writeFile(
//   __dirname + '/dist/providers.geojson',
//   JSON.stringify(geojson),
//   { flag: 'w+' },
//   function(err) {
//     if (err) { return console.error(err); }
//
//     console.log('Saved!', geojson);
//   }
// );
