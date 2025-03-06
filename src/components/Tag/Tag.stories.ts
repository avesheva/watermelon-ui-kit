import type { Meta, StoryObj } from '@storybook/vue3'
import Tag from './index.vue'

/**
 *
 * ### Import
 * ```javascript
 * import { Tag } from 'watermelon-ui-kit'
 * ```
 *
 * Tag, probably, the most important entity in the project. All project logic revolves around tags. Tags - it is
 * something like categories, or genres - good for concise description quiz theme. We have system tags - tags that
 * presented on the site from the beginning, but if user can't find needed tag - he can add the new one on by himself.
 * Tag creation feature available only for quizzes authors, because new tag becomes available in the system, only when
 * quiz with this new tag is published.
 * In the future, tag's author will be receiving some rewards for his tag with high rate. And yes, each tag has rate too.
 * It calculates from quizzes amount and users amount, which using this tag
 *
 * Any published quiz
 * must have from one to three tags. But not only quizzes can have tags. Users aswell. So, flow is next:
 * - **user1** creates and publish quiz "Music Quiz" with tag ***"music"***:
 * 1. **user1** receives rate reward for each tag of the quiz. In this example **user1** receives +0.1 rate to tag **"music"**
 * This means, that if user has no tags, he will get new tag **"music"** and 0.1 rate for this tag. If user already had
 * this tag, with some rate, this rate will be increased on 0.1.
 * 2. **user1** will receive some rate reward for each tag of the quiz, each time, when other users will take his quiz.
 * Reward amount depends on how highly other users rate his quiz
 * - **user2** takes quiz "Music Quiz" with tag ***"music"***:
 *
 */

const meta = {
  title: 'Common/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>

export default meta;
type Story = StoryObj<typeof meta>

/**
 * ##### Default state
 * Can be used like hashtags - just inform user what about quiz
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
