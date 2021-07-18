import Head from 'next/head'
import * as React from 'react'
import styled from 'styled-components'
import { GITHUB_LINK, TWITTER_LINK } from '../config'

type Props = { title: string }

const GadgetLayout: React.FunctionComponent<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div style={{ height: '100vh' }}>{children}</div>
  </div>
)

export const TopLayout: React.FunctionComponent<Props> = ({
  children,
  title,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
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
