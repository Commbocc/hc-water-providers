<template lang="html">
  <div class="">

    <div v-if="provider">
      <h5>{{ provider.label }}</h5>

      <ul class="list-unstyled mb-0 ml-3">
        <li>
          <span class="mr-2 fas fa-map-marker-alt" aria-hidden="true"></span>
          <a :href="`https://www.google.com/maps/search/${provider.address}`">{{ provider.address }}</a>
        </li>
        <li>
          <span class="mr-2 fas fa-globe" aria-hidden="true"></span>
          <a :href="provider.website" target="_blank">Website</a>
        </li>
        <li>
          <span class="mr-2 fas fa-envelope" aria-hidden="true"></span>
          <a :href="provider.email">Email</a>
        </li>
        <li>
          <span class="mr-2 fas fa-phone" aria-hidden="true"></span>
          {{ provider.phone }}
        </li>
      </ul>

    </div>

    <div v-else-if="provider === false">
      {{ $root.resultNoProvider }}
      <br>
      <a href="https://service.hillsboroughcounty.org/311/water-sewer/" target="_blank" class="hide-external-indicator small">Request Service</a>
    </div>

    <div v-else>
      {{ $root.resultNoResult }}
      <br>
      <a href="https://service.hillsboroughcounty.org/311/water-sewer/" target="_blank" class="hide-external-indicator small">Contact Public Utilities</a>
    </div>


  </div>
</template>

<script>

export default {
  props: ['provider']
}
</script>
