import type { Meta, StoryObj } from '@storybook/vue3'
import Tag from './index.vue'

const meta = {
  title: 'Common/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>

export default meta;
type Story = StoryObj<typeof meta>

/**
 * Tag description here ...
 */

export const Regular: Story = {
  args: {
    primary: true,
    label: 'Tag',
  },
}
export const Draft: Story = {
  args: {
    primary: true,
    label: 'Tag',
  },
}
