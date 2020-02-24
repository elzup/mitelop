import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

type Props = {
  reset?: boolean
  title?: string
}

const GlobalStyle = createGlobalStyle<{ reset: boolean }>`
  body {
    margin: ${props => (props.reset ? '0' : '8px')};
  }
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  reset = false,
  title = 'This is the default title',
}) => (
  <div>
    <GlobalStyle reset={reset} />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    {children}
    {!reset && (
      <footer>
        <hr />
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </footer>
    )}
  </div>
)

export default Layout
