import { NextPage } from 'next'
import Layout from '../components/Layout'
import Midokoro from '../components/Midokoro/MidokoroTool'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Midokoro" reset>
      <Midokoro />
    </Layout>
  )
}

export default IndexPage
