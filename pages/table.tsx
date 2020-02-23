import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Table from '../components/Table'

const getOne = (v: string | string[] | undefined): string => {
  if (!v) return ''
  return typeof v === 'object' ? v[0] : v
}

const IndexPage: NextPage = () => {
  const { query } = useRouter()
  const titles = getOne(query['titles']).split(',')

  return (
    <Layout title="Table List" reset>
      <Table titles={titles} />
    </Layout>
  )
}

export default IndexPage
