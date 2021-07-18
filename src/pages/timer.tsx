import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import TimerTool from '../components/Timer/TimerTool'

const TimerPage: NextPage = () => {
  return (
    <GadgetLayout title="Timer">
      <TimerTool />
    </GadgetLayout>
  )
}

export default TimerPage
