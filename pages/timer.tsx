import { NextPage } from 'next'
import Layout from '../components/Layout'
import Timer from '../components/Timer'

const StopwatchPage: NextPage = () => {
  return (
    <Layout title="Timer" reset>
      <Timer />
    </Layout>
  )
}

export default StopwatchPage
