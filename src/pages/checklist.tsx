import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CheckList from '../components/CheckList'
import { getOne } from '../utils/ssr'

const IndexPage: NextPage = () => {
  const { query } = useRouter()
  const titles = getOne(query['titles']).split(',')
  const row = !!getOne(query['row'])

  return (
    <Layout title="CheckList" reset>
      <CheckList titles={titles} row={row} />
    </Layout>
  )
}

export default IndexPage
