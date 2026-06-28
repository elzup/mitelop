import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GadgetLayout from '../components/Layout'

const BroadcastTool = dynamic(
  () => import('../components/Broadcast/BroadcastTool'),
  { ssr: false }
)

const BroadcastPage: NextPage = () => {
  return (
    <GadgetLayout title="Broadcast">
      <BroadcastTool />
    </GadgetLayout>
  )
}

export default BroadcastPage
