import { mount, VueWrapper } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import MobileSwiper from './index.vue'

describe('MobileSwiper', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(MobileSwiper, {
      slots: {
        default: `
          <div>
            <div class="item-a">A</div>
            <div class="item-b">B</div>
          </div>
        `,
      },
    })
  })

  test('renders slot items', () => {
    const items = wrapper.findAll('.swipe-item')
    expect(items.length).toBe(2)
  })

  test('swipes item left', async () => {
    const first = wrapper.findAll('.swipe-item')[0]

    if (!first) return

    // touchstart
    await first.trigger('touchstart', {
      touches: [{ clientX: 200 }],
    })

    // touchmove (move left)
    await first.trigger('touchmove', {
      touches: [{ clientX: 100 }],
    })

    const content = first.find('.content')
    expect((content.element as HTMLElement).style.transform)
      .toContain('translateX(-100px)')
  })

  test('restores position if not passed threshold', async () => {
    const first = wrapper.findAll('.swipe-item')[0]

    if (!first) return

    await first.trigger('touchstart', {
      touches: [{ clientX: 200 }],
    })

    await first.trigger('touchmove', {
      touches: [{ clientX: 150 }], // -50px
    })

    await first.trigger('touchend')

    const content = first.find('.content')
    expect((content.element as HTMLElement).style.transform)
      .toContain('translateX(0px)')
  })

  test('applies threshold if passed', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1000 })

    const first = wrapper.findAll('.swipe-item')[0]

    if (!first) return

    await first.trigger('touchstart', {
      touches: [{ clientX: 500 }],
    })

    await first.trigger('touchmove', {
      touches: [{ clientX: 50 }],  // -450px
    })

    await first.trigger('touchend')

    const threshold = -1000 * 0.3 // -300

    const content = first.find('.content')
    expect((content.element as HTMLElement).style.transform)
      .toContain(`translateX(${ threshold }px)`)
  })

  test('emits long-press after 600ms', async () => {
    const first = wrapper.findAll('.swipe-item')[0]

    if (!first) return

    await first.trigger('touchstart', {
      touches: [{ clientX: 100 }],
    })

    vi.advanceTimersByTime(600)

    const events = wrapper.emitted()['long-press']
    expect(events).toBeTruthy()

    const firstArg = (events as any)[0][0] as number
    expect(firstArg).toBe(0)
  })

  test('does not swipe when disableSwipe = true', async () => {
    wrapper.unmount()

    wrapper = mount(MobileSwiper, {
      props: { disableSwipe: true },
      slots: {
        default: `
          <div>
            <div class="item-a">A</div>
          </div>
        `,
      },
    })

    const first = wrapper.find('.swipe-item')

    await first.trigger('touchstart', {
      touches: [{ clientX: 200 }],
    })

    await first.trigger('touchmove', {
      touches: [{ clientX: 50 }],
    })

    const content = first.find('.content')
    expect((content.element as HTMLElement).style.transform)
      .toContain('translateX(0px)')
  })

  test('click outside resets offsets', async () => {
    const first = wrapper.find('.swipe-item')

    await first.trigger('touchstart', {
      touches: [{ clientX: 200 }]
    })

    await first.trigger('touchmove', {
      touches: [{ clientX: 100 }]
    })

    document.body.click()

    await wrapper.vm.$nextTick()

    const content = first.find('.content')
    expect((content.element as HTMLElement).style.transform)
      .toContain('translateX(0px)')
  })
})
