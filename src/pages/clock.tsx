import { NextPage } from 'next'
import Clock from '../components/Clock/ClockTool'
import Layout from '../components/Layout'

const ClockPage: NextPage = () => {
  return (
    <Layout title="Clock" reset>
      <Clock />
    </Layout>
  )
}

export default ClockPage
