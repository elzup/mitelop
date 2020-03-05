import { NextPage } from 'next'
import Layout from '../components/Layout'
import Clock from '../components/Clock'

const ClockPage: NextPage = () => {
  return (
    <Layout title="Clock" reset>
      <Clock />
    </Layout>
  )
}

export default ClockPage
