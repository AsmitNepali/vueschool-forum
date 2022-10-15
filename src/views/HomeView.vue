<template>
    <h1>Welcome To Forum</h1>
    <CategoryList :categories="categories"/>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import {mapActions} from 'vuex'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  async created() {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.map(category => category.forums).flat()
    this.fetchForums({ids: forumIds})
  }
}
</script>
