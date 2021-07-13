import { NextPage } from 'next'
import ChecksTool from '../components/Checks/ChecksTool'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Checks" reset>
      <ChecksTool />
    </Layout>
  )
}

export default IndexPage
