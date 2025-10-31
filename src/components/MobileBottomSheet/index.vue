<script setup lang="ts">
import { ref, watch } from 'vue'

export type MobileBottomSheetProps = {
  modelValue: boolean,
  windowHeight?: string,
}

const props = withDefaults(defineProps<MobileBottomSheetProps>(), {
  modelValue: false,
  windowHeight: '70%',
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>()

const sheet = ref<HTMLElement | null>(null)

watch(() => props.modelValue, (value) => {
  if (value) {
    setTimeout(() => {
      sheet.value?.classList.add('opened')
    }, 100)
  } else {
    sheet.value?.classList.remove('opened')
  }
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="overlay overflow-hidden"
      @click.self="$emit('update:modelValue', false)"
    >
      <div ref="sheet" class="sheet w-full rounded-t-3xl bg-white">
        <div class="pt-2">
          <div class="handle" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.sheet {
  height: 0;
  transition: height 0.4s ease;
}

.opened {
  height: v-bind(windowHeight);
}

.handle {
  width: 40px;
  height: 4px;
  background: #ccc;
  border-radius: 2px;
  margin: 0 auto 8px;
}
</style>