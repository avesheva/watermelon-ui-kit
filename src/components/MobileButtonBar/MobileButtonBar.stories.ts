import MobileButtonBar from './index.vue'
import 'primeicons/primeicons.css'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const navigationButtons = [
  { label: 'Page 1', value: '/route-one', icon: 'pi pi-asterisk' },
  { label: 'Page 2', value: '/route-two', icon: 'pi pi-user' },
  { label: 'Page 3', value: '/route-three', icon: 'pi pi-file-plus' },
]

/**
 * Simple mobile buttons bar component, with "Liquid Glass" effect. Can be used as navigation buttons, or just regular
 * buttons bar
 */

const meta: Meta<typeof MobileButtonBar> = {
  title: 'Mobile/Mobile button bar',
  component: MobileButtonBar,
  tags: ['autodocs'],
  render: (args) => ({
    setup: () => {
      return { args, navigationButtons }
    },
    components: { MobileButtonBar },
    template: `<div class="border rounded-2xl">
      <div style="height: 375px;"></div>
      <MobileButtonBar 
        v-bind="args"
        :items="navigationButtons"
      />
    </div>`,
  }),
}

export default meta
type StoryType = StoryObj<typeof MobileButtonBar>

export const Default: StoryType = {
  args: {
    items: navigationButtons,
  },
}
