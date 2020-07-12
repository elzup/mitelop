import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Timer from '../components/Timer'

const getOne = (v: string | string[] | undefined): string => {
  if (!v) return ''
  return typeof v === 'object' ? v[0] : v
}

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
