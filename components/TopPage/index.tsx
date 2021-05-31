import { Typography, Tab, Tabs, Theme } from '@material-ui/core'
import { useState } from 'react'
import { createStyles, withStyles } from '@material-ui/styles'
import ClockGenerator from '../Clock/ClockGenerator'
import KatinkoGenerator from '../Katinko/KatinkoGenerator'
import StopwatchGenerator from '../Stopwatch/StopwatchGenerator'
import ListGenerator from '../List/ListGenerator'
import YomiageGenerator from '../Yomiage/YomiageGenerator'
import ItemsGenerator from '../Items/ItemGenerator'
import TimerGenerator from '../Timer/TimerGenerator'
import ColorGenerator from '../Color/ColorGenerator'

const frames = [
  ListGenerator,
  KatinkoGenerator,
  ClockGenerator,
  StopwatchGenerator,
  TimerGenerator,
  YomiageGenerator,
  ColorGenerator,
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
        <StyledTab label="クロック" />
        <StyledTab label="ストップウォッチ" />
        <StyledTab label="タイマー" />
        <StyledTab label="読み上げ" />
        <StyledTab label="単色パネル" />
        <StyledTab label="その他" />
      </Tabs>
      <Frame />
    </div>
  )
}

export default TopPage
