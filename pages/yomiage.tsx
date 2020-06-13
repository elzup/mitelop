import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const Yomiage = dynamic(() => import('../components/Yomiage'), { ssr: false })

const IndexPage: NextPage = () => {
  return (
    <Layout title="Yomiage">
      <Yomiage />
    </Layout>
  )
}

export default IndexPage
