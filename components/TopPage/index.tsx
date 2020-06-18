import { Typography, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import ClockGenerator from '../Clock/ClockGenerator'
import KatinkoGenerator from '../Katinko/KatinkoGenerator'
import StopwatchGenerator from '../Stopwatch/StopwatchGenerator'
import TableGenerator from '../Table/TableGenerator'
import YomiageGenerator from '../Yomiage/YomiageGenerator'
import ItemsGenerator from '../Items/ItemGenerator'

const TopPage = () => {
  const [selected, setSelected] = useState<number>(0)

  return (
    <div style={{ margin: '8px' }}>
      <Typography variant="h4">Mitelop</Typography>
      <Tabs
        value={selected}
        onChange={(e, i) => setSelected(i)}
        aria-label="simple tabs example"
      >
        <Tab label="テーブル" />
        <Tab label="カチンコ" />
        <Tab label="クロック" />
        <Tab label="ストップウォッチ" />
        <Tab label="読み上げ" />
        <Tab label="その他" />
      </Tabs>

      {selected === 0 && <TableGenerator />}
      {selected === 1 && <KatinkoGenerator />}
      {selected === 2 && <ClockGenerator />}
      {selected === 3 && <StopwatchGenerator />}
      {selected === 4 && <YomiageGenerator />}
      {selected === 5 && <ItemsGenerator />}
    </div>
  )
}

export default TopPage
