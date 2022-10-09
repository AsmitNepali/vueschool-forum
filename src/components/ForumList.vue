<template>
  <div class="col-full">
    <div class="forum-list">

      <h2 class="list-title">
        <a href="#">Forums</a>
      </h2>

      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link :to="{ name: 'Forum', params: { id: forum.id } }" class="text-xlarge" href="forum.html">
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forum.threads?.length > 1 ? 'threads' : 'thread' }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>

    </div>
  </div>
</template>

<script>
import sourceDate from '@/data.json'

export default {
 props: {
   forums: {
     type: Array,
     required: true
   }
 },
  methods: {
    forumsById(forumId) {
      return sourceDate.forums.find(forum => forum.id === forumId)
    }
  }
}
</script>

<style scoped>

</style>
