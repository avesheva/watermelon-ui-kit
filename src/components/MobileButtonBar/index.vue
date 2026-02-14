<script setup lang="ts">
import { ref, defineComponent, h, useSlots } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

type MenuItem = {
  label: string,
  icon: string,
  value: any,
}

export type MobileButtonBarPropsType = {
  items: MenuItem[],
  asLink?: boolean,
}

const props = defineProps<MobileButtonBarPropsType>()

const emit = defineEmits<{
  (e: 'change', value: any): void,
}>()

const route = useRoute()
const widthPercentage = (100 / props.items.length).toFixed(2) + '%'
const activeIndex = ref<number>(0)

if (props.asLink) {
  activeIndex.value = props.items.findIndex((item) => item.value === route.path)
}

const itemWrapper = defineComponent(
  () => {
    const slots = useSlots()

    return () => {
      return h(
        props.asLink ? RouterLink : 'div',
        undefined,
        {
          default: () => slots.default?.(),
        },
      )
    }
  },
)

const selectHandler = (i: number, value: any): void => {
  activeIndex.value = i
  emit('change', value)
}
</script>

<template>
  <div class="flex button-bar relative font-rubik">
    <div
      class="active-indicator absolute left-0 rounded-xl"
      :style="{ transform: `translateX(${ activeIndex * 100 }%)` }"
    />

    <itemWrapper
      v-for="(item, index) in items"
      :key="index"
      :to="item.value"
      class="menu-item flex flex-col flex-1 items-center justify-center relative z-2 text-xs text-teal-700"
      :class="{
        active: !asLink && activeIndex === index,
        'no-underline': asLink,
      }"
      @touchstart="selectHandler(index, item.value)"
    >
      <i class="icon block mb-1" :class="item.icon" />
      <span class="label block">
        {{ item.label }}
      </span>
    </itemWrapper>
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