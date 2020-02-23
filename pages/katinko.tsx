import { NextPage } from 'next'
import Layout from '../components/Layout'
import Katinko from '../components/Katinko'

const KatinkoPage: NextPage = () => {
  return (
    <Layout title="Table List">
      <Katinko />
    </Layout>
  )
}

export default KatinkoPage
