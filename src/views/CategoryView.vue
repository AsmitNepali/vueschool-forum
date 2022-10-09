<template>
  <h1>{{ category.name}}</h1>
  <forum-list :title="category.name" :category-id="category.id" :forums="getForumsForCategory(category)"/>
</template>

<script>
import ForumList from "@/components/ForumList";
import {mapState} from "vuex";

export default {
  components: {
    ForumList
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['sourceData']),
    category () {
      return this.sourceData.categories.find(category => category.id === this.id)
    }
  },
  methods: {
    getForumsForCategory(category) {
      return this.sourceData.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>

<style scoped>

</style>
