import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const Parrot = dynamic(() => import('../components/Parrot/ParrotTool'), {
  ssr: false,
})

const IndexPage: NextPage = () => {
  return (
    <Layout title="Parrot" reset>
      <Parrot />
    </Layout>
  )
}

export default IndexPage
