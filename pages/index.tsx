import { NextPage } from 'next'
import Layout from '../components/Layout'
import TableGenerator from '../components/TableGenerator'

type WindowOptions = {
  url: string
  name?: string
  height?: number
  width?: number
}

function _windowOpen({ url, height, width, name = '_blank' }: WindowOptions) {
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
          window.open(
            '/table?titles=' + titles.join(','),
            '_blank',
            'width=400,height=400'
          )
        }}
      />
    </Layout>
  )
}

export default IndexPage
