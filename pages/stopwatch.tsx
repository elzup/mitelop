import { NextPage } from 'next'
import Layout from '../components/Layout'
import Stopwatch from '../components/Stopwatch'

const StopwatchPage: NextPage = () => {
  return (
    <Layout title="Stopwatch" reset>
      <Stopwatch />
    </Layout>
  )
}

export default StopwatchPage
