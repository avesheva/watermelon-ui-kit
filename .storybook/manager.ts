import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'
import './assets/styles.css'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Watermelon UI kit',
    brandImage: './favicon.ico',
  })
})