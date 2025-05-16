import type { Meta, StoryObj } from '@storybook/vue3'
import QuestionTypeSelect from './index.vue'
// Constants
import { QUESTION_TYPES } from '@/constants'
/**
 *
 * ### Import
 * ```javascript
 * import { QuestionTypeSelect } from 'watermelon-ui-kit'
 * ```
 *
 * Just question type select. For now, we have 4 question types, probably will add new in the future.
 **/

const meta = {
  title: 'Common/QuestionTypeSelect',
  component: QuestionTypeSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: {
        type: 'select',
        labels: {
          [QUESTION_TYPES.ONE_OF]: 'One of',
          [QUESTION_TYPES.MULTIPLE_VARIANTS]: 'Multiple Variants',
          [QUESTION_TYPES.DRAGGABLE_ORDER]: 'Draggable Order',
          [QUESTION_TYPES.CHESS]: 'Chess',
        },
      },
      options: Object.values(QUESTION_TYPES),
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        height: '240px',
      },
    },
  },
  render: (args) => ({
    setup: () => ({ args }),
    components: { QuestionTypeSelect },
    template: `<div>
      <QuestionTypeSelect v-bind="args" v-model="args.modelValue" />
    </div>`,
  }),
} satisfies Meta<typeof QuestionTypeSelect>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export default meta