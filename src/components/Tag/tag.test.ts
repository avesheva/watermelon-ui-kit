import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag  from './index.vue'
import { TAG_STATUS } from './constants.ts'
// Types
import type { TagType } from './index.vue'

const TAG_ID = 'asdadaadajlkjwe'
const TAG_NAME = 'Learning'
const TAG_RATE = 12

const tagData: TagType = {
  id: TAG_ID,
  name: TAG_NAME,
  status: TAG_STATUS.PUBLISHED,
  rate: TAG_RATE,
}

const wrapper = mount(Tag, {
  props: {
    tag: tagData,
    closable: true,
    showRate: true,
  }
})

test('Show tag name, rate', () => {
  expect(wrapper.find('.tag').text()).toContain(TAG_NAME)
  expect(wrapper.find('.tag .rate').text()).toContain(TAG_RATE)
})

test('Tag "close" event firing', () => {
  wrapper.find('.tag .close').trigger('click')
  const incrementEvent = wrapper.emitted('close')

  expect(incrementEvent[0]).toEqual([tagData])
})