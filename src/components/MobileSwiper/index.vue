<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

export type MobileSwiperPropsType = {
  shiftWidth?: number,
  disableSwipe?: boolean,
}

const props = withDefaults(defineProps<MobileSwiperPropsType>(), {
  shiftWidth: 0.3,
  disableSwipe: false,
})

const emit = defineEmits<{
  (e: 'long-press', index: number): void,
}>()

const slots = defineSlots<{
  default?: () => any[],
}>()

const LONG_PRESS_TIME_LIMIT = 600

const startX = ref(0)
const offsets = ref<number[]>([])
const swiperBlock = ref<HTMLElement | null>(null)
let timerId: ReturnType<typeof setTimeout> | null = null

const startTouch = (event: TouchEvent, index: number) => {

  if (!event.touches[0]) return

  offsets.value = []
  startX.value = event.touches[0].clientX

  timerId = setTimeout(() => {
    emit('long-press', index)
  }, LONG_PRESS_TIME_LIMIT)
}

const moveTouch = (event: TouchEvent, index: number) => {

  if(props.disableSwipe || !event.touches[0]) return

  const currentX = event.touches[0].clientX
  const deltaX = currentX - startX.value

  if (timerId) clearTimeout(timerId)

  if (deltaX < 0) {
    offsets.value[index] = deltaX
  }
}

const endTouch = (index: number) => {

  if(props.disableSwipe) return

  const threshold = -window.innerWidth * props.shiftWidth

  if (timerId) clearTimeout(timerId)

  if ((offsets.value[index] || 0) < threshold) {
    offsets.value[index] = threshold
  } else {
    offsets.value[index] = 0
  }
}

const outsideClickHandler = (event: MouseEvent) => {
  if (swiperBlock.value && !swiperBlock.value.contains(event.target as Node)) offsets.value = []
}

onMounted(() => {
  document.addEventListener('click', outsideClickHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', outsideClickHandler)
})
</script>

<template>
  <div ref="swiperBlock" class="swipe-list overflow-x-hidden">
    <div
      v-for="(child, index) in (slots.default?.()[0]?.children ?? [])"
      :key="index"
      class="swipe-item flex"
      @touchstart="startTouch($event, index as number)"
      @touchmove="moveTouch($event, index as number)"
      @touchend="endTouch(index as number)"
      @contextmenu.prevent
    >
      <div
        class="content w-full min-w-full"
        :style="{ transform: `translateX(${ offsets[index] || 0 }px)` }"
      >
        <component :is="child" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  transition: transform 0.3s ease;
}
</style>