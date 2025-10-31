import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import MobileBottomSheet from './index.vue'

describe('MobileBottomSheet.vue', () => {
  test('renders correctly when mounted', () => {
    const wrapper = mount(MobileBottomSheet, {
      props: { modelValue: false },
    })

    // The component itself should exist
    expect(wrapper.exists()).toBe(true)
    // The overlay should not exist when modelValue = false
    expect(wrapper.find('.overlay').exists()).toBe(false)
  })

  test('renders overlay and sheet when modelValue is true', async () => {
    const wrapper = mount(MobileBottomSheet, {
      props: { modelValue: true },
    })

    // The overlay should be visible
    expect(wrapper.find('.overlay').exists()).toBe(true)
    expect(wrapper.find('.sheet').exists()).toBe(true)
  })

  test('adds "opened" class when modelValue changes to true', async () => {
    vi.useFakeTimers()

    const wrapper = mount(MobileBottomSheet, {
      props: { modelValue: false },
    })

    await wrapper.setProps({ modelValue: true })
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    const sheet = wrapper.find('.sheet')
    expect(sheet.exists()).toBe(true)
    expect(sheet.classes()).toContain('opened')

    vi.useRealTimers()
  })

  test('removes "opened" class when modelValue changes to false', async () => {
    vi.useFakeTimers()

    const wrapper = mount(MobileBottomSheet, {
      props: { modelValue: false },
    })

    // Open sheet
    await wrapper.setProps({ modelValue: true })
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()
    const sheet = wrapper.find('.sheet')
    expect(sheet.classes()).toContain('opened')

    // Close sheet
    await wrapper.setProps({ modelValue: false })
    await wrapper.vm.$nextTick()
    expect(sheet.classes()).not.toContain('opened')

    vi.useRealTimers()
  })

  test('emits update:modelValue=false when overlay background is clicked', async () => {
    const wrapper = mount(MobileBottomSheet, {
      props: { modelValue: true },
    })

    const overlay = wrapper.find('.overlay')
    await overlay.trigger('click')

    // Expect the event to be emitted once
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emitted = wrapper.emitted('update:modelValue') as Array<[boolean]>
    expect(emitted[0]).toEqual([false])
  })
})
