import MobileSwiper from './index.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
/**
 *
 * Simple list item swiper component for mobile screens. Can be used for hiding list item action buttons,
 * for example, like Telegram or Viber mobile applications do. Unfortunately, Storybook is not perfect yet, and it is
 * impossible to demonstrate some mobile functionality on desktop screens. To check Mobile Swiper component
 * functionality here, you have to open browser developer console, and switch to mobile devices view
 *
 * ### Import
 * ```javascript
 * import { MobileSwiper } from 'watermelon-ui-kit'
 * ```

 * ### Basic Usage
 * Just wrap your list items by this component
 *
 *```vue
 * <MobileSwiper>
 *   <div v-for="i in 5" :key="i" class="flex">
 *     <div class="min-w-full">
 *       Swipe me left {{ i }}
 *     </div>
 *     <div>
 *       <span>Action buttons</span>
 *     </div>
 *   </div>
 * </MobileSwiper>
 * ```
 */

const meta: Meta = {
  title: 'Mobile/Mobile Swiper',
  component: MobileSwiper,
  tags: ['autodocs'],
  render: (args) => ({
    components: { MobileSwiper },
    setup() {
      return { args }
    },
    template: `
      <MobileSwiper v-bind="args" class="pt-3">
        <div
          v-for="i in 5"
          :key="i"
          class="demo-item mb-2 border-1 border-gray-400 flex"
        >
          <div class="list-item-content min-w-full bg-gray-100 text-lg p-2">
            Swipe me left {{ i }}
          </div>
          <div class="actions-block p-2">
            <span>Action buttons</span>
          </div>
        </div>
      </MobileSwiper>
    `,
  }),
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export default meta