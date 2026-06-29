import styled from 'styled-components'
import { gadgets } from '../gadgets'
import GadgetCard from './GadgetCard'

function GadgetList() {
  return (
    <Style>
      {gadgets.map(({ key, icon, title, path, Component }) => (
        <GadgetCard key={key} icon={icon} title={title} path={path}>
          <Component />
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
