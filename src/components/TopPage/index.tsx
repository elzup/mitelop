import { Tab, Tabs, Theme, Typography } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/styles'
import { useState } from 'react'
import ListGenerator from '../CheckList/ListGenerator'
import ItemsGenerator from '../Items/ItemGenerator'
import KatinkoGenerator from '../Katinko/KatinkoGenerator'
import StopwatchGenerator from '../Stopwatch/StopwatchGenerator'
import TimerGenerator from '../Timer/TimerGenerator'
import YomiageGenerator from '../Yomiage/YomiageGenerator'
import GadgetList from './GadgetList'

const frames = [
  GadgetList,
  ListGenerator,
  KatinkoGenerator,
  StopwatchGenerator,
  TimerGenerator,
  YomiageGenerator,
  ItemsGenerator,
]

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: '100px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
  })
)((props) => <Tab disableRipple {...props} />)

const TopPage = () => {
  const [selected, setSelected] = useState<number>(0)
  const Frame = frames[selected]

  return (
    <div style={{ margin: '8px' }}>
      <Typography variant="h4">Mitelop</Typography>
      <Tabs
        value={selected}
        variant="scrollable"
        scrollButtons="auto"
        onChange={(e, i) => setSelected(i)}
        aria-label="simple tabs example"
      >
        <StyledTab label="総合" />
        <StyledTab label="リスト" />
        <StyledTab label="カチンコ" />
        <StyledTab label="ストップウォッチ" />
        <StyledTab label="タイマー" />
        <StyledTab label="読み上げ" />
        <StyledTab label="その他" />
      </Tabs>
      <Frame />
    </div>
  )
}

export default TopPage
