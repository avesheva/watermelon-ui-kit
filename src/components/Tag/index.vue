<script setup lang="ts">

const TAG_STATUS = {
  SYSTEM: 1,
  PUBLISHED: 2,
  NEW: 3,
}

export type TagType = {
  tagId: string,
  name: string,
  status: 1 | 2 | 3,
  rate: number,
}

export type TagPropsType = {
  tag: TagType,
  closable?: boolean,
  showRate?: boolean,
}

const props = defineProps<TagPropsType>()

defineEmits<{
  close: () => void,
}>()

const isNew = props.tag.status === TAG_STATUS.NEW
</script>

<template>
  <div
    class="tag flex w-fit items-center font-rubik px-2 py-1 rounded-xs"
    :class="isNew ? 'text-primary-green border border-solid' : 'bg-primary-green text-white'"
  >
    <span v-if="isNew" class="mr-1 text-sm">{{ tag.name }}</span>
    <router-link
      v-else
      :to="`/dashboard/tags/${ tag.name }`"
      class="mr-1 text-sm text-white no-underline hover:underline"
    >
      <span>{{ tag.name }}</span>
    </router-link>

    <span v-if="showRate && !isNew" class="rate px-2 py-1 rounded-xl text-xs font-medium">{{ tag.rate }}</span>

    <svg
      v-if="closable"
      width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="inline-block cursor-pointer"
      @click="$emit('close')"
    >
      <path
        d="M8.49999 7.66407L5.07851 4.24259C4.96961 4.1337 4.82192 4.07252 4.66793 4.07252C4.51393 4.07252 4.36624
        4.1337 4.25735 4.24259C4.14846 4.35148 4.08728 4.49917 4.08728 4.65317C4.08728 4.80716 4.14846 4.95485 4.25735
        5.06375L7.67883 8.48523L4.25735 11.9067C4.14846 12.0156 4.08728 12.1633 4.08728 12.3173C4.08728 12.4713 4.14846
         12.619 4.25735 12.7279C4.36624 12.8368 4.51393 12.8979 4.66793 12.8979C4.82192 12.8979 4.96961 12.8368 5.07851
          12.7279L8.49999 9.30639L11.9215 12.7279C12.0313 12.8349 12.1787 12.8948 12.3321 12.8948C12.4854 12.8948
          12.6328 12.8349 12.7426 12.7279C12.8515 12.619 12.9127 12.4713 12.9127 12.3173C12.9127 12.1633 12.8515
          12.0156 12.7426 11.9067L9.32115 8.48523L12.7426 5.06375C12.8515 4.95485 12.9127 4.80716 12.9127
          4.65317C12.9127 4.49917 12.8515 4.35148 12.7426 4.24259C12.6328 4.13556 12.4854 4.07566 12.3321
          4.07566C12.1787 4.07566 12.0313 4.13556 11.9215 4.24259L8.49999 7.66407Z"
        :fill="isNew ? '#01ABAA' : 'white'"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.tag {
  .rate {
    background: rgba(5,21,38, 0.3);
  }
}
</style>