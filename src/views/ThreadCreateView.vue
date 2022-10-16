<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>
    <ThreadEditor @save="save" @cancel="cancel"/>
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";
import {findById} from "@/helpers";
import {mapActions} from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";

export default {
  components: {
    ThreadEditor
  },
  props: {
    forumId: {
      type: String,
      required: true
    },
  },
  mixins: [asyncDataStatus],
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.forumId)
    }
  },
  data() {
    return {
      title: '',
      text: ''
    }
  },
  methods: {
    ...mapActions(['createThread', 'fetchForum']),
    async save({text, title}) {
      const thread = await this.createThread({
        forumId: this.forum.id,
        title,
        text
      })
      this.$router.push({name: 'ThreadShow', params: {id: thread.id}})
    },
    cancel() {
      this.$router.push({name: 'Forum', params: {id: this.forumId}})
    }
  },
  async created() {
    await this.fetchForum({id: this.forumId})
    this.asyncDataStatus_fetched()
  }
}
</script>

<style scoped>

</style>
