import { Typography, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import ClockGenerator from '../Clock/ClockGenerator'
import KatinkoGenerator from '../Katinko/KatinkoGenerator'
import StopwatchGenerator from '../Stopwatch/StopwatchGenerator'
import ListGenerator from '../List/ListGenerator'
import YomiageGenerator from '../Yomiage/YomiageGenerator'
import ItemsGenerator from '../Items/ItemGenerator'
import TimerGenerator from '../Timer/TimerGenerator'

const TopPage = () => {
  const [selected, setSelected] = useState<number>(0)

  return (
    <div style={{ margin: '8px' }}>
      <Typography variant="h4">Mitelop</Typography>
      <Tabs
        value={selected}
        style={{ width: '100%' }}
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

      {selected === 0 && <ListGenerator />}
      {selected === 1 && <KatinkoGenerator />}
      {selected === 2 && <ClockGenerator />}
      {selected === 3 && <StopwatchGenerator />}
      {selected === 4 && <TimerGenerator />}
      {selected === 5 && <YomiageGenerator />}
      {selected === 6 && <ItemsGenerator />}
    </div>
  )
}

export default TopPage
