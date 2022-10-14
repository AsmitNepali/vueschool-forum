<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p v-if="thread.id">
            <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{ thread.title }}
            </router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a>,
            <app-date :timestamp="thread.publishedAt"/>
            .
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.repliesCount }} replies
          </p>

          <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="">

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <app-date :timestamp="thread.publishedAt"/>
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {findById} from "@/helpers";

export default {
  props: {
    threads: {
      type: Array
    }
  },
  data() {
    return {
      posts: this.$store.state.posts,
      users: this.$store.state.users
    }
  },
  methods: {
    userById(userId) {
      return findById(this.users, userId) || {}
    },
    showThread(thread) {

      console.log(thread)
    }
  }
}

</script>
