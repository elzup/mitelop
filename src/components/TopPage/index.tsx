import { Typography } from '@material-ui/core'
import GadgetList from './GadgetList'

const TopPage = () => {
  return (
    <div style={{ margin: '8px' }}>
      <Typography variant="h4">Mitelop</Typography>
      <GadgetList />
    </div>
  )
}

export default TopPage
