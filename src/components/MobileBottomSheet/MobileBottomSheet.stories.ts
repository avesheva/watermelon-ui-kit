import { ref } from 'vue'
import MobileBottomSheet from './index.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * Bottom sheet component for mobile screens. Often uses for comments
 *
 * ### Import
 * ```javascript
 * import { MobileBottomSheet } from 'watermelon-ui-kit'
 * ```
 *
 * ### Basic usage
 * ```vue
 * <MobileBottomSheet v-model="showBottomSheet">
 *   <div>
 *     <div v-for="i in 5" :key="i">
 *       <span>Comment {{ i }}</span>
 *     </div>
 *   </div>
 * </MobileBottomSheet>
 * ```
 */

const meta: Meta = {
  title: 'Mobile/Mobile Bottom Sheet',
  component: MobileBottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        width: '390px',
        height: '840px',
      },
    },
  },
  render: (args) => ({
    setup: () => {
      const showComments = ref(false)
      return { args, showComments }
    },
    components: { MobileBottomSheet },
    template: `<div class="border-1 rounded-2xl overflow-hidden" style="width: 390px; height: 680px;">
      <div class="p-5">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="showComments = true"
        >
          Open block
        </button>
      </div>
      
      <MobileBottomSheet v-bind="args" v-model="showComments">
        <div class="p-3 font-rubik">
          <div v-for="i in 5" :key="i" class="tex-lg p-4"> 
             <span>Comment {{ i }}</span>
          </div>
        </div>
      </MobileBottomSheet>
    </div>`,
  }),
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export default meta
