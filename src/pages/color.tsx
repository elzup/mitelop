import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GadgetLayout from '../components/Layout'

const ColorTool = dynamic(() => import('../components/Color/ColorTool'), {
  ssr: false,
})

const ColorPage: NextPage = () => {
  return (
    <GadgetLayout title="Color">
      <ColorTool windowMode />
    </GadgetLayout>
  )
}

export default ColorPage
