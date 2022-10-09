<template>
    <h1>Welcome To Forum</h1>
    <CategoryList :categories="categories"/>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import {mapState} from 'vuex'
export default {
  components: {
    CategoryList
  },
  computed: {
    ...mapState({
      categories: state => state.sourceData.categories
    })
  }
}
</script>
