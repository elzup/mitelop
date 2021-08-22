import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import RulerTool from '../components/Ruler/RulerTool'

const RulerPage: NextPage = () => {
  return (
    <GadgetLayout title="Ruler">
      <RulerTool />
    </GadgetLayout>
  )
}

export default RulerPage
