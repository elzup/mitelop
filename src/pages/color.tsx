import { NextPage } from 'next'
import ColorTool from '../components/Color/ColorTool'
import Layout from '../components/Layout'

const ColorPage: NextPage = () => {
  return (
    <Layout title="Color" reset>
      <ColorTool windowMode />
    </Layout>
  )
}

export default ColorPage
