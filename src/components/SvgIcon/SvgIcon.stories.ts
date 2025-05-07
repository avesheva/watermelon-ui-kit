import type { Meta, StoryObj } from '@storybook/vue3'
import SvgIcon from './index.vue'
import { ICON_TYPES } from '@/constants/icons'

/**
 *
 * ### Import
 * ```javascript
 * import { SvgIcon } from 'watermelon-ui-kit'
 * ```
 *
 * Just simple Vue component for showing some custom svg icons
 *
 * There are values available for required **icon** prop: `chess`, `check-circle`, `check-square`, `left-right-arrow`.
 **/

const meta = {
  title: 'Common/SvgIcon',
  component: SvgIcon,
  tags: ['autodocs'],
  args: {
    color: '#001529',
    width: 32,
    height: 32,
  },
} satisfies Meta<typeof SvgIcon>

type Story = StoryObj<typeof meta>

export const Chess: Story = {
  args: {
    icon: ICON_TYPES.CHESS,
  },
}

export const CircleCheckbox: Story = {
  args: {
    icon: ICON_TYPES.CHECK_CIRCLE,
  },
}

export const SquareCheckbox: Story = {
  args: {
    icon: ICON_TYPES.CHECK_SQUARE,
  },
}

export const LeftRightArrow: Story = {
  args: {
    icon: ICON_TYPES.LEFT_RIGHT_ARROW,
  },
}

export default meta