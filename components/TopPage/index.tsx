import { Typography } from '@material-ui/core'
import ClockGenerator from '../Clock/ClockGenerator'
import KatinkoGenerator from '../Katinko/KatinkoGenerator'
import StopwatchGenerator from '../Stopwatch/StopwatchGenerator'
import TableGenerator from '../Table/TableGenerator'

const TopPage = () => {
  return (
    <div style={{ margin: '8px' }}>
      <Typography variant="h4">Mitelop</Typography>
      <TableGenerator />
      <KatinkoGenerator />
      <ClockGenerator />
      <StopwatchGenerator />
    </div>
  )
}

export default TopPage
