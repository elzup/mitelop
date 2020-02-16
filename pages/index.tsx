import { NextPage } from 'next'
import Layout from '../components/Layout'
import TableGenerator from '../components/TableGenerator'

type WindowOptions = {
  name?: string
  height?: number
  width?: number
}

function windowOpen(
  url: string,
  { height, width, name = '_blank' }: WindowOptions
) {
  const option =
    (height ? `height=${height}` : '') + (width ? `width=${width}` : '')

  window.open(url, name, option)
}

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
