<script setup lang="ts">
import { onMounted } from 'vue'
import Button from 'primevue/button'

export type ConfirmPopupProps = {
  text: string,
  target: string,
  opened: boolean,
  position?: 'left' | 'right',
  iconClass?: string,
}
export type ConfirmPopupEmits = {
  (e: 'confirm'): void,
  (e: 'decline'): void,
}

const props = withDefaults(defineProps<ConfirmPopupProps>(), {
  position: 'right',
  opened: false,
})
defineEmits<ConfirmPopupEmits>()

onMounted(() => {
  const element = document.querySelector(props.target) as HTMLElement

  if (element) {
    element.style.position = 'relative'
  }
})
</script>

<template>
  <teleport defer :to="props.target">
    <transition name="fade" mode="out-in">
      <div
        v-show="opened"
        class="confirmation-popup absolute bg-primary-blue-75 font-rubik text-white w-max p-3 rounded-lg mt-2
        text-center z-1"
        :class="position === 'right' ? 'position-right left-0' : 'position-left right-0'"
      >
        <i v-if="iconClass" class="pi icon mb-2 text-2xl" :class="iconClass" />
        <div>
          <span>{{ text }}</span>
        </div>

        <div class="flex justify-center w-full mt-2">
          <Button
            label="Confirm"
            variant="outlined"
            severity="contrast"
            class="mr-2"
            @click="$emit('confirm')"
          />
          <Button
            label="Cancel"
            variant="outlined"
            severity="contrast"
            @click="$emit('decline')"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.confirmation-popup {
  top: 100%;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--color-primary-blue-75);
  }

  &.position-right::before {
    left: 20px;
  }
  &.position-left::before {
    right: 20px;
  }

  .icon {
    font-size: 1.5rem;
  }

  button {
    background: white;
  }
}
</style>