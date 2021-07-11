import { NextPage } from 'next'
import Layout from '../components/Layout'
import TimerTool from '../components/Timer/TimerTool'

const TimerPage: NextPage = () => {
  return (
    <Layout title="Timer" reset>
      <TimerTool />
    </Layout>
  )
}

export default TimerPage
