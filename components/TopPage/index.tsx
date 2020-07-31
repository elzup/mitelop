import { Typography, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import ClockGenerator from '../Clock/ClockGenerator'
import KatinkoGenerator from '../Katinko/KatinkoGenerator'
import StopwatchGenerator from '../Stopwatch/StopwatchGenerator'
import ListGenerator from '../List/ListGenerator'
import YomiageGenerator from '../Yomiage/YomiageGenerator'
import ItemsGenerator from '../Items/ItemGenerator'
import TimerGenerator from '../Timer/TimerGenerator'

const frames = [
  ListGenerator,
  KatinkoGenerator,
  ClockGenerator,
  StopwatchGenerator,
  TimerGenerator,
  YomiageGenerator,
  ItemsGenerator,
]

const TopPage = () => {
  const [selected, setSelected] = useState<number>(0)
  const Frame = frames[selected]

  return (
    <div style={{ margin: '8px' }}>
      <Typography variant="h4">Mitelop</Typography>
      <Tabs
        value={selected}
        style={{ maxWidth: '100vw' }}
        onChange={(e, i) => setSelected(i)}
        aria-label="simple tabs example"
      >
        <Tab label="リスト" />
        <Tab label="カチンコ" />
        <Tab label="クロック" />
        <Tab label="ストップウォッチ" />
        <Tab label="タイマー" />
        <Tab label="読み上げ" />
        <Tab label="その他" />
      </Tabs>
      <Frame />
    </div>
  )
}

export default TopPage
