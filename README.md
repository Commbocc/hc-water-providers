# hc-water-providers

> A Vue.js project

## Basic Use

```html
<div id="HcWaterProvidersApp"></div>

<script src="https://commbocc.github.io/hc-water-providers/build.js"></script>
<script type="text/javascript">
  var app = new HcWaterProviders({
    propsData: {
      resultNoProvider: "Outside Service Areas (Well/Septic)",
      resultNoResult: "Your water provider could not be determined.",
      endpoints: {
        areas:
          "https://maps.hillsboroughcounty.org/arcgis/rest/services/DSD_Viewer_Services/DSD_Viewer_Governance/MapServer/1",
        hcWater:
          "https://maps.hillsboroughcounty.org/arcgis/rest/services/CSC_Viewer/Utilities_Service_Areas/MapServer/3",
        hcWaste:
          "https://maps.hillsboroughcounty.org/arcgis/rest/services/CSC_Viewer/Utilities_Service_Areas/MapServer/2"
      }
    }
  }).$mount("#HcWaterProvidersApp");
</script>
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
