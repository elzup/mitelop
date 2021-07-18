import { NextPage } from 'next'
import GadgetLayout from '../../components/Layout'
import Slider from '../../components/Items/Slider'

const ClockPage: NextPage = () => {
  return (
    <GadgetLayout title="Slider">
      <Slider />
    </GadgetLayout>
  )
}

export default ClockPage
