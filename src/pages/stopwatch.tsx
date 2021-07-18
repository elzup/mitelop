import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import StopwatchTool from '../components/Stopwatch/StopwatchTool'

const StopwatchPage: NextPage = () => {
  return (
    <GadgetLayout title="Stopwatch">
      <StopwatchTool />
    </GadgetLayout>
  )
}

export default StopwatchPage
