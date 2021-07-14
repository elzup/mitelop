import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const ChecksPage = dynamic(() => import('../components/Checks/ChecksTool'), {
  ssr: false,
})

const IndexPage: NextPage = () => {
  return (
    <Layout title="Checks" reset>
      <ChecksPage />
    </Layout>
  )
}

export default IndexPage
