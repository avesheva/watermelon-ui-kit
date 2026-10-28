import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import MobileButtonBar from './index.vue'

const items = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    value: 'home',
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    value: 'profile',
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    value: 'settings',
  },
]

describe('MobileButtonBar', () => {
  test('renders all menu items', () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
      },
    })

    const buttons = wrapper.findAll('.menu-item')

    expect(buttons).toHaveLength(3)
    expect(buttons[0].text()).toContain('Home')
    expect(buttons[1].text()).toContain('Profile')
    expect(buttons[2].text()).toContain('Settings')
  })

  test('highlights active button from props', () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
        activeButton: 1,
      },
    })

    const buttons = wrapper.findAll('.menu-item')

    expect(buttons[0].classes()).not.toContain('active')
    expect(buttons[1].classes()).toContain('active')
    expect(buttons[2].classes()).not.toContain('active')
  })

  test('changes active button after pointerdown', async () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
      },
    })

    const buttons = wrapper.findAll('.menu-item')

    await buttons[2].trigger('pointerdown')

    expect(buttons[2].classes()).toContain('active')
    expect(buttons[0].classes()).not.toContain('active')
  })

  test('emits change event with selected value', async () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
      },
    })

    const buttons = wrapper.findAll('.menu-item')

    await buttons[1].trigger('pointerdown')

    expect(wrapper.emitted('change')).toEqual([
      ['profile'],
    ])
  })

  test('updates active button when activeButton prop changes', async () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
        activeButton: 0,
      },
    })

    await wrapper.setProps({
      activeButton: 2,
    })

    const buttons = wrapper.findAll('.menu-item')

    expect(buttons[2].classes()).toContain('active')
    expect(buttons[0].classes()).not.toContain('active')
  })

  test('moves active indicator', async () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
      },
    })

    await wrapper.findAll('.menu-item')[1].trigger('pointerdown')

    const indicator = wrapper.find('.active-indicator')

    expect(indicator.attributes('style')).toContain(
      'translateX(100%)',
    )
  })

  test('renders correct indicator width', async () => {
    const wrapper = mount(MobileButtonBar, {
      props: {
        items,
      },
    })

    await wrapper.setProps({
      activeButton: 1,
    })

    const indicator = wrapper.find('.active-indicator')

    expect(indicator.attributes('style')).toContain('transform: translateX(100%);')
  })
})
