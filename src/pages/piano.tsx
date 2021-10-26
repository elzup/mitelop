import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GadgetLayout from '../components/Layout'

const Piano = dynamic(() => import('../components/Piano/PianoTool'), {
  ssr: false,
})

const PianoPage: NextPage = () => {
  return (
    <GadgetLayout title="Piano">
      <Piano />
    </GadgetLayout>
  )
}

export default PianoPage
