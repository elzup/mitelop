import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const TopPage = dynamic(() => import('../components/TopPage'), { ssr: false })

const IndexPage: NextPage = () => {
  return (
    <Layout title="Widget makeing tool | Mitelop">
      <TopPage />
    </Layout>
  )
}

export default IndexPage
