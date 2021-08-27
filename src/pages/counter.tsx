import { NextPage } from 'next'
import GadgetLayout from '../components/Layout'
import CounterTool from '../components/Counter/CounterTool'

const CounterPage: NextPage = () => {
  return (
    <GadgetLayout title="Ruler">
      <CounterTool />
    </GadgetLayout>
  )
}

export default CounterPage
