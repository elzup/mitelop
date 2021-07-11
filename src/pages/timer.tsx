import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import TimerAtom from '../components/Timer/TimerAtom'
import { getOne } from '../utils/ssr'

const TimerPage: NextPage = () => {
  const { query } = useRouter()
  const total = Number(getOne(query['total']))

  return (
    <Layout title="Timer" reset>
      <TimerAtom total={total} />
    </Layout>
  )
}

export default TimerPage
