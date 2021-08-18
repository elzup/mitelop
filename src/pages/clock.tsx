import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GadgetLayout from '../components/Layout'

const ClockTool = dynamic(() => import('../components/Clock/ClockTool'), {
  ssr: false,
})

const ClockPage: NextPage = () => {
  return (
    <GadgetLayout title="Clock">
      <ClockTool windowMode />
    </GadgetLayout>
  )
}

export default ClockPage
