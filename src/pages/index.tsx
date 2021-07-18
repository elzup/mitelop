import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { TopLayout } from '../components/Layout'

const TopPage = dynamic(() => import('../components/TopPage'), { ssr: false })

const IndexPage: NextPage = () => {
  return (
    <TopLayout title="Widget makeing tool | Mitelop">
      <TopPage />
    </TopLayout>
  )
}

export default IndexPage
