import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import Katinko from '../components/Katinko'

const KatinkoPage: NextPage = () => {
  return (
    <GadgetLayout title="Katinko">
      <Katinko />
    </GadgetLayout>
  )
}

export default KatinkoPage
