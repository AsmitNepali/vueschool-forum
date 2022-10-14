<template>
    <h1>Welcome To Forum</h1>
    <CategoryList :categories="categories"/>
</template>

<script>
import CategoryList from '@/components/CategoryList'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchAllCategories')
  }
}
</script>
