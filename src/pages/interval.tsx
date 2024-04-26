import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import IntervalTool from '../components/Interval/IntervalTool'

const IntervalPage: NextPage = () => {
  return (
    <GadgetLayout title="Interval">
      <IntervalTool />
    </GadgetLayout>
  )
}

export default IntervalPage
