import WheelLoader from './index.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

type Story = StoryObj<typeof meta>

/**
 * Loading indicator component
 *
 * ### Import
 * ```javascript
 * import { WheelLoader } from 'watermelon-ui-kit'
 * ```
 *
 * ### Usage
 * There are three optional string props: `width`, `height` and `color`,
 * which are valid values for according css properties, and `speed`, which takes valid timer value for animation.
 *
 * Width and height props example: `12px`, `6rem`, `45%`, etc. Default value is `21px` for both props.
 *
 * Color prop example: `#001529`, `red`, `rgb(255,255,5)`, etc.
 *
 * Speed prop example: `3s`, `1200ms`. Default is `1.5s`.
 *
 *```vue
 * <WheelLoader />
 * ```
 */

const meta = {
  title: 'Common/Wheel Loader',
  component: WheelLoader,
  tags: ['autodocs'],
} satisfies Meta<typeof WheelLoader>

export const Default: Story = {
  args: {},
}

export default meta