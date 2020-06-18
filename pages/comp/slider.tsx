import { NextPage } from 'next'
import Layout from '../../components/Layout'
import Slider from '../../components/Items/Slider'

const ClockPage: NextPage = () => {
  return (
    <Layout title="Slider" reset>
      <Slider />
    </Layout>
  )
}

export default ClockPage
