import { NextPage } from 'next'
import { Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import TableGenerator from '../components/Table/TableGenerator'
import KatinkoGenerator from '../components/Katinko/KatinkoGenerator'
import ClockGenerator from '../components/Clock/ClockGenerator'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Widget makeing tool | Mitelop">
      <div style={{ margin: '8px' }}>
        <Typography variant="h4">Mitelop</Typography>
        <TableGenerator />
        <KatinkoGenerator />
        <ClockGenerator />
      </div>
    </Layout>
  )
}

export default IndexPage
