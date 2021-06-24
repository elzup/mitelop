import { Meta } from '@storybook/react'
import React from 'react'
import ColorSelectButton from './forms/ColorSelectButton'

export default {
  title: 'ColorSelector',
  component: ColorSelectButton,
} as Meta

export const ClockConfigs = () => (
  <ColorSelectButton color="#ffeeee" onChange={() => {}} />
)
