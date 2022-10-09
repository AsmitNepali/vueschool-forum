<template>
  <the-nav-bar/>
    <div class="container">
      <router-view></router-view>
    </div>
</template>
<script>

import TheNavBar from "@/components/TheNavBar";
export default {
  components: {TheNavBar}
}
</script>

<style>
@import "@/assets/style.css";
</style>
