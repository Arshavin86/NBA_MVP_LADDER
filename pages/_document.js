import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <title>NBA MVP Ladder</title>
          <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png"></link>
          <link rel="manifest" href="../site.webmanifest"></link>
          <link rel="mask-icon" href="../safari-pinned-tab.svg" color="#5bbad5"></link>
          <meta name="msapplication-TileColor" content="#da532c"></meta>
          <meta name="theme-color" content="#ffffff"></meta>
          {this.props.styleTags}
        </Head>
        <body style={{ margin: '0' }} >
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}