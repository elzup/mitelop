import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import List from '../components/List'

const getOne = (v: string | string[] | undefined): string => {
  if (!v) return ''
  return typeof v === 'object' ? v[0] : v
}

const IndexPage: NextPage = () => {
  const { query } = useRouter()
  const titles = getOne(query['titles']).split(',')
  const row = !!getOne(query['row'])

  return (
    <Layout title="List List" reset>
      <List titles={titles} row={row} />
    </Layout>
  )
}

export default IndexPage
