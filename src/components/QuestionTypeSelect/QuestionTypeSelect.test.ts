import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuestionTypeSelect from './index.vue'
import { QUESTION_TYPES, QUESTION_TYPES_LABELS } from '@/constants'

const optionsLabels = Object.values(QUESTION_TYPES_LABELS)

describe('QuestionTypeSelect', () => {
  it('renders placeholder when no modelValue is provided', () => {
    const wrapper = mount(QuestionTypeSelect)
    expect(wrapper.text()).toContain('Question type')
  })

  it('renders selected label when modelValue is provided', () => {
    const wrapper = mount(QuestionTypeSelect, {
      props: { modelValue: QUESTION_TYPES.ONE_OF },
    })
    expect(wrapper.text()).toContain(QUESTION_TYPES_LABELS[QUESTION_TYPES.ONE_OF])
  })

  it('opens dropdown on click and shows all options', async () => {
    const wrapper = mount(QuestionTypeSelect)
    await wrapper.find('.selected').trigger('click')

    const options = wrapper.findAll('li')
    expect(options.length).toBe(4)
    optionsLabels.forEach((label, index) => {
      expect(options[index].text()).toContain(label)
    })
  })

  it('emits update:modelValue and closes dropdown on option click', async () => {
    const wrapper = mount(QuestionTypeSelect)
    await wrapper.find('.selected').trigger('click')
    const option = wrapper.findAll('li')[2] // Draggable Order
    await option.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([QUESTION_TYPES.DRAGGABLE_ORDER])

    // Dropdown should close
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('closes dropdown when clicking outside', async () => {
    const wrapper = mount(QuestionTypeSelect, {
      attachTo: document.body,
    })
    await wrapper.find('.selected').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(true)

    document.body.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('ul').exists()).toBe(false)
    wrapper.unmount()
  })
})

