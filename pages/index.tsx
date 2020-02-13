import { NextPage } from 'next'
import Layout from '../components/Layout'

type WindowOptions = {
  url: string
  name?: string
  height?: number
  width?: number
}

function windowOpen({ url, height, width, name = '_blank' }: WindowOptions) {
  const option =
    (height ? `height=${height}` : '') + (width ? `width=${width}` : '')

  window.open(url, name, option)
}

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Mitelop</h1>
      <p>
        <a
          onClick={() => {
            window.open('/about', '_blank', 'width=200,height=200')
          }}
        >
          About
        </a>
      </p>
    </Layout>
  )
}

export default IndexPage
