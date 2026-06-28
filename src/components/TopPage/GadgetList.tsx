import React from 'react'
import styled from 'styled-components'
import { gadgets } from '../gadgets'
import GadgetCard from './GadgetCard'

function GadgetList() {
  return (
    <Style>
      {gadgets.map(({ key, icon, title, path, render }) => (
        <GadgetCard key={key} icon={icon} title={title} path={path}>
          {render()}
        </GadgetCard>
      ))}
    </Style>
  )
}
const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default GadgetList
