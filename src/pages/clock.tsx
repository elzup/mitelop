import { NextPage } from 'next'
import Clock from '../components/Clock/ClockTool'
import GadgetLayout from '../components/Layout'

const ClockPage: NextPage = () => {
  return (
    <GadgetLayout title="Clock">
      <Clock windowMode />
    </GadgetLayout>
  )
}

export default ClockPage
