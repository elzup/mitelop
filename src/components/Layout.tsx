import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  reset?: boolean
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  reset = false,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    <div style={{ height: '100vh' }}>{children}</div>
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
