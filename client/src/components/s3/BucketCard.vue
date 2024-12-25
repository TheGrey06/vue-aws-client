<script>
export default {
  props: {
    bucket: {
      type: Object,
      required: true
    }
  }
};
</script>

<template>
  <div class="border rounded-lg shadow p-5 bg-white max-w-sm">
    <h3 class="font-bold text-lg">{{ bucket.Name }}</h3>
    <p class="text-gray-800">Created on: {{ new Date(bucket.CreationDate).toLocaleString() }}</p>
  </div>
</template>

<style scoped>
/* Add any specific styling for the bucket card here */
</style>
