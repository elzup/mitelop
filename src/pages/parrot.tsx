import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GadgetLayout from '../components/Layout'

const Parrot = dynamic(() => import('../components/Parrot/ParrotTool'), {
  ssr: false,
})

const IndexPage: NextPage = () => {
  return (
    <GadgetLayout title="Parrot">
      <Parrot />
    </GadgetLayout>
  )
}

export default IndexPage
