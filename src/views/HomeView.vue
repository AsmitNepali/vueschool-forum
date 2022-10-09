<template>
    <h1>Welcome To Forum</h1>
    <ForumList :forums="forums"/>
</template>

<script>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList'

export default {
  components: {
    ForumList
  },
  data () {
    return {
      forums: sourceData.forums
    }
  }
}
</script>
