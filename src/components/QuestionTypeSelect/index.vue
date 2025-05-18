<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Index from '@/components/SvgIcon/index.vue'
// Constants
import { ICON_TYPES } from '@/constants/icons'
import { QUESTION_TYPES, QUESTION_TYPES_LABELS } from '@/constants'

export type OptionType = {
  value: number,
  label: string,
  icon: typeof ICON_TYPES.CHECK_CIRCLE | typeof ICON_TYPES.CHECK_SQUARE | typeof ICON_TYPES.LEFT_RIGHT_ARROW
    | typeof ICON_TYPES.CHESS,
}

const props = defineProps<{
  modelValue?: number,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', questionType: number | null): void
}>()

const options: OptionType[] = [
  {
    value: QUESTION_TYPES.ONE_OF,
    label: QUESTION_TYPES_LABELS[QUESTION_TYPES.ONE_OF],
    icon: ICON_TYPES.CHECK_CIRCLE,
  },
  {
    value: QUESTION_TYPES.MULTIPLE_VARIANTS,
    label: QUESTION_TYPES_LABELS[QUESTION_TYPES.MULTIPLE_VARIANTS],
    icon: ICON_TYPES.CHECK_SQUARE,
  },
  {
    value: QUESTION_TYPES.DRAGGABLE_ORDER,
    label: QUESTION_TYPES_LABELS[QUESTION_TYPES.DRAGGABLE_ORDER],
    icon: ICON_TYPES.LEFT_RIGHT_ARROW,
  },
  {
    value: QUESTION_TYPES.CHESS,
    label: QUESTION_TYPES_LABELS[QUESTION_TYPES.CHESS],
    icon: ICON_TYPES.CHESS,
  },
]

const isOpened = ref(false)
const selectRef = ref<HTMLElement | null>(null)
const selectedOption = computed(() => options.find(option => option.value === props.modelValue) || null)

const clickHandler = () => {
  isOpened.value = !isOpened.value
}

const selectHandler = (option: OptionType) => {
  emit('update:modelValue', option.value)
  isOpened.value = false
}

const clickOutsideHandler = (e: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    isOpened.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideHandler)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideHandler)
})
</script>

<template>
  <div
    ref="selectRef"
    class="
      question-type-wrapper rounded-lg pr-2 relative text-white text-base text-opacity-90 font-poppins p-2
      bg-primary-blue
    "
  >
    <div class="selected flex justify-between cursor-pointer w-full" @click="clickHandler">
      <span v-if="selectedOption" class="flex items-center">
        <Index :icon="selectedOption.icon" class="mr-2" />
        <span>{{ selectedOption.label }}</span>
      </span>
      <span v-else>{{ 'Question type' }}</span>
      <img
        src="./assets/arrow.svg"
        class="arrow ease-in duration-300 pl-2 mr-1"
        :class="{ opened: isOpened }"
        alt="arrow icon"
      />
    </div>

    <ul
      v-if="isOpened"
      ref="question-type-select"
      class="
        dropdown absolute left-0 bg-primary-blue bg-opacity-10 cursor-pointer text-white text-base text-opacity-90
        rounded-lg p-0 overflow-hidden
      "
    >
      <li
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="list-none w-full flex items-center p-3"
        @click="selectHandler(option)"
      >
        <Index :icon="option.icon" class="mr-2" />
        <span>{{ option.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.question-type-wrapper {
  width: 200px;
  outline: solid 1px rgba(255,255,255, 0.5);

  .dropdown {
    outline: solid 1px rgba(255,255,255, 0.3);
    top: 102%;

    li {
      text-wrap: nowrap;

      &:hover {
        background: rgba(255,255,255, 0.1);
      }
    }
  }

  .selected {
    .arrow {
      &.opened {
        transform: rotateX(180deg);
      }
    }
  }
}
</style>