<template>
  <the-nav-bar/>
    <div class="container">
      <router-view v-show="showPage" @ready="showPage = true "></router-view>
      <AppSpinner v-show="!showPage"/>
    </div>
</template>
<script>

import TheNavBar from "@/components/TheNavBar";
import {mapActions} from "vuex";
import AppSpinner from "@/components/AppSpinner";
export default {
  components: {AppSpinner, TheNavBar},
  data() {
    return {
      showPage: false
    }
  },
  methods:{
    ...mapActions(['fetchAuthUser'])
  },
  created() {
    this.fetchAuthUser()
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  }
}
</script>

<style>
@import "@/assets/style.css";
</style>
