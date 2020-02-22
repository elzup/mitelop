import { NextPage } from 'next'
import Layout from '../components/Layout'
import TableGenerator from '../components/TableGenerator'
import { windowOpen } from '../utils/browser'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Widget makeing tool | Mitelop">
      <h1>Mitelop</h1>
      <TableGenerator
        onSubmit={titles => {
          windowOpen('/table?titles=' + titles.join(','), {
            name: '_blank',
            width: 400,
            height: 400,
          })
        }}
      />
    </Layout>
  )
}

export default IndexPage
