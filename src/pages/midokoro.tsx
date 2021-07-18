import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import Midokoro from '../components/Midokoro/MidokoroTool'

const IndexPage: NextPage = () => {
  return (
    <GadgetLayout title="Midokoro">
      <Midokoro />
    </GadgetLayout>
  )
}

export default IndexPage
