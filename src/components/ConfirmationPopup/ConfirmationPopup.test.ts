import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmPopup from './index.vue'

vi.mock('primevue/button', () => ({
  default: {
    name: 'Button',
    template: '<button><slot /></button>',
  },
}))

describe('ConfirmPopup.vue', () => {
  const TARGET_ID = 'popup-target'
  let target: HTMLElement

  beforeEach(() => {
    document.body.innerHTML = ''
    target = document.createElement('div')
    target.setAttribute('id', TARGET_ID)
    document.body.appendChild(target)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('renders correctly when opened', async () => {
    mount(ConfirmPopup, {
      props: {
        text: 'Are you sure?',
        opened: true,
        target: `#${ TARGET_ID }`,
        iconClass: 'pi-check',
        position: 'left',
      },
      attachTo: document.body,
    })

    const popup = document.querySelector('.confirmation-popup')
    expect(popup).toBeTruthy()
    expect(popup?.textContent).toContain('Are you sure?')
    expect(popup?.classList.contains('position-left')).toBe(true)

    const icon = popup?.querySelector('i')
    expect(icon?.classList.contains('pi-check')).toBe(true)
  })

  test('does not render popup when opened is false', async () => {
    mount(ConfirmPopup, {
      props: {
        text: 'Should not be visible',
        opened: false,
        target: `#${ TARGET_ID }`,
      },
      attachTo: document.body,
    })

    const popup = document.querySelector('.confirmation-popup')
    expect(popup).toBeTruthy()
    expect(getComputedStyle(popup!).display).toBe('none')
  })

  test('emits confirm on Confirm button click', async () => {
    const wrapper = mount(ConfirmPopup, {
      props: {
        text: 'Confirm?',
        opened: true,
        target: `#${ TARGET_ID }`,
      },
      attachTo: document.body,
    })

    const buttons = document.querySelectorAll(`#${ TARGET_ID } button`) as NodeListOf<HTMLButtonElement>
    expect(buttons.length).toBe(2)

    await buttons[0].click()
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')!.length).toBe(1)
  })

  test('emits decline on Cancel button click', async () => {
    const wrapper = mount(ConfirmPopup, {
      props: {
        text: 'Decline?',
        opened: true,
        target: `#${ TARGET_ID }`,
      },
      attachTo: document.body,
    })

    const buttons = document.querySelectorAll(`#${ TARGET_ID } button`) as NodeListOf<HTMLButtonElement>
    expect(buttons.length).toBe(2)

    await buttons[1].click()
    expect(wrapper.emitted('decline')).toBeTruthy()
    expect(wrapper.emitted('decline')!.length).toBe(1)
  })
})
