import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GadgetLayout from '../components/Layout'

const ChecksPage = dynamic(() => import('../components/Checks/ChecksTool'), {
  ssr: false,
})

const IndexPage: NextPage = () => {
  return (
    <GadgetLayout title="Checks">
      <ChecksPage />
    </GadgetLayout>
  )
}

export default IndexPage
