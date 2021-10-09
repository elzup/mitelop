import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import PianoTool from '../components/Piano/PianoTool'

const PianoPage: NextPage = () => {
  return (
    <GadgetLayout title="Piano">
      <PianoTool />
    </GadgetLayout>
  )
}

export default PianoPage
