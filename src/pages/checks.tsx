import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import ChecksTool from '../components/Checks/ChecksTool'
import { getOne } from '../utils/ssr'

const IndexPage: NextPage = () => {
  const { query } = useRouter()
  const titles = getOne(query['titles']).split(',')
  const row = !!getOne(query['row'])

  return (
    <Layout title="Checks" reset>
      <ChecksTool titles={titles} row={row} />
    </Layout>
  )
}

export default IndexPage
