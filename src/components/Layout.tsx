import { ReactNode } from 'react'
import styled from 'styled-components'
import { GITHUB_LINK, TWITTER_LINK } from '../config'
import { useDocumentTitle } from './hooks/useDocumentMeta'

type Props = { children: ReactNode; title: string }

export const GadgetLayout = ({ children, title }: Props) => {
  useDocumentTitle(title)

  return (
    <div>
      <div style={{ height: '100vh' }}>{children}</div>
    </div>
  )
}

export const TopLayout = ({ children, title }: Props) => {
  useDocumentTitle(title)

  return (
    <div>
      <Main>{children}</Main>
      <Footer>
        <div className="links">
          <div>
            <a href={GITHUB_LINK}>GitHub</a>
          </div>
          <div className="author">
            Made by <a href={TWITTER_LINK}>@anozon</a>
          </div>
        </div>
      </Footer>
    </div>
  )
}
const Main = styled.div`
  min-height: calc(100vh - 80px);
`

const Footer = styled.footer`
  height: 60px;
  bottom: 0;
  padding: 20px 40px 0;
  box-sizing: border-box;
  border-top: solid 1px;
  .links {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`

export default GadgetLayout
