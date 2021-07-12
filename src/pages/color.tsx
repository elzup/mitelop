import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import ColorTool from '../components/Color/ColorTool'
import { getOne } from '../utils/ssr'

const ColorPage: NextPage = () => {
  const { query } = useRouter()

  const color = getOne(query['color']) || '#ffffff'

  return (
    <Layout title="Color" reset>
      <Head>
        <meta name="theme-color" content={color} />
        <title>Color-{color}</title>
      </Head>
      <ColorTool color={color} />
    </Layout>
  )
}

export default ColorPage
