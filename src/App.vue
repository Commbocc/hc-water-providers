<template>
  <div id="app">

    <form is="HcEsriSearchWidget" @submit="reset" @result="handleResult"></form>

    <table v-if="foundAddr" class="table table-striped table-bordered">
      <thead class="bg-secondary text-white">
        <tr>
          <th colspan="2">
            Results for: {{ foundAddr }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th width="33.3%">Water Provider</th>
          <td>
            <div is="Provider" :provider="provider(waterProviderIndex)"></div>
          </td>
        </tr>
        <tr>
          <th>Waste Water Provider</th>
          <td>
            <div is="Provider" :provider="provider(wasteProviderIndex)"></div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre v-if="false" class="bg-dark text-white p-3">{{ $data }}</pre>

  </div>
</template>

<script>
import HcEsriSearchWidget from 'hc-esri-search-widget'
import Provider from './components/Provider'

export default {
  name: 'app',
  props: ['endpoints', 'resultNoProvider', 'resultNoProvider', 'resultNoResult'],
  components: { HcEsriSearchWidget, Provider },
  data () {
    return {
      providers: [],
      foundAddr: null,
      incorporated: null,
      hcWater: null,
      hcWaste: null,
      cotWater: null,
      cotWaste: null,
      waterProviderIndex: null,
      wasteProviderIndex: null
    }
  },
  methods: {
    reset (e) {
      this.foundAddr = null
      this.incorporated = null
      this.hcWater = null
      this.hcWaste = null
      this.cotWater = null
      this.cotWaste = null
      this.waterProviderIndex = null
      this.wasteProviderIndex = null
    },
    handleResult (result) {
      if (result.result) {
        this.foundAddr = result.result.name
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
        this.waterProviderIndex = 0
      }
      // hillsborough?
      else if (this.hcWater) {
        this.waterProviderIndex = 1
      }
      // tampa?
      else if (this.cotWater) {
        this.waterProviderIndex = 2
      }
      // no service
      else {
        this.waterProviderIndex = false
      }
    },
    determineWaste () {
      // plant city?
      if (this.incorporated && this.incorporated == 'PLANT CITY') {
        this.wasteProviderIndex = 0
      }
      // hillsborough?
      else if (this.hcWaste) {
        this.wasteProviderIndex = 1
      }
      // tampa?
      else if (this.cotWaste) {
        this.wasteProviderIndex = 2
      }
      // no service
      else {
        this.wasteProviderIndex = false
      }
    },
    provider (index) {
      if (index) {
        return this.providers[index]
      } else {
        return index
      }
    }
  },
  created () {
    fetch(this.endpoints.providers).then(res => res.json()).then(providers => {
      this.providers = providers
    })
  }
}
</script>

<style src="./assets/main.scss" lang="scss"></style>
