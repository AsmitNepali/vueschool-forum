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
  async beforeCreate() {
    const categories = await this.$store.dispatch('fetchAllCategories')
    const forumIds = categories.map(category => category.forums).flat()
    console.log(forumIds)
    this.$store.dispatch('fetchForums', {ids: forumIds})
  }
}
</script>
