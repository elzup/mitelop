import { NextPage } from 'next'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'
import Layout from '../components/Layout'
import Table from '../components/Table'

const IndexPage: NextPage = () => {
  const titlesParam = useQueryParam('title', StringParam)[0] || ''
  const rowParam = useQueryParam('row', NumberParam)[0]
  const titles = titlesParam?.split(',')
  const row = !!rowParam

  return (
    <Layout title="Table List" reset>
      <Table titles={titles} row={row} />
    </Layout>
  )
}

export default IndexPage
