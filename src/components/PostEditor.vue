<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea v-model="postCopy.text" name="" id="" cols="30" rows="10" class="form-input"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">{{ post.id ? 'Update Post' : 'Submit Post' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postCopy: {...this.post}
    }
  },
  props:{
    post: {
      type: Object,
      default: () => ({
        text:null
      })
    }
  },
  methods: {
    save () {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
    }
  }
}
</script>
