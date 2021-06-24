import { NextPage } from 'next'
import Clock from '../components/Clock'
import Layout from '../components/Layout'

const ClockPage: NextPage = () => {
  return (
    <Layout title="Clock" reset>
      <Clock />
    </Layout>
  )
}

export default ClockPage
