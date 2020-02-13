import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Table from '../components/Table'

const IndexPage: NextPage = () => {
  const { query } = useRouter()

  const getOne = (v: string | string[]) => {
    if (typeof v === 'string') return v
    return v[0]
  }
  const titles = getOne(query['titles']).split(',')

  return (
    <Layout>
      <Table titles={titles} />
    </Layout>
  )
}

export default IndexPage
