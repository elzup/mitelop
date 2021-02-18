import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import List from '../components/List'
import { getOne } from '../utils/browser'

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
