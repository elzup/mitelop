import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
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
      <Head>
        <meta name="theme-color" content={color} />
        <title>Color-{color}</title>
      </Head>
      <Color color={color} />
    </Layout>
  )
}

export default ClockPage
