import Head from 'next/head'
import * as React from 'react'
import styled from 'styled-components'

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
    <div>{children}</div>
    <Footer>
      <div className="author">
        Made by <a href="">@anozon</a>
      </div>
    </Footer>
  </div>
)
const Footer = styled.footer`
  height: 1rem;
  bottom: 0;
`

export default GadgetLayout
