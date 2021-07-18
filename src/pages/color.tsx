import { NextPage } from 'next'
import ColorTool from '../components/Color/ColorTool'
import GadgetLayout from '../components/Layout'

const ColorPage: NextPage = () => {
  return (
    <GadgetLayout title="Color">
      <ColorTool windowMode />
    </GadgetLayout>
  )
}

export default ColorPage
