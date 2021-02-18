import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Timer from '../components/Timer'
import { getOne } from '../utils/browser'

const TimerPage: NextPage = () => {
  const { query } = useRouter()
  const total = Number(getOne(query['total']))

  return (
    <Layout title="Timer" reset>
      <Timer total={total} />
    </Layout>
  )
}

export default TimerPage
