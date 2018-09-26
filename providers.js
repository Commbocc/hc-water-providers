var GeoJSON = require('geojson');
var fs = require('fs');

var providers = [
  {
    id: 0,
    label: 'Plant City',
    website: 'https://www.plantcitygov.com/54/Public-Works',
    address: '1500 W Victoria Street, Plant City, FL',
    phone: '(813) 757-9191',
    email: 'mailto:lspivey@plantcitygov.com'
  },
  {
    id: 1,
    label: 'Hillsborough County',
    website: 'https://www.hillsboroughcounty.org/residents/property-owners-and-renters/water-and-sewer',
    address: '925 E. Twiggs Street, Tampa, FL 33602',
    phone: '(813) 272-6680',
    email: 'mailto:WaterResourcesTeam@hillsboroughcounty.org'
  },
  {
    id: 2,
    label: 'City of Tampa',
    website: 'https://www.tampagov.net/water',
    address: '306 E. Jackson St. Tampa, FL, 33602',
    phone: '(813) 274-8811',
    email: 'https://apps.tampagov.net/appl_customer_service_center/form.asp?strServiceID=75'
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
