import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import SvgIcon from './index.vue'
import { getRandomInt } from '@/utils/helpers.ts'
// Constants
import { ICON_TYPES } from '@/constants/icons.ts'

const iconsNames = Object.values(ICON_TYPES)
const randomIconName = iconsNames[getRandomInt(0, iconsNames.length - 1)]
const randomWidth = getRandomInt(16, 50)
const randomHeight = getRandomInt(16, 50)
const color = 'red'
const opacity = 0.6

const wrapper = mount(SvgIcon, {
  props: {
    icon: randomIconName,
    width: randomWidth,
    height: randomHeight,
    opacity: opacity,
    color: color,
  },
})

test('Renders icon with correct name', () => {
  const svg = wrapper.find('svg')
  expect(svg.exists()).toBe(true)
  expect(svg.attributes('class')).toContain(`icon-${ randomIconName }`)
})

test('Applies optional props', () => {
  const svg = wrapper.find('svg')
  expect(svg.attributes('width')).toBe(randomWidth.toString())
  expect(svg.attributes('height')).toBe(randomHeight.toString())
  expect(svg.find('path').attributes('fill')).toBe(color)
  expect(svg.find('path').attributes('opacity')).toBe(opacity.toString())
})