import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const Yomiage = dynamic(() => import('../components/Yomiage/YomiageTool'), {
  ssr: false,
})

const IndexPage: NextPage = () => {
  return (
    <Layout title="Yomiage" reset>
      <Yomiage />
    </Layout>
  )
}

export default IndexPage
