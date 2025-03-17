<script setup lang="ts">
import { Button } from 'primevue'

import WheelLoader from './components/WheelLoader/index.vue'
import Tag from './components/Tag/index.vue'

const tag = {
  id: 1,
  name: 'Learning',
  status: 2,
  rate: 0.24,
}

</script>

<template>
  <div>
   <h3>Watermelon UI kit</h3>
   <h4>Library items development area</h4>

    <Tag :tag="tag" closable show-rate />

    <Button
      label="Send +"
      class="p-3 w-3"
    />
  </div>
</template>

<style scoped>

</style>
