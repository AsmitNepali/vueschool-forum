<template>
    <h1>Welcome To Forum</h1>
    <ThreadList :threads="threads"/>
</template>

<script>
import sourceData from '@/data.json'
import ThreadList from '@/components/ThreadList'

export default {
  components: {
    ThreadList
  },
  data () {
    return {
      threads: sourceData.threads
    }
  }
}
</script>
