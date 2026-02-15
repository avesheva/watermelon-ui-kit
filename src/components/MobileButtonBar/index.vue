<script setup lang="ts">
import { ref, watch } from 'vue'

type MenuItem = {
  label: string,
  icon: string,
  value: any,
}

export type MobileButtonBarPropsType = {
  items: MenuItem[],
  activeButton?: number,
}

const props = withDefaults(defineProps<MobileButtonBarPropsType>(), {
  activeButton: 0,
})

const emit = defineEmits<{
  (e: 'change', value: any): void,
}>()

const widthPercentage = (100 / props.items.length).toFixed(2) + '%'
const activeIndex = ref<number>(props.activeButton)

const selectHandler = (i: number, value: any): void => {
  activeIndex.value = i
  emit('change', value)
}

watch(() => props.activeButton, (value) => {
  activeIndex.value = value
})
</script>

<template>
  <div class="flex button-bar relative font-rubik">
    <div
      class="active-indicator absolute left-0 rounded-xl"
      :style="{ transform: `translateX(${ activeIndex * 100 }%)` }"
    />

    <div
      v-for="(item, index) in items"
      :key="index"
      class="menu-item flex flex-col flex-1 items-center justify-center relative z-2 text-xs text-teal-700"
      :class="{ active: activeIndex === index }"
      @touchstart="selectHandler(index, item.value)"
    >
      <i class="icon block mb-1" :class="item.icon" />
      <span class="label block">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.button-bar {
  height: 64px;

  .menu-item {
    -webkit-tap-highlight-color: transparent;

    .icon, .label {
      transition: transform 0.25s ease;
    }

    &.active {
      .icon, .label {
        transform: scale(1.15);
      }
    }
  }

  .active-indicator {
    bottom: 8px;
    width: v-bind(widthPercentage);
    height: 48px;
    background: rgba(#01ABAA, 0.15);
    transition: transform 0.3s cubic-bezier(.4,0,.2,1);
    will-change: transform;
    transform: translateZ(0);
  }
}
</style>