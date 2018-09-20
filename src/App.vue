<template>
  <div id="app">

    <form is="HcEsriSearchWidget" @submit="reset" @result="handleResult"></form>

    <table v-if="matchedAddr" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th colspan="2">
            Results for: {{ matchedAddr }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th width="33.3%">Water Provider</th>
          <td>{{ waterProvider }}</td>
        </tr>
        <tr>
          <th>Waste Water Provider</th>
          <td>{{ wasteProvider }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" class="py-1 text-right">
            <a href="https://service.hillsboroughcounty.org/311/water-sewer/" target="_blank">Water &amp; Sewer Requests</a>
          </td>
        </tr>
      </tfoot>
    </table>

    <pre v-if="false" class="bg-dark text-white p-3">{{ $data }}</pre>

  </div>
</template>

<script>
import HcEsriSearchWidget from 'hc-esri-search-widget'

export default {
  name: 'app',
  props: ['endpoints'],
  components: { HcEsriSearchWidget },
  data () {
    return {
      matchedAddr: null,
      incorporated: null,
      hcWater: null,
      hcWaste: null,
      cotWater: null,
      cotWaste: null,
      waterProvider: null,
      wasteProvider: null
    }
  },
  methods: {
    reset (e) {
      this.matchedAddr = null
      this.incorporated = null
      this.hcWater = null
      this.hcWaste = null
      this.cotWater = null
      this.cotWaste = null
      this.waterProvider = null
      this.wasteProvider = null
    },
    handleResult (result) {
      if (result.result) {
        this.matchedAddr = result.result.feature.attributes.Match_addr
      }

      let promises = [
        result.queryFeatures(this.endpoints.areas),
        result.queryFeatures(this.endpoints.hcWater),
        result.queryFeatures(this.endpoints.hcWaste),
        result.queryFeatures(this.endpoints.cotWaste),
        result.queryFeatures(this.endpoints.cotWater)
      ]

      Promise.all(promises).then(features => {
        this.lookupIncorporated(features[0])
        this.lookupArea(features[1], 'hcWater')
        this.lookupArea(features[2], 'hcWaste')
        this.lookupArea(features[3], 'cotWaste')
        this.lookupArea(features[4], 'cotWater')
      }).then(() => {
        this.determineWater()
        this.determineWaste()
      })
    },
    lookupIncorporated (feature) {
      this.incorporated = (feature) ? feature.attributes.LABEL : false
    },
    lookupArea (feature, data) {
      this.$set(this, data, feature)
    },
    determineWater () {
      // plant city?
      if (this.incorporated && this.incorporated == 'PLANT CITY') {
        this.waterProvider = 'Plant City'
      }
      // hillsborough?
      else if (this.hcWater) {
        this.waterProvider = 'Hillsborough County'
      }
      // tampa?
      else if (this.cotWater) {
        this.waterProvider = 'City of Tampa'
      }
      // no service
      else {
        this.waterProvider = 'Well/Septic - Request Service'
      }
    },
    determineWaste () {
      // plant city?
      if (this.incorporated && this.incorporated == 'PLANT CITY') {
        this.wasteProvider = 'Plant City'
      }
      // hillsborough?
      else if (this.hcWaste) {
        this.wasteProvider = 'Hillsborough County'
      }
      // tampa?
      else if (this.cotWaste) {
        this.wasteProvider = 'City of Tampa'
      }
      // no service
      else {
        this.wasteProvider = 'Well/Septic - Request Service'
      }
    }
  // },
  // created () {
  //   fetch(this.endpoints.providers).then(res => res.json()).then(providers => {
  //     this.providers = providers
  //   })
  }
}
</script>

<style src="./assets/main.scss" lang="scss"></style>
