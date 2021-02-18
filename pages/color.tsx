import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Color from '../components/Color'
import { getOne } from '../utils/ssr'

const ClockPage: NextPage = () => {
  const { query } = useRouter()

  console.log(query)

  const color = getOne(query['color']) || '#ffffff'

  console.log(color)

  return (
    <Layout title="Color" reset>
      <Color color={color} />
    </Layout>
  )
}

export default ClockPage
