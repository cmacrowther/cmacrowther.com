import Head from 'next/head'

export default function Meta(props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{props.siteTitle}</title>
        <meta name="Description" content={props.description}></meta>
        <meta name="theme-color" content="#000000"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/static/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`/static/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`/static/favicon-16x16.png`}
          sizes="16x16"
        />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={props.siteTitle} />
        <meta property="og:url" content="https://cmacrowther.com/" />
        <meta property="og:description" content={props.siteDescription}></meta>
        <meta property="og:image" content="https://cmacrowther.com/static/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://cmacrowther.com/" />
        <meta property="twitter:url" content="https://cmacrowther.com/" />
        <meta name="twitter:title" content={props.siteTitle} />
        <meta name="twitter:description" content={props.siteDescription} />
        <meta name="twitter:image" content="https://cmacrowther.com/static/og-image.png" />
      </Head>
    </>
  )
}
