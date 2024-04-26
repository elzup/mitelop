import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import MirrorTool from '../components/Mirror/MirrorTool'

const MirrorPage: NextPage = () => {
  return (
    <GadgetLayout title="Mirror">
      <MirrorTool />
    </GadgetLayout>
  )
}

export default MirrorPage
