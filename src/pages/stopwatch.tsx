import { NextPage } from 'next'
import Layout from '../components/Layout'
import StopwatchTool from '../components/Stopwatch/StopwatchTool'

const StopwatchPage: NextPage = () => {
  return (
    <Layout title="Stopwatch" reset>
      <StopwatchTool />
    </Layout>
  )
}

export default StopwatchPage
