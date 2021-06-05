import React from 'react'
import { MuuriComponent } from 'muuri-react'

import List from '../List'
import Katinko from '../Katinko'
import Clock from '../Clock'
import Stopwatch from '../Stopwatch'
import Timer from '../Timer'
import Yomiage from '../Yomiage'
import Color from '../Color'

const components = [
  <List key={0} />,
  <Katinko key={1} />,
  <Clock key={2} />,
  <Stopwatch key={3} />,
  <Timer key={4} />,
  <Yomiage key={5} />,
  <Color key={6} />,
]

function GadgetList() {
  return (
    <div style={{ display: 'grid' }}>
      <MuuriComponent dragEnabled>
        {components.map((comp, i) => (
          <div key={i} style={{ width: '200px', height: '300px' }}>
            {comp}
          </div>
        ))}
      </MuuriComponent>
    </div>
  )
}
export default GadgetList
